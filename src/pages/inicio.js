import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { getAllBadges } from "./api/badges"
import { useRouter } from "next/router"
import { auth,storage } from "../config/client"
import { getUser } from "./api/users/index"
import CarouselComponent from "../components/carousel"
import {getUserUnlockedBadges} from "./api/users/index"

export default function inicio (props){
  const router = useRouter()
  const user = useUser();
  const [info,setInfo] = useState(null)
  const [unlockedBadges,setUnlockedBadges] = useState([])
  const [carrouselBadges,setCarrouselBadges] = useState(props.availableBadges)

  useEffect(() => {
    async function getUserInfo(){
      setInfo(await getUser(user.uid))
    }
    async function getBadges(){
      setUnlockedBadges(await getUserUnlockedBadges(user.uid))
    }
    if(user!== null && user!==undefined){
      getBadges()
      getUserInfo()
    }
  }, [user])

  useEffect(()=>{
    if(unlockedBadges.length>0){
      setCarrouselBadges(mapBadgesToCarrousel(unlockedBadges))
    }
  },[unlockedBadges])


  return (<>
    <Barra logged={true} ></Barra>
    <div className={style.form}>
      <div className={style.titulo}>
        <h2>Bienvenido {info?info.name:null}</h2>
        <h2>Insignias recolectadas</h2>
        <p>{props.availableBadges.length}</p>
      </div>
      <div className={style.scroll}>
        <CarouselComponent images={carrouselBadges}/>
      </div>
      <button onClick={()=>{router.replace('/scan')}}>
        <div className={style.contenidoBoton}>
        <Image src={qr} alt='qr_img' className={style.imagen}/>
        </div>
        &nbsp;Agregar insignia
      </button>
    </div>
    </>
  )
}

const mapBadgesToCarrousel=(badges)=>{
  return(badges.map((badge)=>{
    return{
      src:badge.image,
      alt:"",
      title:badge.name,
    }
  }))
}

export const getServerSideProps=async()=>{
  const badges = await getAllBadges()
  const imgArray = mapBadgesToCarrousel(badges)
  return {
    props:{
      availableBadges:imgArray
    }
  }
}
