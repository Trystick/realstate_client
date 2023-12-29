import './history.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const History = () => {
    const {data, loading, error} = useFetch(`http://localhost:8800/api/slide`);

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

  const [userLocal, setUserLocal] = useState([]);
  // Lấy thông tin người dùng từ API khi trang tải
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    const userId = user._id;
    axios.get(`http://localhost:8800/api/users/${userId}`, {withCredentials: true})
    .then(response => {
        setUserLocal(response.data);
        localStorage.setItem('userId', response.data._id);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}, []);

const [landData, setLandData] = useState([]);
 console.log(userLocal._id);
 useEffect(() => {
    // Lấy dữ liệu landsale
    axios.get(`http://localhost:8800/api/landSale/user/${userLocal._id}`)
      .then(response => {
        const landsalePromises = response.data.map(landsale => {
          return axios.get(`http://localhost:8800/api/landSaleCategory/${landsale.categoryLandSaleId}`)
            .then(res => {
              return { ...landsale, categoryName: res.data.name, type: 'Landsale' };
            });
        });
  
        // Lấy dữ liệu landlease
        axios.get(`http://localhost:8800/api/landLease/user/${userLocal._id}`)
          .then(response => {
            const landleasePromises = response.data.map(landlease => {
              return axios.get(`http://localhost:8800/api/landLeaseCategory/${landlease.categoryLandLeaseId}`)
                .then(res => {
                  return { ...landlease, categoryName: res.data.name, type: 'Landlease' };
                });
            });
  
            // Kết hợp dữ liệu landsale và landlease
            Promise.all([...landsalePromises, ...landleasePromises])
              .then(Promise.all.bind(Promise))
              .then(data => {
                setLandData(data);
              });
          });
      })
      .catch(error => {
        console.error('Error fetching land data: ', error);
      });
  }, [userLocal._id]);
  
   //hàm chuyển đổi ngày tháng
   function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(landData.length / itemsPerPage);

  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const currentItems = landData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id, categoryId, type) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
      let url;
      if (type === 'Landsale') {
        url = `http://localhost:8800/api/landSale/${id}/${categoryId}`;
      } else {
        url = `http://localhost:8800/api/landLease/${id}/${categoryId}`;
      }
  
      axios.delete(url, {withCredentials: true})
        .then(response => {
          // Xử lý sau khi xóa thành công
          console.log(response.data);
          alert('Xóa bài đăng thành công')
          window.location.reload();
        })
        .catch(error => {
          // Xử lý lỗi
          console.error('Error deleting land sale: ', error);
        });
    }
  };
  
  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Điều hướng đến trang chỉnh sửa với id
    navigate(`/postchange/${id}`);
  }

  // function formatPrice(price) {
  //   return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
  // }

  return (
    <div className='historyContainer'>
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
                <p>Lịch sử đăng tin</p>
        </div>
      <div className="titlelandsale">
          <h2 className='landsaletitle'>Lịch sử đăng tin</h2>
       </div>
       <div className="historyContent">
       <table className='tabhistory'>
        <thead className='theadhistory'>
          <tr className='trhistory'>
            <th className='thhistory'>STT</th>
            <th className='thhistory'>Loại bất động sản</th>
            <th className='thhistory'>Ngày đăng</th>
            <th className='thhistory'>Tên bài đăng</th>
            <th className='thhistory'>Địa chỉ</th>
            <th className='thhistory'>Giá</th>
            <th className='thhistory'>Thao tác</th>
          </tr>
        </thead>
        <tbody >
        {currentItems.map((land, index) => (
            <tr key={index} className='trhistory'>
              <td data-title='STT' className='tdhistory'>{index+1}</td>
              <td data-title='Loại bất động sản' className='tdhistory'>{land.categoryName}</td>
              <td data-title='Ngày đăng' className='tdhistory'>{formatDate(land.createdAt)}</td>
              <td data-title='Tên bài đăng' className='tdhistory'>{land.name}</td>
              <td data-title='Địa chỉ' className='tdhistory'>{land.location}</td>
              <td data-title='Giá' className='tdhistory'>{land.price} {land.type === 'Landsale' ? 'tỷ' : 'triệu/tháng'} </td>
              <td data-title='Thao tác' className='tdhistory'>
                <button className='btnhistorysua' onClick={() => handleEdit(land._id)}>Sửa</button>
                <button className='btnhistoryxoa' onClick={() => handleDelete(land._id, land.type === 'Landsale' ? land.categoryLandSaleId : land.categoryLandLeaseId, land.type)}>Xóa</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
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

export default History
