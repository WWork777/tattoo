import { notFound } from "next/navigation";
import "../article.scss";
import blogData from "@/data/blogData.json";
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

function getArticleData(slug) {
  return blogData.find((post) => post.slug === slug);
}

function parseDate(dateString) {
  const months = {
    января: "January",
    февраля: "February",
    марта: "March",
    апреля: "April",
    мая: "May",
    июня: "June",
    июля: "July",
    августа: "August",
    сентября: "September",
    октября: "October",
    ноября: "November",
    декабря: "December",
  };

  const parts = dateString.split(" ");
  if (parts.length === 3) {
    const [day, monthRu, year] = parts;
    const monthEn = months[monthRu];
    if (monthEn) {
      return new Date(`${monthEn} ${day}, ${year}`);
    }
  }
  return new Date();
}

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = getArticleData(slug);

  if (!article) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.imageUrl ? `https://soprano-tattoo.ru${article.imageUrl}` : undefined,
    datePublished: parseDate(article.date).toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Soprano Tattoo",
    },
    publisher: {
      "@type": "Organization",
      name: "Soprano Tattoo",
      logo: {
        "@type": "ImageObject",
        url: "https://soprano-tattoo.ru/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://soprano-tattoo.ru/blog/${article.slug}`,
    },
    keywords: ["тату", "татуировки", "Новосибирск", "тату салон", article.category],
    articleSection: article.category,
    articleBody: (article.text || "").substring(0, 5000),
  };
  
  return (
    <section className="hero-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="article" itemScope itemType="https://schema.org/BlogPosting">
        <header className="articleHeader">
          <div className="meta">
            <span className="category" itemProp="articleSection">
              {article.category}
            </span>
            <span className="date">
              📅{" "}
              <time itemProp="datePublished" dateTime={parseDate(article.date).toISOString()}>
                {article.date}
              </time>
            </span>
            <span className="readTime">⏱️ {article.readTime}</span>
          </div>

          <h1 className="title" itemProp="headline">
            {article.title}
          </h1>
          <p className="excerpt" itemProp="description">
            {article.description}
          </p>

          <div className="author" itemProp="author" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content="Soprano Tattoo" />
            <span>Автор: Soprano Tattoo</span>
          </div>
        </header>

        <div className="articleImage" itemProp="image">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} itemProp="image" />
          ) : (
            <div className="imagePlaceholder">Изображение статьи</div>
          )}
        </div>

        <div className="articleContent" itemProp="articleBody">
          {typeof article.text === "string"
            ? article.text.split("\n\n").map((para, idx) => (
                <p key={idx}>{para.replace(/^#+\s*/, "")}</p>
              ))
            : null}
        </div>

        <footer className="articleFooter">
          <div className="tags">
            <span>Теги:</span>
            <button className="tag" itemProp="keywords">тату</button>
            <button className="tag" itemProp="keywords">Новосибирск</button>
            <button className="tag" itemProp="keywords">тату салон</button>
            <button className="tag" itemProp="keywords">эскизы</button>
            <button className="tag" itemProp="keywords">{article.category}</button>
          </div>
        </footer>
      </article>
    </section>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = getArticleData(slug);

  if (!article) {
    return {
      title: "Статья не найдена",
      description: "Запрошенная статья не существует или была удалена",
    };
  }

  const baseKeywords = [
    "тату блог",
    "статьи о татуировках",
    "тату советы",
    "тату идеи",
    "тату стили",
    "эскизы тату",
    "уход за татуировкой",
    "как выбрать тату",
    "тату салон блог",
    "тату мастер советы",
  ];

  const contentKeywords =
    typeof article.text === "string"
      ? article.text
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 4)
          .slice(0, 30)
      : [];

  const keywords = [...new Set([...baseKeywords, ...contentKeywords, article.category])].join(", ");

  const ogImage = article.imageUrl
    ? {
        url: `https://soprano-tattoo.ru${article.imageUrl}`,
        width: 1200,
        height: 630,
        alt: article.title,
      }
    : {
        url: "https://soprano-tattoo.ru/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Блог о татуировках Soprano Tattoo",
      };

  return {
    title: `${article.title} | Блог Soprano Tattoo`,
    description: article.description,
    keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: parseDate(article.date).toISOString(),
      authors: ["Soprano Tattoo"],
      tags: ["тату", "татуировки", "Новосибирск", article.category],
      images: [ogImage],
      url: `https://soprano-tattoo.ru/blog/${article.slug}`,
      siteName: "Soprano Tattoo",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [ogImage.url],
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
    alternates: {
      canonical: `https://soprano-tattoo.ru/blog/${article.slug}`,
    },
    other: {
      "application-name": "Блог Soprano Tattoo",
      generator: "Next.js",
      referrer: "origin-when-cross-origin",
      "color-scheme": "light only",
      language: "ru",
      "content-language": "ru-RU",
      "geo.region": "RU",
      "geo.placename": "Новосибирск",
      "geo.position": "55.030199;82.920430",
      "business:contact_data:locality": "Новосибирск",
      "business:contact_data:country_name": "Россия",
      "product:brand": "Soprano Tattoo",
      "product:availability": "in_stock",
      "product:condition": "new",
      "product:price:amount": "0",
      "product:price:currency": "RUB",
    },
  };
}

