import Insignia from "../images/Insignia.png"
import QR from "../images/qr.png"
import Image from "next/image"
import style from "../styles/admin.module.css"
import { getAllBadges } from "../pages/api/badges"
import React, { useEffect } from "react"
import Barra from "./Barra"
import { prodErrorMap } from "firebase/auth"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/client"

export default function Badge(props) {
    console.log(props.image)
    return (

        <div style={{ display: "flex", flexDirection: "column", marginTop: "10%", marginBottom: "10%", borderStyle:"dotted" }}>
            <div className={style.badgeContainer}>

                <img style={{ verticalAlign: "center", marginTop: "10%", alignSelf:"center" }}
                    src={props.image}
                    width={150}
                    height={150}></img>
                <h2 className={style.texto} style={{ marginLeft: "10%", textAlign: "left" }}>Nombre: {props.name}</h2>
                <br/><p>Descripcion: {props.description}</p>
                <p>Ubicación: {props.location}</p>
                <p>Tipo: {props.type}</p>    
            </div>
            <img src={props.qrCode}
                width={200}
                height={200}
                style={{ alignSelf: "center" }}
                alt={"QR correspondiente a una facultad"} />
            <div className={style.boton} style={{ position: "revert", alignSelf: "center" }}>
                <a className={style.botonEditar}
                    href="" >
                    Editar insignia
                </a>
            </div>

        </div>


    )
}