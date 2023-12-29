import './listestatecategory.css'
import Header from "../../components/header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAreaChart, faHouse, faStar } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import SearchTop from '../../components/search/SearchTop'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Footer from '../../components/footer/Footer'

const ListEstateCategory = () => {
  const [projects, setProjects] = useState([]);
  const [projectType, setProjectType] = useState(''); 

  const {categoryEstateId} = useParams();
  console.log(categoryEstateId);
  const { t } = useTranslation();
 
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  // Tính toán số trang
 
  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
  };

  const {data, loading, error} = useFetch(`http://localhost:8800/api/slide`);
  
  console.log(data);

  const img = data.map(item => item.photos).flat();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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
      const lastIndex = img.length - 1;
      const shouldResetIndex = currentImgIndex === lastIndex;
      const index = shouldResetIndex ? 0 : currentImgIndex + 1;
      setCurrentImgIndex(index);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImgIndex]);

  useEffect(() => {
    axios.get(`http://localhost:8800/api/category/${categoryEstateId}`)
      .then(response => {
        const projectIds = response.data.projects;
        setProjectType(response.data.name); // Cập nhật tên loại dự án
        const projectPromises = projectIds.map(_id =>
          axios.get(`http://localhost:8800/api/project/find/${_id}`)
        );
        Promise.all(projectPromises)
        .then(projectResponses => {
          const projects = projectResponses.map(response => response.data);
          setProjects(projects);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}, [categoryEstateId]);

const pageCount = Math.ceil(projects.length / itemsPerPage);

// Lấy các phần tử cho trang hiện tại
const currentItems = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);

  return (
    <div className='listEstateMain'>
      <div className="header">
      <Header />
      </div>
      <div className='listEstateContainer'>
      {data.map(item => (
      <div className="landsalepage" key={item._id}>
         <div className="slidetiendo" >
            <button className="arrow arrow-left" onClick={previousImgSlide}>&#10094;</button>
                <img src={img[currentImgIndex]} alt='Không có dữ liệu' className="imgslide"/>
                <button className="arrow arrow-right" onClick={nextImgSlide}>&#10095;</button>
          </div>
      </div>
       ))}
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
           {projectType}
          </div>
          <div className='lsEstate'>
            {currentItems.map((project) => (
              <Link to={`/estate/${project._id}`} className="Link">
              <div className='lsItem' key={project._id}>          
                  <img src={project.photos[0]} alt="" className='imgItem' />
                  <div className='coverItemList'>
                    <div className='titleItem'>{t(project.name)}</div>
                    <div className="covertwo">
                      <div className='qmCList'>
                        <FontAwesomeIcon icon={faHouse} className="iconname"/>
                        <p> {t('Quy mô')}: {t(project.scale)}</p>
                      </div>
                      <div className='dtSList'>
                        <FontAwesomeIcon icon={faAreaChart} className="iconname"/>
                        <p> {t('Diện tích')}: {t(project.land_area)}</p>
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

export default ListEstateCategory
