import Link from "next/link";
import styles from "./blogCard.module.scss";
import blogData from "@/data/blogData.json";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = headers();
  const host = (await headersList).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseURL = `${protocol}://${host}`;
  const blogURL = `${baseURL}/blog`;

  return {
    title: "Блог о татуировках | Soprano Tattoo Новосибирск",
    description:
      "Статьи о татуировках, уходе, стилях и тенденциях. Советы от мастеров Soprano Tattoo Новосибирск. Профессиональные рекомендации до и после сеанса.",
    keywords:
      "блог о тату, статьи про татуировки, уход за тату, стили татуировок, тату мода, советы по тату, Soprano Tattoo блог",

    alternates: {
      canonical: blogURL,
    },

    openGraph: {
      title: "Блог о татуировках | Soprano Tattoo Новосибирск",
      description:
        "Полезные статьи и советы от профессиональных мастеров тату. Все о татуировках в одном блоге.",
      url: blogURL,
      siteName: "Soprano Tattoo Новосибирск",
      images: [
        {
          url: `${baseURL}/images/blog/blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: "Блог Soprano Tattoo - статьи о татуировках",
        },
      ],
      locale: "ru_RU",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Блог о татуировках | Soprano Tattoo Новосибирск",
      description:
        "Статьи и советы от профессиональных мастеров тату. Soprano Tattoo блог.",
      images: [`${baseURL}/images/blog/blog-twitter.jpg`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Дополнительные мета-теги для блога
    authors: [{ name: "Soprano Tattoo Team" }],
    creator: "Soprano Tattoo Новосибирск",
    publisher: "Soprano Tattoo Новосибирск",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

function BlogCard({
  title,
  description,
  category,
  date,
  readTime,
  imageUrl,
  slug,
}) {
  return (
    <Link href={`/blog/${slug}`} className={styles.blogCard}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className={styles.imagePlaceholder}>Изображение статьи</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{category}</span>
          <span className={styles.date}>📅 {date}</span>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{description}</p>

        <div className={styles.footer}>
          <div className={styles.author}>
            <div className={styles.avatar}></div>
            <span>Soprano Tattoo</span>
          </div>
          <span className={styles.readTime}>⏱️ {readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogGrid() {
  if (!blogData || blogData.length === 0) {
    return (
      <div className={styles.container}>
        <div
          style={{
            textAlign: "center",
            padding: "50px",
            color: "#666",
            fontSize: "18px",
          }}
        >
          Нет статей для отображения
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {blogData.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
