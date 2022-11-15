import Barra from "../../components/Barra"
import Badge from "../../components/Badge"
import adminStyle from "../../styles/admin.module.css"
import { getAllBadges } from "../api/badges"
import { useEffect, useState } from "react"
import Link from "next/link"


export default function BadgesList(props) {

    const [badgeList, setBadgeList] = useState([{
        description: "Facultad de ingenierias y ciencias aplicadas",
        image: "name2.png",
        name: "FICA",
        qr: "qr_name.png",
        type: "bono"
    }
    ]);
    console.log(props.allBadges)
    console.log("mensajes de ")
    console.log("mensajes de ")
    console.log("mensajes de ")
    console.log("mensajes de ")
    return (
        <div >
            <Barra></Barra>

            < h2 className={adminStyle.titulo} style={{textAlign:"left", marginLeft:"10%", marginTop:"15%"}}>Bienvenido <br></br>
                Insignias</h2>
            <div className={adminStyle.boton}>
                <Link className={adminStyle.botonAgregar} href="/admin/badges" >
                    Agregar insignia
                </Link>
            </div>


            <div className={adminStyle.badgeList}>
                {props.allBadges.map((badge, index) => (
                    <Badge key={index} name={badge.name} description={badge.description} location={badge.location} type={badge.type} image={badge.image} qrCode={badge.qr}></Badge>
                    
                ))}
            </div>

        </div>


    )
 
      
}
export const getServerSideProps = async () => {
    const badges = await getAllBadges()
   
    return {
      props: {
       allBadges:badges
      }
    }
  
  }
