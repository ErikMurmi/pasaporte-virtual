import Barra from "../components/Barra"
import style from "../styles/registro.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"

import {singUpWithEmailAndPassword} from '../config/client'

export const registro = () => {
    const user = useUser()
    const router = useRouter()
    const colegios = [
        {value: "default", colegio: "Elige tu colegio"},
        {value: "uea", colegio: "Unidad Educativa Alluriquín"},
        {value: "uea", colegio: "Unidad Educativa Alluriquín"},
        {value: "uea", colegio: "Unidad Educativa Alluriquín"},
        {value: "uea", colegio: "Unidad Educativa Alluriquín"},
    ]
    const [newUser,setNewUser] = useState({
        nombre:'',
        colegio:'',
        email:'',
        password:'',
        unlockedBadges:[]
    })

    useEffect(() => {
        user && router.replace("/inicio")
      }, [user])

    const handleChange =(e)=>{
        const {value,name} = e.target
        setNewUser({...newUser,[name]:value})
    }

    const signUp=(form)=>{
        form.preventDefault()
        singUpWithEmailAndPassword(newUser.email,newUser.password)
        console.log(newUser)
    }

    return (
        <div>
            <Barra></Barra>
            <div className={style.titulo}>
                <h2>Registro</h2>
            </div>

            <form className={style.form} onSubmit={signUp}>
                <label htmlFor="nombre">Nombre y Apellido</label>
                <input id="nombre" type="text" name="nombre" onChange={handleChange}
                placeholder="Ingresa tu nombre"></input>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" onChange={handleChange}
                type="email" placeholder="Ingresa tu correo"></input>
                <label htmlFor="contrasenia">Contraseña</label>
                <input id="contrasenia" name="password" onChange={handleChange}
                 type="password" placeholder="Ingresa tu contraseña"></input>
                <label htmlFor="colegio">Mi colegio</label>
                <select name="colegio" id="colegio" defaultValue={'default'}
                onChange={handleChange}>
                    {colegios.map((colegio) => (
                    <option value={colegio.value}>{colegio.colegio}</option>
                ))}
                </select>
                <input type="submit" value="Registrar"></input>
            </form>
            <div className={style.linkCenter}>
                <Link href="/login" className={style.link}>
                    Ya tienes una cuenta? Inicia sesión aquí
                </Link>
            </div>
        </div>
    )
}

export default registro