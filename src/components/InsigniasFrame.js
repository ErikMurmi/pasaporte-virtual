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
                               style={insigniasMap.unlocked?null:{opacity:0.2}}/>
                    </div>
                    <div className={Styles.textoFila}>
                        {insigniasMap.type === 'bono'?<p style={{fontWeight: "bold", color: "#f26500"}}>Bonus</p>:null}
                        <p style={{fontWeight:"bold"}}>{insigniasMap.name}</p>
                        <p>Encuéntrala en {insigniasMap.location}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InsigniasFrame;