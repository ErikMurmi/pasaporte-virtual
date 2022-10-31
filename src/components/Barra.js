import styles from '../styles/Barra.module.css'
import logo from "../Logo.png"
import Imagen from "next/image"
import { getAuth, signOut } from "firebase/auth";
import useUser from '../hooks/useUser';
export const Barra = (props) => {
    const user = useUser()
    const auth = getAuth();
    const signingOut =()=>signOut(auth).then(console.log(user));
    return (
        <div>
            <div className={styles.barra}>
                <Imagen className={styles.imagen} src={logo}
                    alt="logo-udla"
                    width={"95vh"}
                    height={"40vh"}
                />
                {props.logged? <button onClick={signingOut}>
                    Cerrar Sesion
                </button>:null}
            </div>
        </div>
    )
}

export default Barra