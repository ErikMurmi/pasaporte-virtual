import Barra from "../components/Barra"
import style from "../styles/registro.module.css"
import Link from "next/link"
import { useState } from "react"

export const registro = () => {

    const fields = {EMAIL:'email',PASSWORD:'password'}
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState('')
    const [newUser,setNewUser] = useState({
        nombre:'',
        colegio:'',
        email:'',
        password:'',

    })

    const handleChange =(e)=>{
        const {value,name} = e.target
        setNewUser({...newUser,[name]:value})
    }

    const signUp=(form)=>{
        form.preventDefault()
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
                    <option value="default">Elige tu colegio</option>
                    <option value="uea">Unidad Educativa Alluriquín</option>
                    <option value="cc">Colegio Caracas</option>
                    <option value="cq">Colegio Quito</option>
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