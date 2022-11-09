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

export const states = {
  WAITING: 'WAIT',
  SCANNING: 'SCANNING',
  RELOAD: 'RELOAD'
}

export default function inicio(props) {
  const router = useRouter()
  const user = useUser();
  const [info, setInfo] = useState(null)
  const [unlockedBadges, setUnlockedBadges] = useState([])
  const [carrouselBadges, setCarrouselBadges] = useState(props.availableBadges)
  const [pageState, setPageState] = useState(states.WAITING)
  const [carrouselFinalBadges, setCarrouselFinalBadges] = useState([{ src: "/Insignia.png" }]);

  function handleNewBadgeChange(screen) {
    setNewBadgeUnlocked(screen);
  }

  async function getUserInfo() {
    setInfo(await getUser(user.uid))
  }
  async function getBadges() {
    setUnlockedBadges(await getUserUnlockedBadges(user.uid))
  }

  useEffect(() => {
    if (pageState === states.RELOAD) {
      getBadges();
      setPageState(states.WAITING)
    }
  }, [pageState])

  useEffect(() => {
    if (user !== null && user !== undefined) {
      getBadges()
      getUserInfo()
    }
  }, [user])

  useEffect(() => {
    if (unlockedBadges.length > 0) {
      console.log('Desbloqueados: ', unlockedBadges)
      setCarrouselBadges(mapBadgesToCarrousel(unlockedBadges))
      comparadorListas()
      console.log('Lista de badges carrousel: ', carrouselFinalBadges)
    }
  }, [unlockedBadges])


  console.log('Llegan de props', props.availableBadges)

  function reload() {

    window.location.reload();
  }

  function comparadorListas() {
    let badges = carrouselBadges;
    for (let s = 0; s < badges.length; s++) {
      badges[s] = { ...badges[s], unlocked: false }
    }
    for (let i = 0; i < unlockedBadges.length; i++) {
      let actualBadge = unlockedBadges[i]
      for (let j = 0; j < badges.length; j++) {
        console.log(`Actual badge:${actualBadge.name} comparacion:${badges[j].title} resultado${actualBadge.name === badges[j].title}`,)
        if (actualBadge.name === badges[j].title) {
          badges[j].unlocked = true
        }
      }
    }
    console.log("badges en false: ", badges)
    setCarrouselFinalBadges(badges);
  }

  return (<>
    <Barra logged={true} ></Barra>

    {pageState === states.WAITING &&
      <div div className={style.insigniasUsuario}>
        <div style={{ textAlign: "left" }}>
          <h2>Bienvenido {info ? info.name : null}</h2>
          <h2 style={{ backgroundColor: "black", alignSelf: "center", color: "white", maxWidth: "80%", borderRadius: "2rem", padding: "1em" }}>Insignias recolectadas:
            &nbsp;&nbsp;{unlockedBadges.length}</h2>
        </div>
        <div className={[style.tamanioCarousel]}>
          <CarouselComponent images={carrouselFinalBadges} />
        </div>
        <button onClick={() => { setPageState(states.SCANNING) }}>

          <div className={style.botonQr}>
            <Image src={qr} alt='qr_img' className={style.imagenBotonQR} />
          </div>
          &nbsp;Agregar insignia
        </button>
      </div>
    }

    {pageState === states.SCANNING &&
      <Scan onScanChange={setPageState}></Scan>
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
