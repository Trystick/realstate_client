import { faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams } from 'react-router-dom'
import FavoriteButton from '../../components/favorite/FavoriteButton'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import SearchTop from '../../components/search/SearchTop'
import './favorite.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'

const Favorite = () => {
  const {data, loading, error} = useFetch(`https://realstate-api-glm4.onrender.com/api/slide`);

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

  const [users, setUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [favoriteData, setFavoriteData] = useState([]);


  const [userLocal, setUserLocal] = useState([]);
  // Lấy thông tin người dùng từ API khi trang tải
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    const userId = user._id;
    axios.get(`https://realstate-api-glm4.onrender.com/api/users/${userId}`, {withCredentials: true})
    .then(response => {
        setUserLocal(response.data);
        localStorage.setItem('userId', response.data._id);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}, []);


useEffect(() => {
  const fetchData = async () => {
    if (userLocal.favorites && Array.isArray(userLocal.favorites)) {
      const favoriteData = [];
      for (let i = 0; i < userLocal.favorites.length; i++) {
        const favoriteId = userLocal.favorites[i];
        const favoriteResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/favorite/${favoriteId}`);
        const favorite = favoriteResponse.data;
  
        // Check and fetch landsale data
        if (favorite.landsaleId) {
          try {
            const landsaleResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/landSale/find/${favorite.landsaleId}`);
            const landsale = landsaleResponse.data;
            favorite.landsale = landsale;
            const userId = landsale.userId;
            const userResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/users/${userId}`, { withCredentials: true });
            const user = userResponse.data;
            favorite.user = user;
          } catch (error) {
            console.error(`Error fetching landsale data for favorite ${favoriteId}:`, error.message);
          }
        }
  
        // Check and fetch landlease data
        if (favorite.landleaseId) {
          try {
            const landleaseResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/landLease/find/${favorite.landleaseId}`);
            const landlease = landleaseResponse.data;
            favorite.landlease = landlease;
            const userId = landlease.userId;
            const userResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/users/${userId}`, { withCredentials: true });
            const user = userResponse.data;
            favorite.user = user;
          } catch (error) {
            console.error(`Error fetching landlease data for favorite ${favoriteId}:`, error.message);
          }
        }
  
        // Check if the favorite has already been added to favoriteData
        const index = favoriteData.findIndex((f) => f._id === favorite._id);
        if (index === -1) {
          favoriteData.push(favorite);
        }
      }
  
      // Code to render the combined data to the UI
      setFavoriteData(favoriteData); // Gán dữ liệu vào state
    }
  };
  fetchData();
}, [userLocal.favorites]);

console.log(favoriteData);
  //phân trang
  const pageCount = Math.ceil(favoriteData.length / itemsPerPage);

  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentItems = favoriteData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

   //hàm chuyển đổi ngày tháng
   function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  console.log(favoriteData);
  console.log(currentItems);
  return (
    <div className='landSaleContainer'>
      <Header/>
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
                <p>Tin yêu thích</p>
        </div>
      <div className="titlelandsale">
          <h2 className='landsaletitle'>Tin yêu thích</h2>
       </div>
       <div className="searchTopLand">
        <SearchTop/>
      </div>
      <div className="contentListLandSale">
        <div className="leftcontentlandsale">
        {currentItems.map((favorite) => {
          const { landsale, landlease } = favorite;

          return (
          <Link to={landsale ? `/landsale/${landsale._id}` : `/landlease/${landlease._id}`} key={favorite.id} className='linklandsale'>
          <div className="itemlandsale">
            <div className="picturelandsale">
            {landsale && (
            <>
              <div className="leftpicture">
                <img src={favorite.landsale.photos[0]} alt="" className='imgleftpicture'/>
              </div>
              <div className="grouppicture">
                <div className="toppicture">
                  <img src={favorite.landsale.photos[1]} alt="" className='imgtoppicture'/>
                </div>
                <div className="groupbotompicture">
                  <div className="leftbottompicture">
                    <img src={favorite.landsale.photos[2]} alt="" className='imgleftbottompicture' />
                  </div>
                  <div className="rightbottompicture">
                    <img src={favorite.landsale.photos[3]} alt="" className='imgrightbottompicture'/>
                  </div>
                </div>
              </div>
            </>
          )}
            {landlease && (
            <>
              <div className="leftpicture">
                <img src={favorite.landlease.photos[0]} alt="" className='imgleftpicture'/>
              </div>
              <div className="grouppicture">
                <div className="toppicture">
                  <img src={favorite.landlease.photos[1]} alt="" className='imgtoppicture'/>
                </div>
                <div className="groupbotompicture">
                  <div className="leftbottompicture">
                    <img src={favorite.landlease.photos[2]} alt="" className='imgleftbottompicture' />
                  </div>
                  <div className="rightbottompicture">
                    <img src={favorite.landlease.photos[3]} alt="" className='imgrightbottompicture'/>
                  </div>
                </div>
              </div>
            </>
          )}
          </div>
            <div className="detaillandsale">
              <div className="detaildeslandsale">
                {landsale ? favorite.landsale.name : favorite.landlease.name}
              </div>
              <div className="chacralandsale">
                <div className="pricelandsale">{landsale ? favorite.landsale.price : favorite.landlease.price}</div>
                <div className="arealandsale">{landsale ? favorite.landsale.area : favorite.landlease.area} m<sup>2</sup></div>
                <div className="bedroom">{landsale ? favorite.landsale.room : favorite.landlease.room} <span>phòng ngủ</span></div>
                <div className="toilet">{landsale ? favorite.landsale.toilet : favorite.landlease.toilet} <span>nhà vệ sinh</span></div>
                <div className="adress">{landsale ? favorite.landsale.location : favorite.landlease.location}</div>
              </div>
              <div className="descdetaillandsale">
              {landsale ? favorite.landsale.title : favorite.landlease.title}
              </div>
            </div>
            <div className="avatarphone">
              <div className="leftavatar">
                <img src={favorite.user.img}  alt="" className="avatarlandsale" />
                <div className="nameavatarlandsale">{favorite.user.username}</div>
                <div className="nameavatarlandsale">{formatDate((landsale ? favorite.landsale.createdAt : favorite.landlease.createdAt))}</div>
              </div>
              <div className="rightphoneandlike">
                <div className="phonelandsale">
                  <FontAwesomeIcon icon={faPhone} className='iconphonelandsale'/>
                  {favorite.user.phoneNumber}
                </div>
                <FavoriteButton userId={userLocal._id} landsaleId={landsale ? favorite.landsale._id : null} landleaseId={landlease ? favorite.landlease._id : null} onClick={(event) => event.stopPropagation()}/>
              </div>
            </div>
          </div>
        </Link>
         );
        })}
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
      <ScrollToTop/>
      <Footer/>
    </div>
  )
  
}

export default Favorite
