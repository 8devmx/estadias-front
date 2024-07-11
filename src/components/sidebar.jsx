import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <img src="/ruta-a-tu-imagen.jpg" alt="Perfil" />
      <a href="#about">ABOUT</a>
      <a href="#experience">EXPERIENCE</a>
      <a href="#education">EDUCATION</a>
      <a href="#skills">SKILLS</a>
      <a href="#interests">INTERESTS</a>
      <a href="#awards">AWARDS</a>
    </div>
  );
};

export default Sidebar;
