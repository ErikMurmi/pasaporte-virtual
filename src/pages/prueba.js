import Carousel, { carousel } from "../components/carousel";

const imagenesCarousel = [
    { src: "/Insignia.png", alt: "", title: "Insignia 1",unlocked:false},
    { src: "/Insignia.png", alt: "", title: "Insignia 2", unlocked:true},
    { src: "/Insignia.png", alt: "", title: "Insignia 3",unlocked:false },
    { src: "/Insignia.png", alt: "", title: "Insignia 4",unlocked:true },
    { src: "/Insignia.png", alt: "", title: "Insignia 5",unlocked:true },
]

export const prueba = () => {
  return (
    <Carousel images={imagenesCarousel}/>
  )
}

export default prueba;