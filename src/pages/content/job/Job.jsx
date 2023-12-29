import './job.css'
import job from './img/vl.png'
import Header from '../../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import Footer from '../../../components/footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ScrollToTop from '../../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../../hooks/i18n';

const Job = () => {
  const { t } = useTranslation();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  

  const navigate = useNavigate()
//   const [names, setNames] = useState("")  
  const {jobId} = useParams();
  const {data, loading} = useFetch(`http://localhost:8800/api/job/find/${jobId}`);
  const arrayData = [data];

  const [datajob, setDataJob] = useState([]);

  const handleItemClick = (name) => {
    navigate("/formungtuyen", {state:{name}});
  }

 
  useEffect(() => {
      axios.get('http://localhost:8800/api/job')
        .then(response => setDataJob(response.data))
        .catch(error => console.error(error));
    }, []);
  return (
    <div>
        <Header/>
        {loading ? "loading" : <> 
        {arrayData.map(item => (
      <div className="jobContainer" key={item._id}>
        <img src={job} alt=""className='imgjob' />
        <div className='homepage'>
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
            <span>&gt;</span>
            <p><Link to="/content" className='linkjobcontent'>{t('Tuyển dụng')}</Link></p>
            <span>&gt;</span>
            <p>{t('Việc làm')}</p>
        </div>
        <div className="bothjob">
            <div className="leftside">
                <h2 className="titleviec">{t(item.name)}</h2>
                <div className="timejob">
                    <FontAwesomeIcon icon={faCalendar} className='iconCalender'/>
                    <div className="itemtime">{formatDate(item.createdAt)}</div>
                </div>
                <h3 className="tieude">I - {t('MÔ TẢ CÔNG VIỆC')}</h3>
                    <p className="noidungcv">{t(item.desc)} </p>
                    <br/>
                    <h3 className="tieude">II - {t('YÊU CẦU CÔNG VIỆC')}</h3>
                    <p className="yeucaucv">{t('Giới tính')}: {t(item.gender)} </p>
                    <p className="yeucaucv">{t('Tuổi')}: {t(item.age)} </p>
                    <p className="yeucaucv">{t('Trình độ')}: {t(item.level)} </p>
                    <p className="yeucaucv">{t('Kinh nghiệm')}: {t(item.experience)} </p>
                    <p className="yeucaucv">{t('Số lượng')}: {t(item.number)} </p>
                    <p className="yeucaucv">{t(item.request)} </p>
                    <br/>
                    <h3 className="tieude">III - {t('CHẾ ĐỘ')}</h3>
                    <p className="yeucaucv">{t(item.income)} </p>
                    <p className="yeucaucv">{t(item.regime)} </p>
                    <div className="mailsendjob">
                        <p>{t('Liên hệ ngay để ứng tuyển - BP Tuyển dụng')}
                        <br/>Hotline 0909 838 114 (Inbox/Zalo)
                        <br/>Email: tuyendung@golden.com.vn</p>
                    </div>
                    <div className="ungtuyen">
                        <button className="btnungtuyen"onClick={() => handleItemClick(item.name)}> 
                            {t('Ứng tuyển trực tiếp')}
                        </button>
                    </div>
            </div>
            <div className="rightside">
                <div className="vieckhac">
                    {t('CÁC VIỆC LÀM KHÁC')}
                </div>
                {datajob.map(item => (
                <div className="coverviec" key={item._id}>
                    <div className="timejob1">
                        <FontAwesomeIcon icon={faCalendar} className='iconCalender'/>
                        <div className="itemtime">{formatDate(item.createdAt)}</div>
                    </div>
                    <div className="namejob">
                        <p className="nameviec"><Link to={`/job/${item._id}`} className="linkjobcontent">{t(item.name)}</Link></p>
                        <p>---------------------------------</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
      </div>
      ))}</>}
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default Job
