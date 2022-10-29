import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Insignia from "../Insignia.png"
import Image from "next/image"
import qr from "../qr.png"
import { BiLeftArrow, BiRightArrow } from '../../node_modules/react-icons/bi';

export const inicio = ({ props, Nombre }) => {
  return (
    <div>
      <Barra></Barra>
      <div className={style.titulo}>
        <h2>Bienvenido {Nombre}</h2>
        <h2>Insignias recolectadas</h2>
      </div>
      <div className={style.scroll}>
        <button>
          <BiLeftArrow color="black" size="5vh" />
        </button>

        <Image src={Insignia}
          width={198}
          height={318}
          className={style.imagen}
        />
        <button>
          <BiRightArrow color="black" size="5vh" />
        </button>
      </div>
      <div className={style.form}>
      <button>
      <Image src={qr} 
          width={"25vh"}
          height={"25vh"}
          />&nbsp;&nbsp; Agregar insignia
      </button>
      </div>
    </div>
  )
}

export default inicio