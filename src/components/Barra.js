import styles from '../styles/Barra.module.css'
import logo from "../images/Logo.png"
import Imagen from "next/image"
import { getAuth, signOut } from "firebase/auth";
import useUser from '../hooks/useUser';
export const Barra = (props) => {
    const user = useUser()
    const auth = getAuth();
    const signingOut = () => signOut(auth).then(console.log(user));
    return (
        <div id="fjad">
            <div className={!props.logged?styles.barra:styles.barraSpace}>
                <div className={styles.container}>
                    <Imagen className={styles.imagen} src={logo}
                        alt="logo-udla"
                    />
                </div>

                {props.logged ? <button onClick={signingOut} className={styles.button}>
                    Cerrar Sesión
                </button> : null}
            </div>
        </div>
    )
}

export default Barra