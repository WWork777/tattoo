"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./VideoPlayer.module.css";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const startHideTimer = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      setShowUI(false);
    }, 2500);
  };

  useEffect(() => {
    if (!hasInteracted) return; // пока не нажали play — ничего не скрываем

    startHideTimer();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [hasInteracted]);

  const showControls = () => {
    setShowUI(true);
    startHideTimer();
  };

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Старт: видео на паузе, со звуком
    v.muted = false;
    v.volume = volume;

    const onLoadedMetadata = () => {
      setDuration(v.duration || 0);
    };
    const onCanPlay = () => setIsReady(true);
    const onTimeUpdate = () => {
      if (!isSeeking) setCurrentTime(v.currentTime || 0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onVolumeChange = () => {
      setIsMuted(v.muted);
      setVolume(v.volume);
    };

    const onFullscreenChange = () => {
      const fsEl = document.fullscreenElement;
      setIsFullscreen(Boolean(fsEl));
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVolumeChange);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVolumeChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSeeking]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    if (!hasInteracted) setHasInteracted(true);
    try {
      if (v.paused) {
        await v.play();
      } else {
        v.pause();
      }
    } catch {
      // В редких случаях браузер может запретить play без user gesture —
      // но тут play вызывается кликом, так что обычно ок.
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
  };

  const changeVolume = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const clamped = Math.min(1, Math.max(0, val));
    v.volume = clamped;
    if (clamped === 0) v.muted = true;
    else v.muted = false;
  };

  const onSeekStart = () => setIsSeeking(true);

  const onSeek = (val: number) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const t = (Math.min(100, Math.max(0, val)) / 100) * duration;
    setCurrentTime(t);
    v.currentTime = t;
  };

  const onSeekEnd = () => setIsSeeking(false);

  const seekBy = (deltaSeconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + deltaSeconds), duration || v.duration || 0);
  };

  const toggleFullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;

    // Если уже в fullscreen — выходим
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {}
      return;
    }

    // iOS Safari: используем нативный fullscreen у video (webkitEnterFullscreen)
    // @ts-expect-error - webkit API exists on iOS Safari
    if (typeof v.webkitEnterFullscreen === "function") {
      // @ts-expect-error
      v.webkitEnterFullscreen();
      return;
    }

    // Остальные браузеры: пробуем Fullscreen API (на видео, а не на контейнер)
    try {
      await v.requestFullscreen();
    } catch {
      // Если вдруг не вышло — пробуем контейнер
      const container = v.parentElement;
      if (container?.requestFullscreen) {
        try {
          await container.requestFullscreen();
        } catch {}
      }
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    // Чтобы было удобно управлять с клавиатуры
    if (e.key === " " || e.key.toLowerCase() === "k") {
      e.preventDefault();
      togglePlay();
    }
    if (e.key.toLowerCase() === "m") toggleMute();
    if (e.key === "ArrowLeft") seekBy(-5);
    if (e.key === "ArrowRight") seekBy(5);
    if (e.key.toLowerCase() === "f") toggleFullscreen();
  };

  return (
    <section className="container">
      <div
        onMouseMove={showControls}
        onClick={showControls}
        onTouchStart={showControls}
        className={styles.player}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={title ?? "Video player"}
      >
        <div className={styles.mediaWrap}>
          {!isReady && (
            <div className={styles.skeleton} aria-hidden="true">
              <div className={styles.skeletonShine} />
            </div>
          )}

          <video
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            ref={videoRef}
            className={styles.video}
            src={src}
            poster={poster}
            preload="metadata"
            // Важно: без autoPlay, без muted — старт на паузе со звуком
            controls={false}
          />

          {/* Кликабельная зона по видео */}
          <button
            type="button"
            className={`${styles.bigButton} ${(!hasInteracted || showUI) ? styles.visible : styles.hidden}`}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <span className={styles.icon} aria-hidden="true">❚❚</span>
            ) : (
              <span className={styles.icon} aria-hidden="true">▶</span>
            )}
          </button>

          {/* Нижняя панель */}
          <div className={`${styles.controls} ${showUI ? styles.visible : styles.hidden}`}>
            <div className={styles.timelineRow}>
              <input
                ref={progressRef}
                className={styles.timeline}
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={duration ? progress : 0}
                onMouseDown={onSeekStart}
                onTouchStart={onSeekStart}
                onChange={(e) => onSeek(Number(e.target.value))}
                onMouseUp={onSeekEnd}
                onTouchEnd={onSeekEnd}
                aria-label="Seek"
              />
              <div
                className={styles.timelineFill}
                style={{ width: `${duration ? progress : 0}%` }}
                aria-hidden="true"
              />
            </div>

            <div className={styles.bottomRow}>
              <div className={styles.left}>
                <button type="button" className={styles.ctrlBtn} onClick={togglePlay}>
                  {isPlaying ? "Pause" : "Play"}
                </button>

                <button type="button" className={styles.ctrlBtn} onClick={() => seekBy(-10)}>
                  -10s
                </button>
                <button type="button" className={styles.ctrlBtn} onClick={() => seekBy(10)}>
                  +10s
                </button>

                <button
                  type="button"
                  className={styles.ctrlBtn}
                  onClick={toggleMute}
                  aria-pressed={isMuted}
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>

                <div className={styles.volume}>
                  <input
                    className={styles.volumeRange}
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                    aria-label="Volume"
                  />
                </div>

                <div className={styles.time}>
                  <span>{formatTime(currentTime)}</span>
                  <span className={styles.timeSep}>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className={styles.right}>
                <button type="button" className={styles.ctrlBtn} onClick={toggleFullscreen}>
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {title && <div className={styles.caption}>{title}</div>}
      </div>
    </section>
  );
}
