import './loadsearch.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import { Link, useLocation } from 'react-router-dom'
import { faHouse, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchTop from '../../components/search/SearchTop'
import { useEffect, useState } from 'react'
import axios from 'axios'
import FavoriteButton from '../../components/favorite/FavoriteButton'

const LoadSearch = () => {
    const location = useLocation();
    const results = location.state?.results;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    console.log(results);
     //phân trang
  const pageCount = Math.ceil(results.length / itemsPerPage);

  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentItems = results.slice(
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

  const [userLocal, setUserLocal] = useState([]);
  // Lấy thông tin người dùng từ API khi trang tải
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    if (user && user._id) {
        const userId = user._id;
        axios.get(`http://localhost:8800/api/users/${userId}`, {withCredentials: true})
        .then(response => {
            setUserLocal(response.data);
            localStorage.setItem('userId', response.data._id);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
 }, []);

 const [users, setUsers] = useState([]);

useEffect(() => {
  const fetchUsers = async () => {
    const usersData = await Promise.all(results.map(async (item) => {
      try {
        const response = await axios.get(`http://localhost:8800/api/users/${item.userId}`, {withCredentials: true});
        if (response.status === 200) {
          return response.data;
        } else {
          console.error(`Error fetching user data: Status code ${response.status}`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching user data:`, error.message);
        return null;
      }
    }));

    // Filter out any null values from the array
    const validUsers = usersData.filter(user => user !== null);

    setUsers(validUsers);
  };

  fetchUsers();
}, [results]);

  console.log(users);
  if (!users || users.length === 0) {
    return <div className='checkfind'>
      <Header/>
         <div className="seterrorfind">
            Không tìm thấy
         </div>
      <Footer/>
      </div>;
  }

  if (!currentItems || currentItems.length === 0) {
    return <div className='checkfind'>
      <Header/>
         <div className="seterrorfind">
            Không tìm thấy
         </div>
      <Footer/>
      </div>;
  }
  return (
    <div className='loadSearchContainer'>
     <Header/>
     <div className="loadsearch">
        <div className='homepage'>
            <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
            <span>&gt;</span>
            <p>Trang tìm kiếm</p>
            </div>
        <div className="titlelandsale">
            <h2 className='landsaletitle'>Tìm kiếm</h2>
        </div>
        <div className="searchTopLand">
            <SearchTop/>
        </div>
        <div className="contentListLandSale">
        <div className="leftcontentlandsale">
        {currentItems.map((favorite) => {
          const { categoryLandSaleId, categoryLandLeaseId, _id  } = favorite;
          let link = '/default/' + _id;
        
          if (categoryLandSaleId) {
            link = '/landsale/' + _id;
          } else if (categoryLandLeaseId) {
            link = '/landlease/' + _id;
          }
          const user = users.find(user => user._id === favorite.userId);
          return (
            <Link to={link} key={favorite.id} className='linklandsale'>
          <div className="itemlandsale">
            <div className="picturelandsale">
              <div className="leftpicture">
                <img src={favorite.photos[0]} alt="" className='imgleftpicture'/>
              </div>
              <div className="grouppicture">
                <div className="toppicture">
                  <img src={favorite.photos[1]} alt="" className='imgtoppicture'/>
                </div>
                <div className="groupbotompicture">
                  <div className="leftbottompicture">
                    <img src={favorite.photos[2]} alt="" className='imgleftbottompicture' />
                  </div>
                  <div className="rightbottompicture">
                    <img src={favorite.photos[3]} alt="" className='imgrightbottompicture'/>
                  </div>
                </div>
              </div>
            
          </div>
            <div className="detaillandsale">
              <div className="detaildeslandsale">
              {favorite.name}
              </div>
              <div className="chacralandsale">
              <div className="pricelandsale">{favorite.price} {categoryLandSaleId ? ' tỷ' : categoryLandLeaseId ? ' triệu/tháng' : ''}</div>
              <div className="arealandsale">{favorite.area} m<sup>2</sup></div>
              <div className="bedroom">{favorite.room} <span>phòng ngủ</span></div>
              <div className="toilet">{favorite.toilet} <span>nhà vệ sinh</span></div>
              <div className="adress">{favorite.location}</div>
            </div>
            <div className="descdetaillandsale">
              {favorite.title}
            </div>
            </div>
            <div className="avatarphone">
              <div className="leftavatar">
                <img src={user.img}  alt="" className="avatarlandsale" />
                <div className="nameavatarlandsale">{user.username}</div>
                <div className="nameavatarlandsale">{formatDate(favorite.createdAt)}</div>
              </div>
              <div className="rightphoneandlike">
                <div className="phonelandsale">
                  <FontAwesomeIcon icon={faPhone} className='iconphonelandsale'/>
                  {user.phoneNumber}
                </div>
                <FavoriteButton 
                  userId={userLocal._id} 
                  landsaleId={categoryLandSaleId ? _id : null} 
                  landleaseId={categoryLandLeaseId ? _id : null} 
                  onClick={(event) => event.stopPropagation()}
                />
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
     </div>
     <ScrollToTop/>
     <Footer/>
    </div>
  )
}

export default LoadSearch
