
import { faGlobe, faLocationDot, faMailBulk, faPerson, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './footer.css'
import logo from './img/LOGO.png' 
import zalo from "./icon/zalo.png"
import facebook from "./icon/Facebook.png"
import { useState } from 'react'
import usePost from '../../hooks/usePost'
import axios from "axios"
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const Footer = () => {
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
  
  const { response, loading: postLoading, error: postError, postData } =
    usePost(`https://realstate-api-glm4.onrender.com/api/advise/`, formState);

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
      newErrors.desc = t('Dự án quan tâm là bắt buộc');
      isValid = false;
    } else if (formState.desc.length < 5) {
        newErrors.desc = t('Dự án quan tâm phải có ít nhất 5 ký tự');
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
        const responseemail = await axios.post('https://realstate-api-glm4.onrender.com/api/sendMail', formState);
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
    <div className='footer'>
      <div className='fList'>
        <img src={logo} className="logoFooter"/>
        <div className='footerTitle'>{t('KẾT NỐI VỚI GOLDEN LAND')}</div>
        <div className='iconFooter1'>
            <a href='https://goo.gl/maps/M3YMexr8KFQ8pvhg8'>
            <FontAwesomeIcon icon={faLocationDot} className="icon"/></a>
            <a href='https://www.facebook.com/profile.php?id=100094260896692'>
              <img src={facebook} className="iconf"/>
            </a>
            <FontAwesomeIcon icon={faGlobe} className="icon"/>
            <a href='https://chat.zalo.me/'>
            <img src={zalo} className="iconz"/>
            </a>
        </div>
        <div className='hotline'> 
            <h3 className='titlehotline'>HOTLINE: 0123456789
            <FontAwesomeIcon icon={faPhone} className="iconPhone"/>
            </h3>
        </div>
      </div>
      <div className='sList'>
        <div className='title1'>
        {t('CÔNG TY TNHH KINH DOANH BẤT ĐỘNG SẢN GOLDEN LAND')}
        </div>
        <p className='pngang3'></p>
        <div>
            <div className='chfooter'>
                <FontAwesomeIcon icon={faLocationDot} className="icon1"/>
                <p className='pfooter'>
                  {t('Trụ sở chính: 50 Đường 52-BTT, Khu phố 3,')}<br/>
                  {t('Phường Bình Trưng Tây, Thành phố Thủ Đức,')}<br/>
                  {t('Thành phố Hồ Chí Minh, Việt Nam.')}
                </p>
            </div>
            <div className='chfooter'>
                <FontAwesomeIcon icon={faPerson} className="icon1"/>
                <p className='pfooter'>{t('MST')}: 0314338262</p>
            </div>
            <div className='chfooter'>
                <FontAwesomeIcon icon={faPhone} className="icon1"/>
                <p className='pfooter'>{t('Điện thoại')}: (028) 12345678</p>
            </div>
            <div className='chfooter'>
                <FontAwesomeIcon icon={faMailBulk} className="icon1"/>
                <p className='pfooter'>Email: goldenlandofficial68@gmail.com</p>
            </div>
            <div className='chfooter'>
                <FontAwesomeIcon icon={faGlobe} className="icon1"/>
                <p className='pfooter'>Website: bdsgoldenland.com.vn</p>
            </div>
            <p className='pngang2'></p>
            <div className='banQuyen'>
                <h4 className='h4footer'>Copyright © 2018 By Golden Land. All rights reserved.</h4>
                <p className='p1footer'>{t('Thiết kế và phát triển bởi công ty')}</p>
            </div>
        </div>
      </div>
      <div className='tList'>
        <div className="tlfooter">
            <h2 className='h2footer'>{t('NHẬN THÔNG TIN TỪ GOLDEN LAND')}</h2>
        </div>
        <p className='pngang4'></p>
        <form  className='formfooter' onSubmit={handleSubmit}>
            <input type="text" name='fullname' placeholder={t('Họ tên khách hàng***')} className='ipform' onChange={handleInputChange}
            value={formState.fullname}/> {errors.fullname && <p className='errorform'>{errors.fullname}</p>}
            <input type="email" placeholder='Email' className='ipform' onChange={handleInputChange} name='email'
            value={formState.email} /> {errors.email && <p className='errorform'>{errors.email}</p>}
            <input type="text" placeholder={t('SĐT***')} className='ipform'  onChange={handleInputChange} name='phone'
            value={formState.phone}/>{errors.phone && <p className='errorform'>{errors.phone}</p>}
            <input type="text" placeholder={t('Nội dung dự án quan tâm')} className='ipform' onChange={handleInputChange} name='desc'
            value={formState.desc}/>{errors.desc && <p className='errorform'>{errors.desc}</p>}
            <div className='btnDk'>
                <button className='buttonDk' type='submit'>{t('ĐĂNG KÝ')}</button>
            </div>
        </form>
        <p className='pngang'></p>
        <div className='textft'>
       
        </div>
      </div>
    </div>
  )
}

export default Footer
