import styles from '../styles/components.module.css'
import logo from "../images/Logo.png"
import Imagen from "next/image"
import { getAuth, signOut } from "firebase/auth";
import useUser from '../hooks/useUser';
export const Barra = (props) => {
    const user = useUser()
    const auth = getAuth();
    const signingOut = () => signOut(auth).then(console.log(user));
    return (
        <div className={user === undefined || user === null ? styles.barra : styles.barraSpace}>
            <div className={styles.containerBarra}>
                <Imagen className={styles.logoUdla} src={logo}
                    alt="logo-udla"
                />
            </div>

            {user ? <button onClick={signingOut} className={styles.botonCerrarSesion}>
                Cerrar Sesión
            </button> : null}
        </div>
    )
}

export default Barra