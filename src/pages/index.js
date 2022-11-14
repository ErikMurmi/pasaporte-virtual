import Barra from "../components/Barra"
//import SafeAreaView from "react"
import Link from "next/link"
import Head from "next/head"
import { useState, useEffect, use } from "react"
import { loginEmailPassword, auth } from '../config/client'
import { signInWithEmailAndPassword } from "firebase/auth"
import { getUser } from "./api/users"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"

export const login = () => {
    const fields = { EMAIL: 'email', PASSWORD: 'password' }
    const [errorMsg, setErrorMsg] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const user = useUser()
    const router = useRouter()

    // useEffect(() => {
    //     user && router.replace("/inicio")
    // }, [user])

    const handleChange = (e) => {
        errorMsg.length > 0 ? setErrorMsg("") : null
        const { value, name } = e.target
        if (name === fields.EMAIL) {
            setEmail(value)
        }
        if (name === fields.PASSWORD) {
            setPassword(value)
        }
    }

    async function signIn(form) {
        form.preventDefault()
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setErrorMsg("Loading...")
                const user = userCredential.user;
                const info = await getUser(user.uid)
                if (info.type === 'admin')
                    router.replace('/admin/AdminMenu')
                else
                    router.replace('/inicio')
                return true;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMsg("Credenciales invalidas")
                console.log("code:", errorCode, "msg:", errorMessage)
                return false
            });
    }

    return (
        <div>
            <Head>
                <title>Pasaporte Udla - Log In</title>
            </Head>
            <Barra></Barra>
            <h1>Pasaporte UDLA</h1>
            <h2>Inicio de Sesión</h2>
            <form autoComplete="off"  onSubmit={signIn}>

                <label htmlFor="email">Email</label>
                <input id="email" name='email' autoComplete="false" type="email" onChange={handleChange} placeholder="Ingresa tu correo"></input>
                <label htmlFor="contrasenia">Contraseña</label>
                <input id="contrasenia" name="password" type="password" onChange={handleChange} placeholder="Ingresa tu contraseña"></input>
                <p style={{ textAlign: "center" }}>{errorMsg}</p>
                <input type="submit" value="Ingresar"></input>
            </form>
            <div className="linkCenter">
                <p>Aún no estás registrado? </p>
                <Link href="/registro" className="link">
                    Haz click aquí
                </Link>
            </div>
        </div>
    )
}

export default login