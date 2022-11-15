import Carousel, { carousel } from "../components/CarouselC";
import InsigniasFrame from "../components/InsigniasFrame";

const imagenesCarousel = [
    {unlocked:true, id:"Enfermedades Infecciosas", type: "normal", qr:"", name:"Enfermedades Infecciosas", description:"Salud y Bienestar", location:"Salud", image:"https://firebasestorage.googleapis.com/v0/b/pasaporte-virtual.appspot.com/o/images%2Fbadges%2FBiodiversidad?alt=media&token=344a123a-bc95-487a-9b77-c4f8951542e3"},
    {unlocked:false, id:"Enfermedades Infecciosas", type: "normal", qr:"", name:"Enfermedades Infecciosas", description:"Salud y Bienestar", location:"Salud", image:"https://firebasestorage.googleapis.com/v0/b/pasaporte-virtual.appspot.com/o/images%2Fbadges%2FBiodiversidad?alt=media&token=344a123a-bc95-487a-9b77-c4f8951542e3"},
    {unlocked:true, id:"Enfermedades Infecciosas", type: "normal", qr:"", name:"Enfermedades Infecciosas", description:"Salud y Bienestar", location:"Salud", image:"https://firebasestorage.googleapis.com/v0/b/pasaporte-virtual.appspot.com/o/images%2Fbadges%2FBiodiversidad?alt=media&token=344a123a-bc95-487a-9b77-c4f8951542e3"},
]

export const prueba = () => {
  return (

      <InsigniasFrame insignias={imagenesCarousel}/>

  )
}

export default prueba;