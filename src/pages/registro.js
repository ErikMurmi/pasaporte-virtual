import Barra from "../components/Barra"
import style from "../styles/registro.module.css"
import Link from "next/link"

export const registro = () => {
    return (
        <div>
            <Barra></Barra>
            <div className={style.titulo}>
                <h2>Registro</h2>
            </div>

            <form className={style.form}>
                <label for="nombre">Nombre y Apellido</label>
                <input id="nombre" type="text" placeholder="Ingresa tu nombre"></input>
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="Ingresa tu correo"></input>
                <label for="contrasenia">Contraseña</label>
                <input id="contrasenia" type="password" placeholder="Ingresa tu contraseña"></input>
                <label for="colegio">Mi colegio</label>
                <select name="colegio" id="colegio">
                    <option value="" disabled selected>Select your option</option>
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