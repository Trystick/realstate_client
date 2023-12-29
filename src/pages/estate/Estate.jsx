import "./estate.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import { Link, useParams } from "react-router-dom"
import ScrollToTop from "../../components/scrolltop/ScrollToTop"
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import axios from 'axios';

const Estate = () => {
  const { t } = useTranslation();
  const [datatb, setDataTb] = useState([]);
  const {estateId} = useParams();

  const {data, loading, error} = useFetch(`http://localhost:8800/api/project/find/${estateId}`);

  useEffect(() => {
    axios.get('http://localhost:8800/api/project/randomprojects')
      .then(response => setDataTb(response.data))
      .catch(error => console.error(error));
  }, []);

  const ArrayData = [data];

  const images = data && data.photos ? data.photos.slice(4, 12) : [];

  const img = data && data.photos ? data.photos.slice(12,17):[];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

// Cập nhật hàm nextSlide và previousSlide cho mảng images
const nextImageSlide = () => {
  const lastIndex = images.length - 1;
  const shouldResetIndex = currentImageIndex === lastIndex;
  const index = shouldResetIndex ? 0 : currentImageIndex + 1;
  setCurrentImageIndex(index);
};

const previousImageSlide = () => {
  const lastIndex = images.length - 1;
  const shouldResetIndex = currentImageIndex === 0;
  const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
  setCurrentImageIndex(index);
};

// Cập nhật hàm nextSlide và previousSlide cho mảng img
const nextImgSlide = () => {
  const lastIndex = img.length - 1;
  const shouldResetIndex = currentImgIndex === lastIndex;
  const index = shouldResetIndex ? 0 : currentImgIndex + 1;
  setCurrentImgIndex(index);
};

const previousImgSlide = () => {
  const lastIndex = img.length - 1;
  const shouldResetIndex = currentImgIndex === 0;
  const index = shouldResetIndex ? lastIndex : currentImgIndex - 1;
  setCurrentImgIndex(index);
};


useEffect(() => {
  const interval = setInterval(() => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  }, 3000);
  return () => clearInterval(interval);
}, [currentImageIndex]);

useEffect(() => {
  const interval = setInterval(() => {
    const lastIndex = img.length - 1;
    const shouldResetIndex = currentImgIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImgIndex + 1;
    setCurrentImgIndex(index);
  }, 3000);
  return () => clearInterval(interval);
}, [currentImgIndex]);
  
  
  return (
    <div>
      <Header/>
      {ArrayData.map(item => (
      <div className="estateContainer" key={item._id}>
         {item.photos && item.photos.length > 0 && (
            <>
          <img src={item.photos[0]} alt="" className="firstimgestate" />
          </>
          )}
           <div className="textandunderline">
              <div className="nameestate">{t(item.name)}</div>
              <div className="underline"></div>
           </div>
          <div className="tongquanestate">
            <div className="divimgsecond">
            {item.photos && item.photos.length > 0 && (
            <>
              <img src={item.photos[0]} alt="" className="imgsecond" />
            </>
            )}
            </div>
            <div className="noidungtq">
              <div className="titletq">{t('TỔNG QUAN')}</div>
              <p className="ptongquan"><span>{t('Vị trí')}:</span> {t(item.location)}</p>
              <p className="ptongquan"><span>{t('Chủ đầu tư')}:</span> {t(item.investor)}</p>
              <p className="ptongquan"><span>{t('Đơn vị phân phối')}:</span> {t(item.construction)}</p>
              <p className="ptongquan"><span>{t('Diện tích')}:</span> {t(item.land_area)}</p>
              <p className="ptongquan"><span>{t('Quy mô')}:</span> {t(item.scale)}</p>
              <p className="ptongquan"><span>{t('Tiện ích')}:</span> {t(item.utiliti)}</p>
              <p className="ptongquan"><span>{t('Loại hình sản phẩm')}:</span> {t(item.categoryDesc)}</p>
              <p className="ptongquan"><span>{t('Pháp lý')}:</span> {t(item.juridical)}</p>
            </div>
          </div>
          <div className="vitriestate">
            <div className="textandunderline">
              <div className="titlevitri">{t('VỊ TRÍ DỰ ÁN')}</div>
              <div className="underline"></div>
            </div>
            <div className="noidungvitri">{t(item.descLocation)}</div>
            <div className="divimgthree">
           
             {item.photos && item.photos.length > 2 && (
            <>
              <img src={item.photos[2]} alt="" className="imgfive" />
            </>
            )}
            </div>
          </div>
          <div className="matbangestate">
          <div className="textandunderline">
            <div className="titlematbang">{t('MẶT BẰNG DỰ ÁN')}</div>
            <div className="underline"></div>
            </div>
            <div className="noidungmatbang">
              {t(item.ground)}<br/>
              {t(item.groundSe)}<br/>
              {t(item.groundTh)}
            </div>
            <div className="divimgfour">
            {item.photos && item.photos.length > 3 && (
            <>
              <img src={item.photos[3]} alt="" className="imgfour" />
            </>
            )}
            </div>
          </div>
          <div className="tienichestate">
            <div className="textandunderline">
              <div className="titletienich">{t('TIỆN ÍCH NỘI KHU')}</div>
              <div className="underline"></div>
            </div>
            <div className="noidungtienich">
            {t(item.descUtilitiIn)}<br/>
            {t(item.descUtilitiInSe)}<br/>
            {t(item.descUtilitiInTh)}<br/>
            {t(item.descUtilitiInFo)}<br/>
            {t(item.descUtilitiInFi)}
            </div>
            <div className="slidetiendo">
            <button className="arrow arrow-left" onClick={previousImgSlide}>&#10094;</button>
                <img src={img[currentImgIndex]} alt='Không có dữ liệu' className="imgslide"/>
                <button className="arrow arrow-right" onClick={nextImgSlide}>&#10095;</button>
            </div>
          </div>
          <div className="tienichngoaiestate">
             <div className="textandunderline">
              <div className="titlengoaitienich">{t('TIỆN ÍCH NGOẠI KHU')}</div>
              <div className="underline"></div>
            </div>
            {item.photos && item.photos.length > 1 && (
            <>
              <img src={item.photos[1]} alt="" className="imgthree" />
            </>
            )}
            <div className="noidungngoaitienich">
            {t(item.descUtilitiOut)}<br/>
            {t(item.descUtilitiOutSe)}<br/>
            {t(item.descUtilitiOutTh)}<br/>
            {t(item.descUtilitiOutFo)}<br/>
            {t(item.descUtilitiOutFi)}
            </div>
          </div>
          <div className="tiendoestate">
            <div className="textandunderline">
              <div className="titletiendo">{t('TIẾN ĐỘ THI CÔNG')}</div>
              <div className="underline"></div>
            </div>
            <div className="slidetiendo">
            <button className="arrow arrow-left" onClick={previousImageSlide}>&#10094;</button>
                <img src={images[currentImageIndex]} alt='Không có dữ liệu' className="imgslide"/>
                <button className="arrow arrow-right" onClick={nextImageSlide}>&#10095;</button>
            </div>
          </div>
          <div className="anotherproject">
           <div className="titleanotherproject">{t('CÁC DỰ ÁN TIÊU BIỂU KHÁC')}</div>
           <div className="addtb">
           {loading ? "loading" : <>
           {datatb.map(item => (<Link to={`/estate/${item._id}`} className='linktb'>
            <div className="tieubieuproject">
              <div className="imgtbproject">
                <img src={item.photos[0]} alt="" className="imgItemTb" />
              </div>
              <div className="covernamebtn">
                <div className="nametbproject">
                  {t(item.name)}
                </div>
                <button className="btntbproject">{t('Chi Tiết')}</button>
              </div>
            </div>
            </Link>
           ))}</>}
           </div>
          </div>
      </div>
        ))}
        <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default Estate
