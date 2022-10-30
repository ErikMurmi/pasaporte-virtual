import Barra from "../components/Barra"
import style from "../styles/login.module.css"
//import SafeAreaView from "react"
import Link from "next/link"
import Head from "next/head"
import { useState } from "react"
import {loginEmailPassword} from '../config/client'
import { useRouter } from "next/router"

export const login = () => {
    const fields = {EMAIL:'email',PASSWORD:'password'}
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const router = useRouter()

    const handleChange =(e)=>{
        const {value,name} = e.target
        if(name===fields.EMAIL){
            setEmail(value)
        }
        if(name===fields.PASSWORD){
            setPassword(value)
        }
    }

    const signIn= (form)=>{
        form.preventDefault()
        const logged = loginEmailPassword(email,password)
        console.log(logged)
        if(logged){
            router.replace('/inicio')
        }
    }

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
            <form autoComplete="off" className={style.form} onSubmit={signIn}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name='email' autoComplete="false" type="email" onChange={handleChange} placeholder="Ingresa tu correo"></input>
                    <label htmlFor="contrasenia">Contraseña</label>
                    <input id="contrasenia" name="password" type="password" onChange={handleChange} placeholder="Ingresa tu contraseña"></input>
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