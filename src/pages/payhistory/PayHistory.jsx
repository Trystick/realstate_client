import './payhistory.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import useFetch from '../../hooks/useFetch'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PayHistory = () => {
    const {data, loading, error} = useFetch(`http://localhost:8800/api/slide`);
    const navigate = useNavigate();
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

//hàm chuyển đổi ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const [landData, setLandData] = useState([]);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/order/get/${userLocal._id}`, {withCredentials: true});
        setLandData(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      }
    };

    fetchOrder();
  }, [userLocal._id]);


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

  const handleCancel = (id) => {
    // Điều hướng đến trang chỉnh sửa với id
    navigate(`/cancelpacket/${id}`);
  }

  function formatPrice(amount) {
    return amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
  }

  return (
    <div className='payhistoryContainer'>
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
                    <p>Lịch sử thanh toán</p>
            </div>
        <div className="titlelandsale">
            <h2 className='landsaletitle'>Lịch sử thanh toán</h2>
        </div>
        <div className="historyContent">
            <table className='tabpayhistory'>
              <thead className='theadpayhistory'>
                <tr className='trpayhistory'>
                  <th className='thpayhistory'>STT</th>
                  <th className='thpayhistory'>Tên gói</th>
                  <th className='thpayhistory'>khách hàng</th>
                  <th className='thpayhistory'>Số điện thoại</th>
                  <th className='thpayhistory'>Địa chỉ</th>
                  <th className='thpayhistory'>Tổng tiền</th>
                  <th className='thpayhistory'>Ngày thanh toán</th>
                  <th className='thpayhistory'>Trạng thái</th>
                  <th className='thpayhistory'>Thao tác</th>
                </tr>
              </thead>
                <tbody className='tbodypayhistory'>
                {currentItems.map((land, index) => (
                    <tr key={index} className='trpayhistory'>
                      <td data-title='STT' className='tdpayhistory'>{index+1}</td>
                      <td data-title='Tên gói' className='tdpayhistory'>{land.packetName}</td>
                      <td data-title='khách hàng' className='tdpayhistory'>{land.customerName}</td>
                      <td data-title='Số điện thoại' className='tdpayhistory'>{land.phoneNumber}</td>
                      <td data-title='Địa chỉ' className='tdpayhistory'>{land.address}</td>
                      <td data-title='Tổng tiền' className='tdpayhistory'>{formatPrice(land.amount)} VND</td>
                      <td data-title='Ngày thanh toán' className='tdpayhistory'>{formatDate(land.createdAt)}</td>
                      <td data-title='Trạng thái' className={`tdpayhistory ${land.status === 'Thành công' ? 'success' : 'cancel'}`}>{land.status}</td>
                      <td data-title='Thao tác' className='tdpayhistory'>
                      {land.status === 'Hủy' ? (
                        <span className='wascancel'>Đã hủy</span>
                      ) : (
                        <button className='btnpayhistory' onClick={() => handleCancel(land._id)}>Hủy Gói</button>
                      )}
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

export default PayHistory
