import  './present.css'
import Header from '../../components/header/Header'
import img from "./img/h1.jpg"
import {useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'


const Present = () => {
  const items = [{label: 'Giới thiệu chung', href:'/present/Gioithieuchung'}, {label:'Lịch sử hình thành', href:'/present/Lichsu'}, {label: 'Sơ đồ tổ chức', href:'/present/Sodo'}, {label:'Năng lực cạnh tranh', href:'/present/Nangluc'}, {label:'Hệ thống', href:'/present/Hethong'}, {label:'Giải thưởng', href:'/present/Giaithuong'}, {label:'Đối tác', href:'/present/Doitac'}, {label:'Hoạt động xã hội', href:'/present/Hoatdong'}];
  const [activeIndex, setActiveIndex] = useState(items.indexOf('Giới thiệu chung'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (location.pathname !== items[index].href){
      navigate(items[index].href);
    }
  };

  return (
    <div>
      <Header/>
      <div className='present'>
        <div className="presentContainer">
          <img src={img} alt="" className='imgPresent'/>
          <div className='presentList '>
              <div className='coverItem'>
                {items.map((item, index) => (
                  <div key={item.label} className={`presentItem ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleItemClick(index)}>{item.label}</div>
                ))}
              </div>
          </div>
      </div>
      </div>
      
    </div>
  )
}

export default Present
