import Insignia from "../Insignia.png"
import QR from "../qr.png"
import Image from "next/image"
import style from "../styles/admin.module.css"
import { getAllBadges } from "../pages/api/badges"
import React from "react"

export default function Badge(props) {
    console.log(props)

    return (
        <div style={{ marginTop: "6%",  marginBottom: "6%"}}> <div style={{ display: "flex", flexDirection: "column" }}>
    <div className={style.badgeContainer}>
        <Image src={Insignia}
            // width={198}
            // height={318}
            className={style.imagen}
            alt={"Insignia correspondiente a una facultad"}
        />
        <h2 className={style.titulo}>Nombre: {props.description}<br /><br />
            Tipo: {props.type}</h2>
    </div>
    <Image src={QR} style={{ height: "10vh", width: "10vh", alignSelf: "center" }} alt={"QR correspondiente a una facultad"} />
    <div className={style.boton} style={{ position: "revert", alignSelf: "center" }}>
        <a href="/badges" >
            Editar insignia
        </a>
    </div>

</div>

        </div >
    )
}