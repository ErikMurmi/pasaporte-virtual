import Barra from "../components/Barra"
import style from "../styles/components.module.css"
import Image from "next/image"
import qr from "../images/qr.png"
import useUser from "../hooks/useUser"
import { useEffect, useState } from "react"
import { getAllBadges } from "./api/badges"
import { useRouter } from "next/router"
import { getUser } from "./api/users/index"
import CarouselC from "../components/CarouselC"
import { getUserUnlockedBadges } from "./api/users/index"
import Scan from "./scan"
import { borderColor } from "@mui/system"
import InsigniasFrame from "components/InsigniasFrame"

export const states = {
  WAITING: 'WAIT',
  SCANNING: 'SCANNING',
  RELOAD: 'RELOAD'
}

export default function Inicio(props) {
  const router = useRouter()
  const user = useUser();
  const [info, setInfo] = useState(null)
  const [unlockedBadges, setUnlockedBadges] = useState([])
  const [carrouselBadges, setCarrouselBadges] = useState(props.normalBadges)
  const [pageState, setPageState] = useState(states.WAITING)
  const [badgesState, setBadgesState] = useState('hidden')
  const [normalesCompleted, setNormalesCompleted] = useState(false)
  const [view, setView] = useState(true)

  async function getUserInfo() {
    setInfo(await getUser(user.uid))
  }
  async function getUnlockedBadges() {
    setUnlockedBadges(await getUserUnlockedBadges(user.uid))
  }

  useEffect(() => {
    if (pageState === states.RELOAD) {
      getUnlockedBadges();
      setPageState(states.WAITING)
    }
  }, [pageState])

  useEffect(() => {
    if (user !== null && user !== undefined) {
      getUnlockedBadges()
      getUserInfo()
    }
  }, [user])

  useEffect(() => {
    // if (unlockedBadges.length > 0) {
    //   loadNormalesBadges()
    // }
  }, [unlockedBadges])


  useEffect(() => {
    console.log(normalesCompleted)
  }, [normalesCompleted])


  function comparadorListas(badgesList) {
    let badges = badgesList;
    for (let s = 0; s < badges.length; s++) {
      badges[s] = { ...badges[s], unlocked: false }
    }
    for (let i = 0; i < unlockedBadges.length; i++) {
      let actualBadge = unlockedBadges[i]
      for (let j = 0; j < badges.length; j++) {
        if (actualBadge.name === badges[j].name) {
          badges[j].unlocked = true
        }
      }
    }
    //console.log("badges para carrousel ", badges)
    setCarrouselBadges(badges)
  }

  function loadBonusBadges() {
    setView(true)
    setBadgesState('bonus')
    comparadorListas(props.bonusBadges)
    for (let i = 0; i < carrouselBadges.length; i++) {
      if (carrouselBadges[i].unlocked === false) {
        setNormalesCompleted(false)
        return
      }
    }
    setNormalesCompleted(true)
  }

  function loadNormalesBadges() {
    setView(true)
    setBadgesState('normales')
    comparadorListas(props.normalBadges)
  }

  function loadNormalesFrame() {
    setBadgesState('info')
    setView(false)
    comparadorListas(props.normalBadges)
  }

  console.log(props)
  return (<>
    <Barra logged="true" ></Barra>
    {pageState === states.WAITING &&
      <div div className={style.insigniasUsuario}>
        <div style={{ textAlign: "left" }}>
          <p style={{
            backgroundColor: "black", overflowWrap: "normal", alignSelf: "center", fontSize: "1.2em", fontWeight: "bold",
            color: "white", maxWidth: "90%", borderRadius: "1rem", padding: ".8em", marginBottom: "10%"
          }}
          >{`${info ? `${info.name} has` : 'Has'} recolectado ${unlockedBadges.length} insiginias`}
          </p>
        </div>
        <div className="horizontal-container">
          <button onClick={loadNormalesBadges} style={badgesState==='normales'?{backgroundColor:"#8D2331", color:"white",fontWeight: "bold"}:null} className="bonus-type">
            Estaciones
          </button >
          <hr className='vertical-line' />
          <button className="bonus-type" style={badgesState === 'bonus' ? { backgroundColor: "#8D2331", color: "white", fontWeight: "bold" } : null}
            onClick={loadBonusBadges}>
            Bonus
          </button>
          <hr className='vertical-line'/>
          <button className="bonus-type" style={badgesState==='info'?{backgroundColor:"#8D2331", color:"white", fontWeight: "bold"}:null} 
          onClick={loadNormalesFrame}>
            Info Estaciones
          </button>
        </div>
    {badgesState ==="hidden"?null:<>
        {badgesState === 'normales' | badgesState === 'bonus' ?
          <div className={[style.tamanioCarousel]}>
            <CarouselC images={carrouselBadges} />
          </div>
          :
          <div className={[style.tamanioFrame]}>
            <InsigniasFrame insignias={carrouselBadges} />
          </div>
        }
        {normalesCompleted && badgesState === 'normales' ? <div style={{ textAlign: "center" }}>
          <h3>¡Felcidades por completar la aventura!</h3>
          <p>Ahora puedes conocer la universidad más de cerca</p>
          <button className="button" style={{ backgroundColor: "#f26500", marginBottom: "-20px", borderColor: "#f26500" }}
            onClick={() => { router.push('/video') }}>Ver video</button></div> : null}</>}
        <button onClick={() => { setPageState(states.SCANNING) }}>
          <div className={style.botonQr}>
            <Image src={qr} alt='qr_img' className={style.imagenBotonQR} />
          </div>
          &nbsp;Agregar insignia
        </button>
      </div>
    }

    {pageState === states.SCANNING &&
      <Scan onScanChange={setPageState} unlockedBadges={unlockedBadges}></Scan>
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
  let normalBadges = []
  let bonusBadges = []
  badges.forEach(badge => {
    if (badge.type === 'normal') {
      normalBadges.push(badge)
    }
    if (badge.type === 'bono') {
      bonusBadges.push(badge)
    }
  });
  console.log('Normal badges: ', normalBadges)
  console.log('Bonus badges: ', bonusBadges)
  return {
    props: {
      normalBadges: normalBadges,
      bonusBadges: bonusBadges,
      availableBadges: imgArray
    }
  }

}
