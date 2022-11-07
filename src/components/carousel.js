import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const imagenesCarousel = [
    { src: "/Insignia.png", alt: "", title: "Insignia 1" },
    { src: "/Insignia.png", alt: "", title: "Insignia 2" },
    { src: "/Insignia.png", alt: "", title: "Insignia 3" },
    { src: "/Insignia.png", alt: "", title: "Insignia 4" },
    { src: "/Insignia.png", alt: "", title: "Insignia 5" },
]

export const carousel = ({images}) => {

    //console.log(images)
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
                {images.map((carouselList) => (
                    <div key={carouselList.src}>
                        <img src={carouselList.src} key={carouselList.src} alt={carouselList.title} />
                        <p className="legend">{carouselList.title}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default carousel;
