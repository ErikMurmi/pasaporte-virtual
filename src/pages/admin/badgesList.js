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

    () => {

    }


    // loadBadges;
    // console.log(badgeList);


    return (
        <div >
            <Barra></Barra>
            <div className={adminStyle.titulo}>
                <h2 >Bienvenido {Nombre}</h2>
                <h2 >Insignias</h2>
                <div className={adminStyle.boton}   >
                    <a href="/admin/badges.js" >
                        Agregar insignia
                    </a>
                </div>
            </div>
            <div style={{overflow:"auto"}}>
                <div className={adminStyle.badgeList} style={{ overflowY: "auto" }} >
                    {badgeList.map((badge) => (
                        <Badge key={badge.description} description={badge.description} type={badge.type} image={badge.image}></Badge>
                        // <p key={badge.description}>{badge.description}  {badge.type}</p>
                    ))}
                </div>

            </div>

        </div>
    )
}
