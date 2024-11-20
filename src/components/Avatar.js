import React from 'react';
import styles from '../styles/Avatar.module.css';

// Displays a user's avatar with styling applied dynamically, allowing avatars to be styled
// differently based on where they are used.

function Avatar({ src, alt = 'avatar', text, height = 40, width = 40 }) {
  return (
    <span>
      <img
        src={src}
        alt={alt}
        className={styles.Avatar}
        style={{ height: `${height}px`, width: `${width}px` }}
      />

      {text && <span className={styles.AvatarText}>{text}</span>}
    </span>
  );
}

export default Avatar;
