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
import CarouselComponent from "../components/Carousel"
import { getUserUnlockedBadges } from "./api/users/index"
import Scan from "./scan"
import { formControlUnstyledClasses } from "@mui/base"

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
  const [carrouselBadges, setCarrouselBadges] = useState(props.normalBadges)
  const [pageState, setPageState] = useState(states.WAITING)
  const [badgesState,setBadgesState] = useState('normales')
  const [normalesCompleted,setNormalesCompleted] = useState(false)

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
    if (unlockedBadges.length > 0) {
      loadNormalesBadges()
    }
  }, [unlockedBadges])



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

  function loadBonusBadges(){
    setBadgesState('bonus')
    comparadorListas(props.bonusBadges)
    for(let i=0;i<carrouselBadges.length;i++){
      if(carrouselBadges[i].unlocked===false){
        setNormalesCompleted(false)
        return
      }
    }
    setNormalesCompleted(true)
  }

  function loadNormalesBadges(){
    setBadgesState('normales')
    comparadorListas(props.normalBadges)
  }

  return (<>
    <Barra logged="true" ></Barra>
    {pageState === states.WAITING &&
      <div div className={style.insigniasUsuario}>
        <div style={{ textAlign: "left" }}>
          <p style={{ backgroundColor: "black",overflowWrap: "normal", alignSelf: "center",fontSize:"1.2em", fontWeight:"bold",
          color: "white", maxWidth: "80%", borderRadius: "1rem", padding: ".8em" }}
          >{`${info? `${info.name} has`: 'Has'} recolectado ${unlockedBadges.length} insiginias`}
            </p>
        </div>
        <div className="horizontal-container">
          <button onClick={loadNormalesBadges} style={badgesState==='normales'?{backgroundColor:"#8D2331", color:"white",fontWeight: "bold"}:null} className="bonus-type">
            Normales
          </button >
          <hr className='vertical-line'/>
          <button className="bonus-type" style={badgesState==='bonus'?{backgroundColor:"#8D2331", color:"white", fontWeight: "bold"}:null} 
          onClick={loadBonusBadges}>
            Bonus
          </button>
        </div>
        <div className={[style.tamanioCarousel]}>
          <CarouselComponent images={carrouselBadges} />
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
  let normalBadges = []
  let bonusBadges = []
  badges.forEach(badge => {
     if(badge.type==='normal'){
      normalBadges.push(badge)
     }
     if(badge.type==='bono'){
      bonusBadges.push(badge)
     }
  });
  console.log('Normal badges: ',normalBadges)
  console.log('Bonus badges: ',bonusBadges)
  return {
    props: {
      normalBadges: normalBadges,
      bonusBadges: bonusBadges,
      availableBadges: imgArray
    }
  }

}
