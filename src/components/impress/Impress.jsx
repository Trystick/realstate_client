import "./impress.css"
import logo1 from "./img/logo1.jpg"
import logo2 from "./img/logo2.png"
import logo3 from "./img/logo3.png"
import logo4 from "./img/logo4.png"
import logo5 from "./img/logo5.png"
import logo6 from "./img/logo6.png"
import logo7 from "./img/logo7.png"
import logo8 from "./img/logo8.png"
import logo9 from "./img/logo9.png"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const images = [
  logo1, logo2,logo3,logo4,logo5,logo6,logo7,logo8,logo9
];



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


const Impress = () => {
  const { t } = useTranslation();

  const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/project/projectthree`)
  console.log(data);

  return (
    <div className="immpessContainer">
      <h1 className='title'> {t('DỰ ÁN TIÊU BIỂU')}</h1>
      <div className='impress'>
      {data && data.projects && data.projects.map(item => (
        <div className='impressItem' key={item._id}>
          <img src={item.photos[0]} alt='' className='impressImg'/>
          <div className='impressDa'>
            <div className="nameimpress">
              <div className='impressTitle'>{t(item.name)}</div>
            </div>
              <button className='impressBtn'><Link className="linkimpress"  to={`/estate/${item._id}`}>{t('Chi Tiết')}</Link> </button>
          </div>
        </div>
       ))}
      </div>
      <button className="btnImpress"><Link to="/listEstate" className="linkimpress">{t('Xem tất cả dự án')}</Link></button>
      <div className="partnerImpress">
          <div className="parnertTitle">
            {t('ĐỐI TÁC')}
          </div>
          <div className="slideImgPartner">
          <Carousel responsive={responsive}>
            {images.map((image, index) => (
              <img key ={index} src={image} alt=""className="carousel-image"/>
            ))}
          </Carousel>
          </div>
      </div>
    </div>
  )
}

export default Impress
