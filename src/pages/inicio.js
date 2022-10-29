import Barra from "../components/Barra"
import style from "../styles/inicio.module.css"
import Insignia from "../Insignia.png"
import Image from "next/image"
import { BiLeftArrow, BiRightArrow } from '../../node_modules/react-icons/bi';

export const inicio = ({ props }) => {
  return (
    <div>
    <Barra></Barra>
      <div className={style.titulo}>
        <h2>Nombre: Tito Jaramillo</h2>
        <h2>Insignias recolectadas:</h2>
      </div>
      <div className={style.scroll}>
        <button>
        <BiLeftArrow color="#8D2331" size="5vh"/>
        </button>

        <Image src={Insignia}
          width={198}
          height={318}
          className={style.imagen}
        />
        <button>
          <BiRightArrow color="#8D2331" size="5vh"/>
        </button>
      </div>
      <div className={style.form}>
        <input type="button" value="Agregar insignia"></input>
        <input type="button" value="Cerrar sesión"></input>
      </div>
    </div>
  )
}

export default inicio