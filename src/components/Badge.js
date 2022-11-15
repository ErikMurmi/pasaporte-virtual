import Insignia from "../images/Insignia.png"
import QR from "../images/qr.png"
import Image from "next/image"
import style from "../styles/admin.module.css"
import React, { useEffect } from "react"
import Barra from "./Barra"

export default function Badge(props) {
    console.log(props.image)
    return (

        <div style={{ display: "flex", flexDirection: "column", marginTop: "10%", marginBottom: "10%", borderStyle: "dotted" }}>
            <div className={style.badgeContainer}>

                <Image style={{ verticalAlign: "center", marginTop: "10%", alignSelf: "center" }}
                    // src={props.Image!=="name.png"?props.Image:Insignia}
                    src={props.image}
                    width={150} 
                    alt="badge"
                    height={150} 
                    layout='fill'
                    objectFit='contain' />
                <h2 className={style.texto} style={{ marginLeft: "10%", textAlign: "left" }}>Nombre: {props.name}</h2>
                <div style={{ marginLeft: "10%", textAlign: "left" }}>
                    <p>Descripcion: {props.description}</p>
                    <p>Ubicacion: {props.location}</p>

                    <p>Tipo: {props.type}</p>

                </div>
            </div>
            <Image src={props.qrCode !== "qr_name.png" ? props.qrCode : Insignia}
                width={200}
                height={200}
                style={{ alignSelf: "center" }}
                alt={"QR correspondiente a una facultad"} />
            <div className={style.boton} style={{ position: "revert", alignSelf: "center" }}>
                <Link className={style.botonEditar}
                    href="" >
                    Editar insignia
                </Link>
            </div>

        </div>


    )
}