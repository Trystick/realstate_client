import './contact.css'
import  Header from "../../components/header/Header"
import  Footer from "../../components/footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faGlobe, faHouse, faLocationDot, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons'
import face from "../../components/footer/icon/Facebook.png"
import zalo from "../../components/footer/icon/zalo.png"
import golden from "./img/golden.jpg"
import { useState } from 'react'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import usePost from '../../hooks/usePost'
import axios from "axios"
import Golden from "../present/presentpage/gioithieuchung/img/Golden.jpg"
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const Contact = () => {
  const { t } = useTranslation();
  const initialFormState = {
    fullname : '',
    email: '',
    phone: '',
    desc: '',
  };
   
const [formState, setFormState] = useState(initialFormState);
const [errors, setErrors] = useState({});
const [submitStatus, setSubmitStatus] = useState(null);

const { response, postData } =
  usePost(`http://localhost:8800/api/advise/`, formState);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormState((prevState) => ({ ...prevState, [name]: value }));
};

const validateForm = () => {
  let isValid = true;
  let newErrors = {};

  if (!formState.phone) {
    newErrors.phone = t('Số điện thoại là bắt buộc');
    isValid = false;
  } else if (!/^[0-9]{10}$/.test(formState.phone)) {
    newErrors.phone = t('Số điện thoại phải có 10 chữ số');
    isValid = false;
  }

  if (!formState.email) {
    newErrors.email = t('Email là bắt buộc');
    isValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)) {
    newErrors.email = t('Email không hợp lệ');
    isValid = false;
  }

  if (!formState.fullname) {
    newErrors.fullname = t('Họ tên là bắt buộc');
    isValid = false;
  } else if (formState.fullname.length < 2) {
    newErrors.fullname = t('Họ tên phải có ít nhất 2 ký tự');
    isValid = false;
  } else if (formState.fullname.length > 50) {
    newErrors.fullname = t('Họ tên không được quá 50 ký tự');
    isValid = false;
  }

  if (!formState.desc) {
    newErrors.desc = t('Nội dung liên hệ là bắt buộc');
    isValid = false;
  } else if (formState.desc.length < 5) {
      newErrors.desc = t('Nội dung liên hệ phải có ít nhất 5 ký tự');
      isValid = false;
  }
  setErrors(newErrors);
  return isValid;
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setSubmitStatus(null);
  const valid = validateForm();
  alert(t('Quá trình gửi sẽ mất một chút thời gian !'));
  if (valid) {
    try {
      await postData();
      console.log(response);
      const responseemail = await axios.post('http://localhost:8800/api/sendMail', formState);
      console.log(responseemail);
      setFormState(initialFormState);
      setSubmitStatus('success');
      
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  }
  if (submitStatus === 'success') {
    alert(t('Gửi thành công!'));
    window.location.reload();
  } else if (submitStatus === 'error') {
    alert(t('Gửi thất bại, vui lòng thử lại!'));
  }
};
  return (
    <div>
      <Header/>
      <div className="contactContainer">
        <img src={Golden} alt="" className='goldcontact'/>
      <div className='homepage'>
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
            <span>&gt;</span>
            <p >{t('Liên hệ')}</p>
        </div>
        <div className="ruler">
                <div className="rulerone"></div>
                <h2 className='titlegtc'>{t('LIÊN HỆ')}</h2>
                <div className="rulertwo"></div>
            </div>
      </div>
      <div className="contactContent">
        <div className="infocontact">
          <div className="titleinfocontact">{t('THÔNG TIN LIÊN HỆ')}</div>
          <div className="locationinfo">
            <FontAwesomeIcon icon={faLocationDot} className="iconfirst"/>
            <div className="textinfo">{t('Trụ sở chính: 50 Đường 52-BTT, Khu phố 3, Phường Bình Trưng Tây,')}
            <br/>{t('Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam.')}</div>
          </div>
          <div className="phoneinfo">
            <FontAwesomeIcon icon={faPhone} className="iconfirst"/>
            <div className="textinfo">{t('Điện thoại')}: (028) 12345678</div>
          </div>
          <div className="emailinfo">
            <FontAwesomeIcon icon={faMailBulk} className="iconfirst"/>
            <div className="textinfo">Email: goldenlandofficial68@gmail.com</div>
          </div>
          <div className="websiteinfo">
            <FontAwesomeIcon icon={faGlobe} className="iconfirst"/>
            <div className="textinfo">Website: bdsgoldenland.com.vn</div>
          </div>
          <div className="iconinfo">
          <a href='https://goo.gl/maps/M3YMexr8KFQ8pvhg8'>
            <FontAwesomeIcon icon={faLocationDot} className="iconsecond"/></a>
            <a href='https://www.facebook.com/profile.php?id=100094260896692'>
            <img src={face} alt="" className="iconsecondfa"/></a>
            <FontAwesomeIcon icon={faGlobe} className="iconsecondglobal"/>
            <a href='https://chat.zalo.me/'>
            <img src={zalo} alt="" className="iconsecond"/></a>
          </div>
        </div>
        <div className="formcontact">
          <div className="titleformcontact">{t('LIÊN HỆ VỚI GOLDEN LAND')}</div>
          <form className='formcontactinfo' onSubmit={handleSubmit}>
              <input type="text" className="inp" placeholder={t('Họ tên khách hàng***')} name='fullname' onChange={handleInputChange}
            value={formState.fullname} /> {errors.fullname && <p className='errorform'>{errors.fullname}</p>}
              <input type="text" className="inp" placeholder='Email***' name='email' onChange={handleInputChange}
               value={formState.email} /> {errors.email && <p className='errorform'>{errors.email}</p>}
              <input type="text" className="inp" placeholder={t('SĐT***')} name='phone' onChange={handleInputChange}
               value={formState.phone} /> {errors.phone && <p className='errorform'>{errors.phone}</p>}
              <input type="text" className="inp" placeholder={t('Nội dung cần liên hệ')} name='desc' onChange={handleInputChange}
               value={formState.desc} /> {errors.desc && <p className='errorform'>{errors.desc}</p>}
              <div className="buttoncontactinfo">
                <button className="btncontact">{t('Gửi')}</button>
              </div>
          </form>
        </div>
      </div>
      <img src={golden} alt="" className="contactimg" />
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default Contact

