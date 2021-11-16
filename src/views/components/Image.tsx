import React from "react";

export type ImageProps = {
  path: string;
};

const pathToWebp = (path: string) => path.replace(/.(jpg|png|jpeg)$/, ".webp");

const Image: React.FC<ImageProps> = function ({ path }) {
  const imagePath = `/images${path}`;
  const webpPath = pathToWebp(imagePath);

  return (
    <picture>
      <source type="image/webp" data-srcset={webpPath} />
      <source type="image/jpeg" data-srcset={imagePath} />
      <img data-src={imagePath} className="lazyload" alt="" />
    </picture>
  );
};
export default Image;
