import styles from "./page.module.css";
import { FigureList } from './components/FigureList/FigureList'

export default function Home() {
  return (
    <main>
      <h1 className={styles.header}>Figure Tool</h1>
      <FigureList />
    </main>
  )
}
