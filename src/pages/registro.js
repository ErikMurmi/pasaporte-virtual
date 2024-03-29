import Barra from "../components/Barra"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/client"
import { addUser } from "./api/users"

export const Registro = () => {
    const [password, setPassword] = useState("")
    const user = useUser()
    const router = useRouter()
    const colegios = [
        { value: "default", colegio: "Elige tu colegio" },
        { value: "isaac", colegio: "Isaac Newton" },
        { value: "william", colegio: "William Shakespeare" },
        { value: "letort", colegio: "Letort" },
        { value: "efrata", colegio: "Efrata" },
        { value: "rudolf", colegio: "Rudolf Steiner" },
        { value: "pedro", colegio: "Pedro Pablo Traversari" },
    ]
    const [newUser, setNewUser] = useState({
        name: '',
        colegio: '',
        email: '',
        type: 'client',
        bonos: 0,
        normales:0,
        enable: true,
    })

    useEffect(() => {
        user && router.replace("/inicio")
    }, [user])

    const handleChange = (e) => {
        const { value, name } = e.target
        setNewUser({ ...newUser, [name]: value })
    }

    const handlePassword = (e) => {
        handleChange; 
        (e) => setPassword(e.target.value); 
        console.log(password);
    }

    const signUp = async (form) => {
        form.preventDefault()
        if (newUser.colegio.length==0 || newUser.colegio ==='default'){
            alert("Se debe seleccionar un colegio")
        }else{
            await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    addUser({ id: user.uid, ...newUser })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("code:", errorCode, "msg:", errorMessage)
                    return null
                });
        }
    }

    return (
        <div>
            <Barra></Barra>
            <h1>Registro</h1>
            <form onSubmit={signUp}>

                <label htmlFor="nombre">Nombre y Apellido <div>*</div></label>
                <input id="nombre" type="text" name="name" onChange={handleChange}
                    placeholder="Tu nombre completo"></input>
                <label htmlFor="email">Email <div>*</div></label>
                <input id="email" name="email" onChange={handleChange}
                    type="email" placeholder="example@mail.com"></input>
                <label htmlFor="contrasenia">Contraseña <div>*</div></label>
                <input id="contrasenia" name="password" onChange={handleChange}
                    type="password" placeholder="Mínimo 6 caracteres" minLength={6}></input>
             {/* {password.length<6 && <label>Contraseña debe tener mas de 6 caracteres</label>} */}
                <label htmlFor="colegio">Mi colegio <div>*</div></label>
                <select name="colegio" id="colegio" defaultValue={'default'}
                    onChange={handleChange}>
                    {colegios.map((colegio) => (
                        <option key={colegio.value} value={colegio.value}>{colegio.colegio}</option>
                    ))}
                </select>
                <input type="submit" value="Registrar"></input>
            </form>
            <div className="linkCenter">
                <p>Ya tienes una cuenta? </p>
                <Link href="/" className="link">
                    Inicia sesión aquí
                </Link>
            </div>
        </div>
    )
}

export default Registro