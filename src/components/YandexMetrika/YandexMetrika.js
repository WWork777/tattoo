"use client";
import { useEffect } from "react";

export default function YandexMetrika() {
  useEffect(() => {
    // Определяем текущий домен
    const currentDomain = window.location.hostname;

    // Настраиваем счетчики для разных доменов
    let counterId;
    if (currentDomain.includes("tatu-novosibirsk.ru")) {
      counterId = 103906153;
    } else if (currentDomain.includes("soprano-tattoo.ru")) {
      counterId = 103906170;
    } else {
      // Дефолтный счетчик, если домен не определен
      counterId = 103134254;
    }

    // Инициализируем Яндекс.Метрику
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      (k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });

    // Также обновляем noscript для правильного отслеживания
    const noscriptElement = document.getElementById("ym-noscript");
    if (noscriptElement) {
      noscriptElement.innerHTML = `<img src="https://mc.yandex.ru/watch/${counterId}" style="position:absolute; left:-9999px;" alt="" />`;
    }
  }, []);

  return (
    <noscript id="ym-noscript">
      <div>
        <img
          src="https://mc.yandex.ru/watch/103134254"
          style={{ position: "absolute", left: "-9999px" }}
          alt=""
        />
      </div>
    </noscript>
  );
}
