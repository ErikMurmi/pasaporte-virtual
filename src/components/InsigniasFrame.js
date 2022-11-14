import Styles from "../styles/components.module.css"
import Image from "next/image"
import { useState } from "react"


export const InsigniasFrame = ({ insignias }) => {
    return (
        <div className={Styles.tablaInsignias}>
            {insignias.map((insigniasMap) => (
                <div className={Styles.filaInsignia} key={insigniasMap.imgage}>
                    <div className={Styles.imagenFila}>
                        <Image src={insigniasMap.image} 
                               key={insigniasMap.src} 
                               alt={insigniasMap.alt} 
                               fill="true"
                               style={insigniasMap.unlocked?null:{opacity:0.5}}/>
                    </div>
                    <div className={Styles.textoFila}>
                        <p><b>{insigniasMap.name}</b></p>
                        <p>Encuéntrala en {insigniasMap.location}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InsigniasFrame;