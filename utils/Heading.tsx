import React, { FC } from "react";
interface HeadProps {
  title: string;
  description: string;
  keywords: string;
}

/**
 * Heading
 * Advanced SEO meta tags for Next.js pages.
 * Includes Open Graph, Twitter Card, canonical, and more for better discoverability.
 */
const Heading: FC<HeadProps> = ({ title, description, keywords }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {/* Optionally add an og:image if available */}
      {/* <meta property="og:image" content="https://yourdomain.com/og-image.jpg" /> */}
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" /> */}
      {/* Language and charset */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="content-language" content="en" />
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      {/* Theme color for mobile */}
      <meta name="theme-color" content="#2563eb" />
      {/* Author and copyright */}
      <meta name="author" content="Nextora" />
      <meta name="copyright" content="Nextora" />
    </>
  );
};

export default Heading;
