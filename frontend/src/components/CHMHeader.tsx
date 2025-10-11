import styles from "../css/Body.module.scss"

const CHMHeader = () => {
  return (
    <header className="bg-teal-500 h-20">
      <div className={styles.container}>
      <div className={styles.img}>
        <img src="http://localhost:8080/cat.png"></img>
      </div>
      </div>
    </header>
  )
}

export default CHMHeader;