import React from 'react';

// Import Style
import styles from './Footer.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container text-center">
        <span className="text-white">&copy; {(new Date().getFullYear())} Alexey Kutalo</span>
      </div>
    </footer>
  );
}

export default Footer;
