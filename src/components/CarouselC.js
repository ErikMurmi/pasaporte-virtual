import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../styles/components.module.css"
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import { style } from "@mui/system";

const imagenesCarousel = [
  { src: "/Insignia.png", alt: "", title: "Insignia 1" },
  { src: "/Insignia.png", alt: "", title: "Insignia 2" },
  { src: "/Insignia.png", alt: "", title: "Insignia 3" },
  { src: "/Insignia.png", alt: "", title: "Insignia 4" },
  { src: "/Insignia.png", alt: "", title: "Insignia 5" },
]

export const CarouselC = ({ images }) => {
  return (
    <div>
      <Carousel
        infiniteLoop
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        renderIndicator={(onClickHandler, isSelected, index) => {
          const defStyle = { marginLeft: 20, color: "gray", cursor: "pointer", fontSize: "250%" };
          const style = isSelected
            ? { ...defStyle, color: "black" }
            : { ...defStyle };
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
            >
              {"•"}
            </span>
          );
        }}
      >
        {images.map((carouselList, index) => (
          <div key={index}>
            <Image width={250} height={400} src={carouselList.image} key={index} alt={carouselList.name} style={carouselList.unlocked ? null : { opacity: ".5" }} />
            <p style={carouselList.unlocked?null:{marginBottom:"60%", opacity: "1"}}  className="legend">{carouselList.unlocked ? carouselList.name : "Bloqueado"}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselC;
