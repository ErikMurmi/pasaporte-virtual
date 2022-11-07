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
    // console.log(props)
    //props.image.split('/').pop()
    console.log(props.image)
    // const httpReference = ref(storage, props.image)




    // getDownloadURL(ref(storage, props.image))
    //     .then((url) => {

    //         // Or inserted into an <img> element
    //         const img = document.getElementById(`myimg${props.titulo}`);
    //         if (img != null) {
    //             img.setAttribute('src', url);
    //             console.log(url);

    //         }

    //     })
    //     .catch((error) => {
    //         // Handle any errors
    //     });




    return (
        <div style={{ marginTop: "6%", marginBottom: "6", overflowX: "hidden", }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={style.badgeContainer}>

                    <img src={props.image}
                        width={300}
                        height={"auto"}></img>

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