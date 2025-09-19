import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Royal VIP Limos Dubai - Luxury Car & Chauffeur Services',
  description = 'Experience premium luxury car rental and professional chauffeur services. Book your perfect ride for special occasions, business travel, and luxury transportation.',
  keywords = 'luxury car rental, chauffeur service, premium transportation, VIP limos, luxury vehicles, professional drivers',
  image = '/og-image.jpg',
  url = 'https://royalviplimos.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}) => {
  const siteTitle = 'Royal VIP Limos Dubai';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author || siteTitle} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@royalviplimos" />
      <meta name="twitter:creator" content="@royalviplimos" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": type === 'article' ? 'Article' : 'Organization',
          ...(type === 'article' ? {
            headline: title,
            description: description,
            image: image,
            author: {
              "@type": "Person",
              name: author || siteTitle
            },
            publisher: {
              "@type": "Organization",
              name: siteTitle,
              logo: {
                "@type": "ImageObject",
                url: "/logo.png"
              }
            },
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime
          } : {
            name: siteTitle,
            description: description,
            url: url,
            logo: "/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-555-0123",
              contactType: "customer service"
            },
            sameAs: [
              "https://facebook.com/royalviplimos",
              "https://twitter.com/royalviplimos",
              "https://instagram.com/royalviplimos"
            ]
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
