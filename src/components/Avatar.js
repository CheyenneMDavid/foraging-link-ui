import React from "react";
import styles from "../styles/Avatar.module.css";

const resizeAvatar = (url, width, height) =>
  url && url.includes("res.cloudinary.com")
    ? url.replace(
        "/upload/",

        `/upload/f_auto,q_auto,w_${width},h_${height},c_fill,g_auto/`,
      )
    : url;

function Avatar({ src, alt = "avatar", text, height = 50, width = 50 }) {
  const formattedSrc = resizeAvatar(src, width, height);
  return (
    <span>
      <img
        src={formattedSrc}
        alt={alt}
        className={styles.avatar}
        style={{ height: `${height}px`, width: `${width}px` }}
      />

      {text && <span className={styles.avatarText}>{text}</span>}
    </span>
  );
}

export default Avatar;
