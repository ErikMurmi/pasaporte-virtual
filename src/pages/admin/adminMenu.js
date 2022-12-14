import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Barra from '../../components/Barra'
import Link from 'next/link'




export default function AdminMenu() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Menu de administración</title>
      </Head>
      <Barra></Barra>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Pasaporte Virtual
        </h1>


        <div className={styles.grid}>
          <Link href="/admin/badgesList" className={styles.card}>
            <h2>Insignias&rarr;</h2>
            <p>Administrar lista de insignias</p>
          </Link>

          <Link href="/admin/usuarios" className={styles.card}>
            <h2> Estudiantes&rarr;</h2>
            <p> Administrar lista de estudiantes</p>
          </Link>


        </div>
        
      </main>
    </div>
  )
}
