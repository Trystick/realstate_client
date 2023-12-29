import { useEffect, useState } from 'react';
import './pay.css';
import vnpay from '../pay/vnpay.png'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const Pay = () => {
  const {payid} = useParams();
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const fetchPackets = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/packet/find/${payid}`); // Thay đổi URL này thành URL API của bạn
        setPackets(response.data);
      } catch (error) {
        console.error('Error fetching packets:', error);
      }
    };

    fetchPackets();
  }, []);

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
 
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!customerName) {
        errors.customerName = 'Vui lòng chọn nhập tên';
    }
    
    // Kiểm tra xem người dùng đã chọn tỉnh/thành phố chưa
    if (!address) {
        errors.address = 'Vui lòng nhập địa chỉ';
    }

    // Kiểm tra xem người dùng đã chọn quận/huyện chưa
    if (!phoneNumber) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại ';
    }

    // Cập nhật trạng thái lỗi xác thực
    setValidationErrors(errors);

    // Nếu không có lỗi, form hợp lệ
    return Object.keys(errors).length === 0;

}

// Sử dụng hàm xác thực form trước khi gửi form
const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
        // Gửi form nếu nó hợp lệ
    }

}

const handleVNPayPayment = async () => {
  // Kiểm tra tính hợp lệ của form
  if (!validateForm()) {
    return;  // Dừng hàm nếu form không hợp lệ
  }

  // Lấy các giá trị từ form
  const orderInfo = {
      userId: userLocal._id, // Giả sử bạn đã lưu ID người dùng vào biến user
      packetId: packets._id, // Giả sử bạn đã lưu ID gói dịch vụ vào biến packets
      customerName: customerName, // Biến này đã được gán giá trị từ input
      address: address, // Biến này đã được gán giá trị từ input
      phoneNumber: phoneNumber, // Biến này đã được gán giá trị từ input
      packetName: packets.name
  };

  // Lấy số tiền từ form
  const amount = packets.price; // Giả sử bạn đã lưu giá tiền vào biến packets

  // Gửi yêu cầu tạo đơn hàng đến máy chủ
  const response = await axios.post('http://localhost:8800/api/create_order', {
      orderInfo: orderInfo,
      amount: amount
  });
  const paymentUrl = response.data.data;
    // Chuyển hướng người dùng đến URL thanh toán
    window.location.href = paymentUrl;
    console.log(paymentUrl);
  }

  function formatPrice(price) {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
  }

  return (
    <div className="payContainer">
      <Header/>
      <form onSubmit={handleSubmit}>
      <div className="payment">
            <div className='titlePay'>Thanh toán</div>
            <div className="infoPay">
              <p className='titlepPayment'>{packets.name}</p>
              <p className='p2'>Thời hạn: {packets.timeend}</p>
              <p className='p2'>Giá: {formatPrice(packets.price)} VND</p>
              <p className='p2'>Đăng tin: {packets.function}</p>
            </div>
            <div className="userPay">
                <input type="text" className={`${validationErrors.customerName ? 'input-error' : ''}`} placeholder="Họ tên" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                {validationErrors.customerName && <div className="error">{validationErrors.customerName}</div>}
                <input type="text" className={`${validationErrors.address ? 'input-error' : ''}`} placeholder="Địa chỉ" value={address} onChange={e => setAddress(e.target.value)} />
                {validationErrors.address && <div className="error">{validationErrors.address}</div>}
                <input type="number"  className={`${validationErrors.phoneNumber ? 'input-error' : ''}`} placeholder="Số điện thoại" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                {validationErrors.phoneNumber && <div className="error">{validationErrors.phoneNumber}</div>}
            </div>
            <div className="payPay">
              <button onClick={handleVNPayPayment}>
                    <img src={vnpay} className='imgpay'/>
                    Thanh toán bằng VNPAY
              </button>
            </div>
      </div>
      </form>
      <Footer/>
    </div>
  );
};

export default Pay;
