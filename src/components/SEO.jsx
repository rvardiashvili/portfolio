import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, image, url }) {
  const siteTitle = "Rati Vardiashvili | Software Engineer";
  const defaultDescription = "Portfolio of Rati Vardiashvili, a Software Engineer based in Bremen, Germany. Specializing in backend systems, distributed computing, and scalable architecture.";
  const defaultKeywords = "Rati Vardiashvili, Software Engineer, Backend Developer, Java, Python, Bremen, Constructor University";
  const siteUrl = "https://rvardiashvili.github.io"; // Assuming GitHub Pages or similar
  const defaultImage = `${import.meta.env.BASE_URL}media/webp/pfp.webp`; // Use PFP or a dedicated OG image

  return (
    <Helmet>
      {/* Basic Tags */}
      <title>{title ? `${title} | Rati Vardiashvili` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title ? `${title} | Rati Vardiashvili` : siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={title ? `${title} | Rati Vardiashvili` : siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
