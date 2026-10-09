'use client';

import { useState, useEffect } from 'react';

export default function ToolLogo({ src, alt, name, className = '', fallbackClassName = '' }) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src?.trim() ? src.trim() : null);

  useEffect(() => {
    setImgSrc(src?.trim() ? src.trim() : null);
    setError(false);
  }, [src]);

  const handleError = () => {
    setError(true);
  };

  if (!imgSrc || error) {
    return (
      <img
        src="/logo.png"
        alt={`${alt || name} fallback`}
        className={`w-full h-full object-contain p-2 bg-gray-50 ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || `${name} logo`}
      className={`w-full h-full object-cover ${className}`}
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}
