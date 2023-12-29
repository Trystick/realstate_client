import { useNavigate } from 'react-router-dom';
import './packet.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'

const Packet = () => {
    const navigate = useNavigate();
    const [packets, setPackets] = useState([]);
    const [clickedItem, setClickedItem] = useState(null);

    const handleClick = (_id) => {
        setClickedItem(_id);
    }
    
    
    useEffect(() => {
      const fetchPackets = async () => {
        try {
          const response = await axios.get('https://realstate-api-glm4.onrender.com/api/packet'); // Thay đổi URL này thành URL API của bạn
          setPackets(response.data);
           // Tìm gói "1 tháng" và đặt clickedItem thành _id của gói đó
          const oneMonthPacket = response.data.find(packet => packet.name === 'Gói 1 tháng');
          if (oneMonthPacket) {
            setClickedItem(oneMonthPacket._id);
          }
        } catch (error) {
          console.error('Error fetching packets:', error);
        }
      };
  
      fetchPackets();
    }, []);

    console.log(packets);

    const handleOrder = (id) => {
        // Điều hướng đến trang chỉnh sửa với id
        navigate(`/pay/${id}`);
      }

    function formatPrice(price) {
      return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
    }
    
  return (
    <div className="packetContainer">
        <Header/>
        <div className="titlePacket">
            <div className="textgoi">
              Các Gói Thanh Toán
            </div> 
        </div>
        <div className="packagepage">
            <div className="package-list">
            {packets.map(packet => (
            <div key={packet.id} className="package-card"
              onClick={() => handleClick(packet._id)}>
                <h2>{packet.name}</h2>
                <div className="divppaket">
                    <p><span className="detail">Thời hạn </span>: {packet.timeend}</p>
                    <p><span className="detail">Giá </span>: {formatPrice(packet.price)} VND</p>
                    <p><span className="detail">Đăng tin </span>: {packet.function}</p>
                </div>
                <p className="photropaket">{packet.desc}</p>
                <button className="btnChon" onClick={() => handleOrder(packet._id)}>Thanh Toán</button>
            </div>
            ))}
          </div>
          {clickedItem && 
              <div className="descriptionpackage">
                  <h2>{packets.find(packet => packet._id === clickedItem).name}</h2>
                  <p><span className="detaildes">Thời hạn đăng tin cho khách hàng</span>: trong vòng {packets.find(packet => packet._id === clickedItem).timeend}</p>
                  <p><span className="detaildes">Giá cả ưu đãi </span>: với mức giá chỉ  {formatPrice(packets.find(packet => packet._id === clickedItem).price)} VND</p>
                  <p><span className="detaildes">Khách hàng có thể đăng tin </span>: {packets.find(packet => packet._id === clickedItem).function} (nhưng vẫn trong hạn cho phép của công ty)</p>
                  <p><span className="detaildes">Cùng với đó là những tiện ích khác </span>: {packets.find(packet => packet._id === clickedItem).desc}</p>
              </div>
          }
        </div>
       
        <ScrollToTop/>
        <Footer/>
  </div>
  )
}

export default Packet
