import Barra from "../components/Barra"
import style from "../styles/login.module.css"
//import SafeAreaView from "react"
import Link from "next/link"
import Head from "next/head"
import { useState, useEffect, use} from "react"
import {loginEmailPassword,auth} from '../config/client'
import { signInWithEmailAndPassword } from "firebase/auth"
import { getUser } from "./api/users"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"

export const login = () => {
    const fields = {EMAIL:'email',PASSWORD:'password'}
    const [errorMsg,setErrorMsg] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const user = useUser()
    const router = useRouter()
  
    // useEffect(() => {
    //     user && router.replace("/inicio")
    // }, [user])

    const handleChange =(e)=>{
        const {value,name} = e.target
        if(name===fields.EMAIL){
            setEmail(value)
        }
        if(name===fields.PASSWORD){
            setPassword(value)
        }
    }

    const signIn=(form)=>{
        form.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            const info = await getUser(user.uid)
            if(info.type==='admin')
                router.replace('/scan')
            else
                router.replace('/inicio')
            console.log(info)
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg("Credenciales invalidas")
            console.log("code:",errorCode,"msg:",errorMessage)
            return false
        });
        // console.log('Logged status: ',logged)
        // if(logged===true){
        //     router.replace('/inicio')
        // }else{
        //     setErrorMsg("Credenciales invalidas")
        // }
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
                    <p style={{textAlign:"center"}}>{errorMsg}</p>
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