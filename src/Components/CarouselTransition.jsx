import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


function CarouselTransition({wd,hg,im1,im2,im3,t1,p1,t2,p2,t3,p3}) {
  const imageStyle = {
    width: wd,
    height: hg,
    borderRadius: '10px',
    display: 'block',
    margin: '0 auto' // centers image horizontally
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',margin:"20px" }}>
      <Carousel style={{ width: '100vw'}}>  {/* keeps carousel centered */}
        <Carousel.Item interval={1000}>
          <Link to="/">
          <img
            src={im1}
            alt="First slide"
            style={imageStyle}
          />
          </Link>
          <Carousel.Caption>
            <h3>{t1}</h3>
            <p>{p1}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <Link to="/">
          <img
            src={im2}
            alt="Second slide"
            style={imageStyle}
          />
          </Link>
          <Carousel.Caption>
            <h3>{t2}</h3>
            <p>{p2}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/">
          <img
            src={im3}
            alt="Third slide"
            style={imageStyle}
          />
          </Link>
          <Carousel.Caption>
            <h3>{t3}</h3>
            <p>{p3}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselTransition;
