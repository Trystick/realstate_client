import './new.css'
import Footer from '../../../components/footer/Footer'
import Header from "../../../components/header/Header"
import imgNew from "../../listEstate/img/h1.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react'
import ScrollToTop from '../../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../../hooks/i18n';

const New = () => {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
    
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
    
    useEffect(() => {
        axios.get('http://localhost:8800/api/post/postCategory/657290bbeab7b27a0a0ba7af')
          .then(response => setData(response.data))
          .catch(error => console.error(error));
      }, []);
  return (
    <div>
        <Header/>
            <div className="newContainer">
                <img src={imgNew} alt="" className="imgNew" />
                <div className='homepage'>
                <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
                    <span>&gt;</span>
                    <p >{t('Tin tức')}</p>
                </div>
                <div className="titleNew">{t('TIN TỨC DỰ ÁN')}</div>
                <div className="chooseNew">
                        <button className="duanNew"><Link to="/new" className='linknew'>{t('TIN DỰ ÁN')}</Link></button>
                        <button className="thitruongNew"><Link to="/newtt" className='linknew'>{t('TIN THỊ TRƯỜNG')}</Link></button>
                        <button className="goldenNew"><Link to="/newgolden" className='linknew'>{t('TIN GOLDENLAND')}</Link></button>
                </div>
                <div className="noidungNew">
                {currentItems.map(item => 
                    ( <Link to={`/newdetail/${item._id}`} className="linknewdetail">
                    <div className="itemNew" key={item.id}>
                       <img src={item.photos[0]} alt="" className="imgItemNew" />
                       <div className="coverItemNew">
                            <div className="textItemNew">{t(item.name)}</div>
                            <div className="texttimeNew">{formatDate(item.createdAt)}</div>
                            <div className="desItemNew">{t(item.title)}</div>
                       </div>
                    </div>
                    </Link>
                ))}
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
            </div>
            <ScrollToTop/>
        <Footer/>
    </div>
  )
}

export default New
