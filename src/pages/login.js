import Barra from "../components/barra"
import style from "../styles/login.module.css"
//import SafeAreaView from "react"
import Link from "next/link"
import Head from "next/head"

export const login = () => {
    return (
        <div>
            <Head>
                <title>Pasaporte Udla - Log In</title>
            </Head>
            <Barra></Barra>
            <div className={style.titulo}>
                <h1>Pasaporte UDLA</h1>
                <h2>Inicio de Sesión</h2>
            </div>
            <form className={style.form}>
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="Ingresa tu correo"></input>
                    <label for="contrasenia">Contraseña</label>
                    <input id="contrasenia" type="password" placeholder="Ingresa tu contraseña"></input>
                    <input className={style.botones} type="submit" value="Ingresar"></input>
                </form>
                <div className={style.linkCenter}>
                    <Link href="/registro" className={style.link}>
                        Aún no estás registrado? Haz click aquí
                    </Link>
                </div>                
        </div>
    )
}

export default login