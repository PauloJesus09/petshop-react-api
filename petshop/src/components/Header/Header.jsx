import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>PetShop - Gestão de Pacientes</h1>
      <p className={styles.subtitulo}>Gerencie os pets e seus tutores com praticidade</p>
    </header>
  )
}

export default Header;