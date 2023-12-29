import './slideShow.css';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import da1 from "./img/da1.jpg"
import da2 from "./img/da2.jpg"
import da3 from "./img/da3.jpg"

const images = [
  da1,
  da2,
  da3,
];



const SlideShow = () => {
  return (
    <div className="slide_container">
      <Zoom scale={0.4}>
        {
          images.map((each, index) => <img key={index} style={{width: "100%", height:"550px"}} src={each} className="imgslide" />)
        }
      </Zoom>
    </div>
  )
}

export default SlideShow;