import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Insignia from "../images/Insignia.png"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { BiLeftArrow, BiRightArrow } from '../../node_modules/react-icons/bi';
import { getAuth } from "firebase/auth";
import CarouselComponent from "../components/carousel"

export const inicio = ({ props, Nombre }) => {
  //const user = useUser()
  const router = useRouter()
  const auth = getAuth();
  const user = auth.currentUser;
  // useEffect(() => {
  //   !user && router.replace("/login")
  // }, [user])

  useEffect(() => {
    console.log(user)
  }, [])
  return (
    <div>
      <Barra logged={true} ></Barra>
      <div className={style.titulo}>
        <h2>Bienvenido {user.email}</h2>
        <h2>Insignias recolectadas</h2>
      </div>
      <div className={style.scroll}>
        <CarouselComponent/>
      </div>
      <div className={style.form}>
        <button>
          <div className={style.contenidoBoton}>
          <Image src={qr} className={style.imagen}/>
          </div>
          &nbsp;Agregar insignia
        </button>
      </div>
    </div>
  )
}

export default inicio