import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import './formungtuyen.css'
import job from '../job/img/vl.png'
import { useState } from 'react';
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import ScrollToTop from '../../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../../hooks/i18n';

const Formungtuyen = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const[name, setName] = useState(location.state.name);
  const [loading, setLoading] = useState(false);

    const initialFormState = {
      namejob: t(name),
      fullname : '',
      email: '',
      phone: '',
      file:''
    };

    const [formState, setFormState] = useState(initialFormState);
      const [errors, setErrors] = useState({});
      const [submitStatus, setSubmitStatus] = useState(null);
    
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
        if (!formState.namejob) {
          newErrors.namejob = t('Vị trí ứng tuyển là bắt buộc');
          isValid = false;
        }
        if (!formState.file) {
          newErrors.file = t('File là bắt buộc');
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      console.log(formState);
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitStatus(null);
        const valid = validateForm();
        alert(t('Quá trình gửi sẽ mất một chút thời gian !'));
        if (valid) {
          try {
            // Lấy file từ input
            const fileInput = event.target.elements.file;
            const file = fileInput.files[0];
      
            // Tạo đối tượng FormData để gửi dữ liệu qua API
            const formData = new FormData();
            formData.append('namejob', formState.namejob);
            formData.append('fullname', formState.fullname);
            formData.append('email', formState.email);
            formData.append('phone', formState.phone);
            formData.append('file', file);
      
            // Gửi dữ liệu qua API
            const response = await axios.post('https://realstate-api-glm4.onrender.com/api/sendMailJob', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            const data = new FormData();
            data.append("file", file)
            data.append("upload_preset", "upload")
             // Lấy URL của tệp đã tải lên
             const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/auto/upload/", data);

             const {url} = uploadRes.data;

            const newJobApply = {
              ...formState,
              file: url,
            };

            await axios.post("https://realstate-api-glm4.onrender.com/api/jobApply", newJobApply);

            setFormState(initialFormState);
            setSubmitStatus('success');
           
          } catch (error) {
            console.error(error);
            setSubmitStatus('error');
          }finally {
            setLoading(false);
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
      <div className="formContainer">
        <img src={job} alt="" className='ingfromtd' />
        <div className='homepage'>
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
                <span>&gt;</span>
                <p>{t('Form ứng tuyển')}</p>
        </div>
      
        <div className="titleformut">
            <h2 className='titlett'>{t('THÔNG TIN ỨNG VIÊN')}</h2>
            <div className="ttcanhan">{t('THÔNG TIN CÁ NHÂN')}</div>
        </div>
        <form onSubmit={handleSubmit} className='formtuyendung'>
            <div className="firstform">
                <div className="formone">
                    <p>{t('Vị trí ứng tuyển: *')}</p>
                    <input value={formState.namejob} 
                    className='ipfirstform' name='namejob' onChange={handleInputChange}/> {errors.namejob && <p className='errorform'>{errors.namejob}</p>}
                    <p>{t('Họ và tên: *')}</p>
                    <input className='ipfirstform' name='fullname' onChange={handleInputChange}
                  value={formState.fullname}/> {errors.fullname && <p className='errorform'>{errors.fullname}</p>}
                    <p>Email:*</p>
                    <input type="text" className='ipfirstform' name='email' onChange={handleInputChange}
                  value={formState.email}/> {errors.email && <p className='errorform'>{errors.email}</p>}
                    <p>{t('Số điện thoại:')}</p>
                    <input type="text" className='ipfirstform' name='phone' onChange={handleInputChange}
                  value={formState.phone}/> {errors.phone && <p className='errorform'>{errors.phone}</p>}
                </div>
            </div>
            <div className="inputfile">
              <h3 className='dinhkem'>{t('Đính kèm hồ sơ cá nhân (.doc hoặc .pdf)')}</h3>
              <input type="file" className='fileinput' name='file' onChange={handleInputChange}
                  value={formState.file}/> {errors.file && <p className='errorform'>{errors.file}</p>}
            </div>
              {loading && (
            <div>{t('Xin chờ một chút')}</div>
            )}
            {!loading && (
            <div className="btnguihoso">
              <button className='btnhoso'>{t('Gửi hồ sơ')}</button>
            </div>
             )}
        </form>
      </div>
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default Formungtuyen
