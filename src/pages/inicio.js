import Barra from "../components/Barra"
import style from "../styles/components.module.css"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { getAllBadges } from "./api/badges"
import { useRouter } from "next/router"
import { auth, storage } from "../config/client"
import { getUser } from "./api/users/index"
import CarouselComponent from "../components/carousel"
import { getUserUnlockedBadges } from "./api/users/index"
import Scan from "./scan"

export default function inicio(props) {
  const router = useRouter()
  const user = useUser();
  const [info, setInfo] = useState(null)
  const [unlockedBadges, setUnlockedBadges] = useState([])
  const [carrouselBadges, setCarrouselBadges] = useState(props.availableBadges)
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState(false)

  function handleNewBadgeChange(screen){
      setNewBadgeUnlocked(screen);
  }

  useEffect(() => {
    async function getUserInfo() {
      setInfo(await getUser(user.uid))
    }
    async function getBadges() {
      setUnlockedBadges(await getUserUnlockedBadges(user.uid))
    }
    if (user !== null && user !== undefined) {
      getBadges()
      getUserInfo()
    }
  }, [user])

  useEffect(() => {
    if (unlockedBadges.length > 0) {
      setCarrouselBadges(mapBadgesToCarrousel(unlockedBadges))
    }
  }, [unlockedBadges])

  //const [carrouselFinalBadges, setCarrouselFinalBadges] = useState(carrouselBadges);
  const [carrouselFinalBadges, setCarrouselFinalBadges] = useState([{ src: "/Insignia.png", title: "HOLA", unlocked: true }, { src: "/Insignia.png", title: "ADIOS", unlocked: false }]);

  function comparadorListas() {
    const badges = carrouselBadges;
    for (let s = 0; s < badges.length; s++) {
      badges[s] = { ...badges[i], unlocked: false }
    }
    for (let i = 0; i < badges.length; i++) {
      for (let j = 0; j < unlockedBadges.length; j++) {
        if (carrouselBadges[i].title == unlockedBadges[j].title) {
          badges[i].unlocked = true
        }
      }
    }
    setCarrouselFinalBadges(badges);
  }

  return (<>
    <Barra logged={true} ></Barra>
    {newBadgeUnlocked == false &&
      <div div className={style.insigniasUsuario}>
        <div style={{ textAlign: "left" }}>
          <h2>Bienvenido {info ? info.name : null}</h2>
          <h2>Insignias recolectadas</h2>
          <p>{unlockedBadges.length}</p>
        </div>
        <div className={[style.tamanioCarousel]}>
          <CarouselComponent images={carrouselFinalBadges} />
        </div>
        <button onClick={() => { setNewBadgeUnlocked(true) }}>

          <div className={style.botonQr}>
            <Image src={qr} alt='qr_img' className={style.imagenBotonQR} />
          </div>
          &nbsp;Agregar insignia
        </button>
      </div>
    }

    {newBadgeUnlocked == true &&
      <Scan onScanChange={setNewBadgeUnlocked}></Scan>
    }

  </>
  )
}

const mapBadgesToCarrousel = (badges) => {
  return (badges.map((badge) => {
    return {
      src: badge.image,
      alt: "",
      title: badge.name,
    }
  }))
}

export const getServerSideProps = async () => {
  const badges = await getAllBadges()
  const imgArray = mapBadgesToCarrousel(badges)
  return {
    props: {
      availableBadges: imgArray
    }
  }



}
