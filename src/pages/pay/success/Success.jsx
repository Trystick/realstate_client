import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css'
import Header from '../../../components/header/Header';
import Footer from '../../../components/footer/Footer';

const Success = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Phân tích các tham số trả về từ VNPAY
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('vnp_TxnRef');
    const vnpResponseCode = urlParams.get('vnp_ResponseCode');

    // Xác định trạng thái đơn hàng
    const status = vnpResponseCode === '00' ? 'Thành công' : 'Hủy';

    // Gửi yêu cầu cập nhật trạng thái đơn hàng lên server
    fetch('https://realstate-api-glm4.onrender.com/api/update_order_status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status })
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message);
      if (status === 'Hủy') {
        // Nếu giao dịch không thành công, chuyển hướng người dùng về trang chủ
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='successContainer'>
      <Header/>
        <div className="topsuccess">
          <div className="titlesuccess">
            Thanh Toán Thành Công
          </div>
        </div>
        <div className="undersuccess">
          <div className="textundersuccess">
           Bây giờ bạn đã có thể đăng tin !!!
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Success
