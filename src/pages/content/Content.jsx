import './content.css'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import tuyendung from './img/tuyendung.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faHouse, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import ungtuyen from './img/ungtuyen.jpg'
import pv1 from './img/pv1.jpg'
import pv2 from './img/pv2.jpg'
import kq from './img/kq.jpg'
import fa from './img/Facebook.png'
import anhg from "./img/anhg.png"

import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import usePost from '../../hooks/usePost'
import axios from 'axios'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'

import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const Content = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
      axios.get('https://realstate-api-glm4.onrender.com/api/job')
        .then(response => setData(response.data))
        .catch(error => console.error(error));
    }, []);

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
        usePost(`/advise/`, formState);
    
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
          newErrors.desc = t('Nội dung là bắt buộc');
          isValid = false;
        } else if (formState.desc.length < 5) {
            newErrors.desc = t('Nội dung phải có ít nhất 5 ký tự');
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
        } else if (submitStatus === 'error') {
          alert(t('Gửi thất bại, vui lòng thử lại!'));
        }
      };

   //phân trang
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Cập nhật trang hiện tại
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
        <Header/>
      <div className="contentContainer">
        <img src={tuyendung} alt="" className='imgtuyendungjob'/>
        <div className='homepage'>
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
            <span>&gt;</span>
            <p>{t('Tuyển dụng')}</p>
        </div>
        <h2 className='titletuyendung'>{t('CƠ HỘI NGHỀ NGHIỆP')}</h2>
        
        <table className="tabletuyendung">
            <tr className="thtuyendung">
                <th className="muctuyendung">{t('Vị trí ứng tuyển')}</th>
                <th className="muctuyendung">{t('Số lượng')}</th>
                <th className="muctuyendung">{t('Địa điểm')}</th>
                <th className="muctuyendung">{t('Hạn nộp hồ sơ')}</th>
            </tr>
            {currentItems.map(item => (
            <tr className="tdtuyendung" key={item._id}>
              <td data-title='Vị trí ứng tuyển' className="noidungtuyendung"><Link to={`/job/${item._id}`} className="linkjob" >{t(item.name)}</Link></td>
              <td data-title='Số lượng' className="noidungtuyendung">{t(item.number)}</td>
              <td data-title='Địa điểm' className="noidungtuyendung">{t(item.location)}</td>
              <td data-title='Hạn nộp hồ sơ' className="noidungtuyendung">{item.dateend}</td>
            </tr>
             ))}
        </table>
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
        <div className="quytinhtd">
            <h2 className='title'>{t('QUY TRÌNH TUYỂN DỤNG')}</h2>
            <div className="quytrinh">
                <div className="itemquytrinh">
                    <img src={ungtuyen} alt="" className='imgquytrinh' />
                    <div className="stt"><div className='tt'>1</div>{t('Ứng tuyển')}</div>
                    <div className="noidungquytrinh">
                        {t('Ứng viên ứng tuyển tại:')}
                        <br/>Website - Fanpage
                        <br/>Email - Hotline
                    </div>
                </div>
                <div className="itemquytrinh">
                    <img src={pv1} alt=""  className='imgquytrinh' />
                    <div className="stt"><div className='tt'>2</div>{t('Phỏng vấn vòng 1')}</div>
                    <div className="noidungquytrinh">
                        {t('Phỏng vấn với quản lý trực')}
                        <br/>{t('tiếp trong công việc')}
                    </div>
                </div>
                <div className="itemquytrinh">
                    <img src={pv2} alt=""  className='imgquytrinh' />
                    <div className="stt"><div className='tt'>3</div>{t('Phỏng vấn vòng 2')}</div>
                    <div className="noidungquytrinh">
                        {t('Phỏng vấn với')}<br/>
                        {t('Ban Tổng Giám đốc của')}<br/>
                        {t('Công ty (tùy vị trí)')}
                    </div>
                </div>
                <div className="itemquytrinh">
                <img src={kq} alt="" className='imgquytrinh'/>
                    <div className="stt"><div className='tt'>4</div>{t('Thông báo kết quả')}</div>
                    <div className="noidungquytrinh">
                    {t('Ứng viên nhận Thư mời nhận việc')}
                     <br/> {t('hoặc Thư cảm ơn')}
                    </div>
                </div>
            </div>
        </div>
        <form className="formlh" onSubmit={handleSubmit}>
            <h5 className='h5content'>{t('Hãy để lại thông tin để chúng tôi gửi thông tin tuyển dụng công việc phù hợp với bạn')}</h5>
            <div className="coverlienhe">
              <div className="form1">
                  <input type="text" placeholder={t('Họ tên***')} className="itemip" name='fullname' onChange={handleInputChange}
                  value={formState.fullname}/> {errors.fullname && <p className='errorform'>{errors.fullname}</p>}
                  <input type="text" placeholder='Email***' className="itemip" name='email' onChange={handleInputChange}
                  value={formState.email}/> {errors.email && <p className='errorform'>{errors.email}</p>}
                  <input type="text" placeholder={t('SĐT***')} className="itemip" name='phone' onChange={handleInputChange}
                  value={formState.phone}/> {errors.phone && <p className='errorform'>{errors.phone}</p>}
              </div>
              <div className="form2">
                  <textarea className="itemarea" placeholder={t('Nội dung về công việc ứng tuyển...')} name='desc' onChange={handleInputChange}
                  value={formState.desc}/> {errors.desc && <p className='errorform'>{errors.desc}</p>}
                  <button className="send">{t('Gửi')}</button>
              </div>
            </div>
      </form>
      <div className="lhtuyendung">
            <div className="imgtd">
              <img src={anhg} alt="" className="imganhpng" />
            </div>
            <div className="muclh">
            <h2 className='titlelhtd'>{t('KẾT NỐI VỚI BỘ')}<br/>{t('PHẬN TUYỂN DỤNG')}</h2>
            <h1 className='doc'>--------------------</h1>
               <div className="iconmuclhtd">
                    <FontAwesomeIcon icon={faGlobe} className="iconlhtd"/>
                    <p className="nd">bdsgoldenland.com.vn</p>
                </div>
                <div className="iconmuclhtd">
                    <FontAwesomeIcon icon={faMailBulk} className="iconlhtd"/>
                    <p className="nd">goldenlandofficial68@gmail.com</p>
                </div>
                <div className="iconmuclhtd">
                    <img src={fa} className="iconlhtd" alt=''/>
                    <p className="nd"><a href='https://www.facebook.com/profile.php?id=100094260896692'>www.facebook.com/goldenland</a></p>
                </div>
               
            </div>
      </div>
    </div>
    <ScrollToTop/>
    <Footer/>
    </div>
  )
}

export default Content
