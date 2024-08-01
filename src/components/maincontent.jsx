import styles from '../styles/MainContent.module.css';

const MainContent = () => {
  return (
    <div className={styles.mainContent}>
      <h2>About</h2>
      <p>
        I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
      </p>
      <div className={styles.socialIcons}>
        <a href="https://facebook.com">
          <img src="/facebook-icon.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com">
          <img src="/twitter-icon.png" alt="Twitter" />
        </a>
        <a href="https://linkedin.com">
          <img src="/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com">
          <img src="/github-icon.png" alt="GitHub" />
        </a>
      </div>
    </div>
  );
};

export default MainContent;