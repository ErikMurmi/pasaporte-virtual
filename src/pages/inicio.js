import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { ref,getDownloadURL } from 'firebase/storage';
import { getAllBadges } from "./api/badges"
import { useRouter } from "next/router"
import { auth,storage } from "../config/client"
import CarouselComponent from "../components/carousel"
import {getUserUnlockedBadges} from "./api/users/index"

export default function inicio (props){
  const router = useRouter()
  const user = auth.currentUser;
  const [info,setInfo] = useState(null)
  const [unlockedBadges,setUnlockedBadges] = useState([])

  console.log('props:',props)
  useEffect(() => {
    async function getBadges(){
      setUnlockedBadges(await getUserUnlockedBadges(user.uid))
    }
    getBadges()
  }, [])

  useEffect(()=>{
    console.log('unl bad: ',unlockedBadges)
  },[unlockedBadges])


  return (
    <div>
      <Barra logged={true} ></Barra>
      <div className={style.titulo}>
        <h2>Bienvenido {user?user.email:null}</h2>
        <h2>Insignias recolectadas</h2>
        <p>{props.availableBadges.length}</p>
      </div>
      <div className={style.scroll}>
        <CarouselComponent images={props.availableBadges}/>
      </div>
      <div className={style.form}>
        <button onClick={()=>{router.replace('/scan')}}>
          <div className={style.contenidoBoton}>
          <Image src={qr} alt='qr_img' className={style.imagen}/>
          </div>
          &nbsp;Agregar insignia
        </button>
      </div>
    </div>
  )
}

export const getServerSideProps=async()=>{
  const badges = await getAllBadges()
  const imgArray = badges.map((badge)=>{
    return{
      src:badge.image,
      alt:"",
      title:badge.name,
    }
  })
  return {
    props:{
      availableBadges:imgArray
    }
  }
}
