import styles from '../styles/Barra.module.css'
import logo from "../Logo.png"
import Imagen from "next/image"

export const Barra = () => {
    return (
        <div>
            <div className={styles.barra}>
                <Imagen className={styles.imagen} src={logo}
                    alt="logo-udla"
                    width={"95vh"}
                    height={"40vh"}
                />
            </div>
        </div>
    )
}

export default Barra