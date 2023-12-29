import './listestate.css'
import Header from "../../components/header/Header"
import img from "../contact/img/golden.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAreaChart, faHouse, faStar } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import SearchTop from '../../components/search/SearchTop'


const ListEstate = () => {
  const { t } = useTranslation();
 
  const { data, loading, error, reFetch } = useFetch(`https://realstate-api-glm4.onrender.com/api/project`);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  // Tính toán số trang
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  // Lấy các phần tử cho trang hiện tại
  const currentItems = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );
  return (
    <div className='listEstateMain'>
      <div className="header">
      <Header />
      </div>
      <div className='listEstateContainer'>
        <img src={img} alt="" className='imgListEstate'/>
        <div className='homepage'>
                <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
                <span>&gt;</span>
                <p>{t('Dự án')}</p>
            </div>
        <div className='categoryEstate'>
            <h2 className='tilteCategory'>{t('DỰ ÁN GOLDEN LAND')}</h2>
        </div>
        <div className="lscenter">
          <div className="titleListEstate">
            Tất cả dự án
          </div>
          <div className='lsEstate'>
            {currentItems.map(item => (
              <Link to={`/estate/${item._id}`} className="Link">
              <div className='lsItem' key={item._id}>          
                  <img src={item.photos[0]} alt="" className='imgItem' />
                  <div className='coverItemList'>
                    <div className='titleItem'>{t(item.name)}</div>
                    <div className="covertwo">
                      <div className='qmCList'>
                        <FontAwesomeIcon icon={faHouse} className="iconname"/>
                        <p> {t('Quy mô')}: {t(item.scale)}</p>
                      </div>
                      <div className='dtSList'>
                        <FontAwesomeIcon icon={faAreaChart} className="iconname"/>
                        <p> {t('Diện tích')}: {t(item.land_area)}</p>
                      </div>
                    </div>
                  </div>
              </div>
              </Link>
            ))}  
          </div>
        </div>
        <div className="pagination">
            {[...Array(pageCount)].map((_, index) => (
                <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
                >
                {index + 1}
                </button>
            ))}
          </div>
      </div>
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default ListEstate
