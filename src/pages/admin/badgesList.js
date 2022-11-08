import Barra from "../../components/Barra"
import Badge from "../../components/Badge"
import adminStyle from "../../styles/admin.module.css"
import { getAllBadges } from "../api/badges"
import { useEffect, useState } from "react"


export default function badgesList({ props, Nombre }) {

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
            <div className={adminStyle.boton}   >
                <a classname={adminStyle.botonAgregar} href="/admin/badges" >
                    Agregar insignia
                </a>
            </div>


            <div className={adminStyle.badgeList}>
                {badgeList.map((badge) => (
                    <Badge key={badge.description} description={badge.description} type={badge.type} image={badge.image} qrCode={badge.qr}></Badge>
                    // <p key={badge.description}>{badge.description}  {badge.type}</p>
                ))}
            </div>

        </div>


    )
}

