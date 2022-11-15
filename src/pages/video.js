import Barra from "components/Barra"
import { autocompleteClasses, Button } from "@mui/material"
import {AiFillHome} from "react-icons/ai"

export const Video = () => {

return (
    <div>
        <Barra/>
        <h3>Conoce Nuestro Campus!</h3>
        <iframe width="100%" height="50%" src="https://www.youtube.com/embed/hrtbIw6WenQ" title="¡Conoce nuestro nuevo campus! 🙌🏻" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <h3></h3>
        <h3>Mañana es lo que haces hoy</h3>
        <iframe width="100%" height="50%" src="https://www.youtube.com/embed/j0ym2MFiT00" title="Mañana es lo que haces hoy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <Button src="/inicio" href="/inicio" style={{
            width:"70%",
            display: "flex",
            backgroundColor: "#8D2331",
            border: "2px solid #8D2331",
            color: "white",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            margin: "2vh auto 0",
            fontSize: "2vh"
        }}>

          <div> 
            <AiFillHome style={{
                width: "3vh",
                height: "3vh"
            }}/>
          </div>
          &nbsp;Volver al inicio
        </Button>
    </div>
)
}

export default Video