import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { storage } from '../config/client';
import { ref,getDownloadURL } from 'firebase/storage';
import { useEffect } from 'react';
import Link from 'next/link';


export default function Home() {

  const pathReference = ref(storage, 'images/badges/FICA.png');
  const testImage =() =>{
      getDownloadURL(pathReference)
    .then((url) => {
      const img = document.getElementById('badge');
      console.log(url)
      img.setAttribute('src', url);
    })
    .catch((error) => {
      console.log("No se pudo cargar la imagen: ",error)
    });
  }
  useEffect(() => {
    testImage()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Qr - Code</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Pasaporte Virtual
        </h1>


        <div className={styles.grid}>
          <Link href="/scan" className={styles.card}>
            <h2>Scan a qr code&rarr;</h2>
            <p>Scan a qr code with your camera</p>
          </Link>

          <Link href="/generate" className={styles.card}>
            <h2> Generate a qr code&rarr;</h2>
            <p> Generate a qr code with text or a link</p>
          </Link>

          <Image height={200} id="badge">

          </Image>
        </div>
        
      </main>

      <footer className={styles.footer}>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </Link>
      </footer>
    </div>
  )
}
