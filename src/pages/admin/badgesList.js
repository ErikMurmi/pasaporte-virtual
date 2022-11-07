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
    },
    {
        description: "Facultad de Administracion",
        image: "name2.png",
        name: "FACEA",
        qr: "qr_name2.png",
        type: ""
    }
    ]);

    useEffect(() => {
        loadBadges()
    }, [])

    const loadBadges = async () => {
        let badgeL = await getAllBadges();
        console.log(badgeL);
        setBadgeList(badgeL);
        // badgeList = badgeL;
    }

    loadBadges;
    console.log(badgeList);

    return (

        <div>
            <Barra></Barra>
            <div className={adminStyle.titulo}>
                <h2 >Bienvenido {Nombre}</h2>
                <h2 >Insignias</h2>
                <div className={adminStyle.boton}   >
                    <a href="/badges" >
                        Agregar insignia
                    </a>
                </div>
            </div>
            <div className={adminStyle.badgeList}>
                {badgeList.map((badge) => (
                    <Badge key={badge.description} description={badge.description} type={badge.type}></Badge>
                    // <p key={badge.description}>{badge.description}  {badge.type}</p>
                ))}
            </div>
        </div>
    )

}

