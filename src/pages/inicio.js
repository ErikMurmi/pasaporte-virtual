import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Insignia from "../images/Insignia.png"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getUser } from "./api/users/index"
import { BiLeftArrow, BiRightArrow } from '../../node_modules/react-icons/bi';
import { getAuth } from "firebase/auth";
import CarouselComponent from "../components/carousel"
import {getUserUnlockedBadges} from "./api/users/index"

export const inicio = ({ props}) => {
  const firebaseUser = useUser()
  const router = useRouter()
  const auth = getAuth();
  const user = auth.currentUser;
  const [info,setInfo] = useState(null)
  const [unlockedBadges,setUnlockedBadges] = useState([])

  useEffect(() => {
    async function getBadges(){
      setUnlockedBadges(await getUserUnlockedBadges(user.uid))
    }
    getBadges()
    console.log(unlockedBadges)
    console.log('user ',firebaseUser)
  }, [])
  return (
    <div>
      <Barra logged={true} ></Barra>
      <div className={style.titulo}>
        <h2>Bienvenido {user?user.email:null}</h2>
        <h2>Insignias recolectadas</h2>
        <p>{unlockedBadges.length}</p>
      </div>
      <div className={style.scroll}>
        <CarouselComponent/>
      </div>
      <div className={style.form}>
        <button onClick={()=>{router.replace('/scan')}}>
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