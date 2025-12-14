// The Tiled.js isplays 12 Cloudinary images (600x400) arranged in a responsive grid layout, which is then utilized in othe pages as a background.

import React from "react";
import styles from "../styles/Tiled.module.css";
import { cloudinaryBase } from "../utils/utils";

function Tiled() {
  console.log("Tiled component loaded");

  const imageIds = [
    "SeaBuckthorn.png",
    "Carrageen.png",
    "Dandelions.png",
    "ramsons.png",
    "seaweed.png",
    "shrooms1.png",
    "shrooms2.png",
    "hawthorn.png",
    "nettles.png",
    "shrooms3.png",
    "ramsons1.png",
    "blossom.png",
  ];

  // Duplicate the set to ensure coverage on large screens
  const repeatedImages = [...imageIds, ...imageIds, ...imageIds];

  return (
    <div className={styles.TiledBackground}>
      {repeatedImages.map((id, index) => (
        <img
          key={`${id}-${index}`}
          src={`${cloudinaryBase}${id}`}
          alt={`tile ${id}`}
          className={styles.TileImage}
        />
      ))}
    </div>
  );
}

export default Tiled;
