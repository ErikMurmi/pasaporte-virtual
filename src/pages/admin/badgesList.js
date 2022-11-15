import Barra from "../../components/Barra"
import Badge from "../../components/Badge"
import adminStyle from "../../styles/admin.module.css"
import { getAllBadges } from "../api/badges"
import { useEffect, useState } from "react"
import Link from "next/link"


export default function BadgesList({ props, Nombre }) {

    const [badgeList, setBadgeList] = useState([{
        description: "Facultad de ingenierias y ciencias aplicadas",
        image: "name.png",
        name: "FICA",
        qr: "qr_name.png",
        type: "bono"
    }
    ]);

    useEffect(() => {
        loadBadges();
    }, [])

    const loadBadges = async () => {
        let badgeL = await getAllBadges();
        // console.log(badgeL);
        setBadgeList(badgeL);
        // badgeList = badgeL;
    }

    return (
        <div >
            <Barra></Barra>

            < h2 className={adminStyle.titulo} style={{textAlign:"left", marginLeft:"10%", marginTop:"10%"}}>Bienvenido {Nombre}<br></br>
                Insignias</h2>
            <div className={adminStyle.boton}>
                <Link classname={adminStyle.botonAgregar} href="/admin/Badges" >
                    Agregar insignia
                </Link>
            </div>


            <div className={adminStyle.badgeList}>
                {badgeList.map((badge) => (
                    <Badge key={badge.description} name={badge.name} description={badge.description} location={badge.location} type={badge.type} image={badge.image} qrCode={badge.qr}></Badge>
                    // <p key={badge.description}>{badge.description}  {badge.type}</p>
                ))}
            </div>

        </div>


    )
}

