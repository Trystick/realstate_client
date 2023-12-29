import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './gioithieuchung.css'
import Footer from '../../../../components/footer/Footer'
import Header from '../../../../components/header/Header'
import { Link } from 'react-router-dom'
import iconBuld from "./icon/building.png"
import iconGrap from "./icon/graphic-design.png"
import iconUser from "./icon/multiple-users-silhouette.png"
import iconSup from "./icon/support.png"
import golden from "./img/Golden.jpg"
import present from "./img/present.jpg"
import { useEffect, useState } from 'react'
import ScrollToTop from '../../../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../../../hooks/i18n';

const Gioithieuchung = () => {
    const { t } = useTranslation();

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count1 < 6) {
                setCount1(count1 + 1);
              }
            if (count2 < 100) {
            setCount2(count2 + 1);
            }
            if (count3 < 1000) {
                setCount3(count3 + 1);
            }
            if (count4 < 50) {
                setCount4(count4 + 1);
            }
        }, 20);
        return () => clearInterval(interval);
      }, [count1, count2, count3, count4]);

  return (
    <div>
        <Header/>
        <div className='gioithieuContainer'>
            <img src={present} alt="" className='presentchungimg' />
            <div className='homepage'>
            <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
                <span>&gt;</span>
                <p>{t('Giới Thiệu')}</p>
            </div>
            
            <div className="ruler">
                <div className="rulerone"></div>
                <h2 className='titlegtc'>{t('GIỚI THIỆU')}</h2>
                <div className="rulertwo"></div>
            </div>
            <div className="gioithieucontent">
                <div className="namegt">{t('CÔNG TY TNHH KINH DOANH BẤT ĐỘNG SẢN GOLDEN LAND')}</div>
                <div className="rulerthree"></div>
                <div className="noidunggt">{t('Được thành lập năm 2017, năm khá sôi động của thị trường bất động sản khi mà đất nền lên cơn sốt ở khắp Việt Nam, đặc biệt là các tỉnh thành phố lớn như TP HCM, Hà Nội và Đà Nẵng. Trải qua khoảng thời gian có nhiều biến động của thị trường bất động sản, GOLDEN LAND đang từng bước khẳng định uy tín, vị thế của mình trong ngành bất động sản, bằng việc sở hữu quỹ đất rộng lớn, đầu tư và phát triển các dự án dân cư chất lượng, hiện đang là chủ đầu tư của nhiều dự án quy mô hàng đầu Việt Nam. Ngoài ra, GOLDEN LAND còn là đơn vị tư vấn và phân phối nhiều dự án bất động sản lớn khác tại Việt Nam.')} 
                <br/><br/>
                {t('Với tầm nhìn dài hạn của ban lãnh đạo cùng với đội ngũ nhân viên dày dạn kinh nghiệm, GOLDEN LAND hiện đang cung cấp những dự án bất động sản tốt nhất và chất lượng nhất, đảm bảo đạt được những tiêu chí như vị trí đắc địa, giá cả phải chăng, giá trị đầu tư tăng theo thời gian, tiện ích đa dạng phong phú…')}
                <br/><br/>
                {t('Lấy sự chuyên nghiệp, tận tâm với nghề, luôn đặt sự hài lòng của đối tác và khách hàng lên hàng đầu, GOLDEN LAND hân hạnh đồng hành cùng quý đối tác và quý khách hàng, cam kết mang đến những dự án bất động sản tốt nhất và gia tăng giá trị đầu tư tối ưu nhất cho quý đối tác và khách hàng.')}
                <br/><br/>
                <span className='its'>{t('Tên công ty')}:</span> <span className='it'>{t('CÔNG TY TNHH KINH DOANH BẤT ĐỘNG SẢN GOLDEN LAND')}</span>
                <br/><br/>
                <span className='its'>{t('Trụ sở chính')}:</span> <span className="it">{t('50 Đường 52-BTT, Khu phố 3, Phường Bình Trưng Tây, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam')}</span> 
                </div>
            </div>
            <div className="fouricon">
                <div className="firsticon">
                    <img src={iconBuld} alt="" className='imgiconfour'/>
                    <div className="numberingree">{count1}+</div>
                    <div className="contenticon">{t('năm hoạt động')}</div>
                </div>
                <div className="twoicon">
                    <img src={iconGrap} alt="" className='imgiconfour' />
                    <div className="numberingree">{count2}+</div>
                    <div className="contenticon">{t('dự án triển khai')}</div>
                </div>
                <div className="threeicon">
                    <img src={iconUser} alt="" className='imgiconfour'/>
                    <div className="numberingree">{count3}+</div>
                    <div className="contenticon">{t('khách hàng')}</div>
                </div>
                <div className="fourthicon">
                    <img src={iconSup} alt="" className='imgiconfour'/>
                    <div className="numberingree">{count4}+</div>
                    <div className="contenticon">{t('đối tác')}</div>
                </div>
            </div>
            <div className="imggoldenmaker">
                <img src={golden} alt="" className='imggticon'/>
            </div>
            <div className="boxdiv">
                <div className="firstbox">
                    <div className="titlefirstbox">{t('TẦM NHÌN')}</div>
                    <div className="contentfirstbox"><span>GOLDEN LAND</span> {t('hướng đến mục tiêu trở thành doanh nghiệp đầu tư, phát triển dự án bất động sản chuyên nghiệp, uy tín hàng đầu tại Việt Nam và khu vực.')}
                    <p className='pfirtbox'>- {t('Đầu tư các dự án bất động sản mang tầm quốc gia, quốc tế.')}</p>
                    <p className='pfirtbox'>- {t('Phát triển bất động sản đa lĩnh vực: bất động sản đô thị, bất động sản du lịch-nghỉ dưỡng, bất động sản công nghiệp.')}</p>
                    </div>
                </div>
                <div className="secondbox">
                    <div className="titlesecondbox">{t('SỨ MỆNH')}</div>
                    <div className="contentsecondbox"> <h5>{t('VỚI KHÁCH HÀNG VÀ ĐỐI TÁC')}</h5>
                    <p>- {t('Cung cấp những sản phẩm và dịch vụ có chất lượng tốt nhất với mức giá hợp lý.')}
                        <br/>- {t('Mang lại những cơ hội đầu tư sinh lời tối ưu nhất.')}
                        <br/>- {t('Đề cao tinh thần hợp tác đôi bên cùng phát triển, cam kết tối ưu hóa lợi ích của các đối tác.')}
                    </p>
                    <h5>{t('VỚI CÁN BỘ NHÂN VIÊN')}</h5>
                    <p>- {t('Tạo môi trường làm việc chuyên nghiệp và thăng tiến cho nhân viên.')}
                        <br/>- {t('Nâng cao năng lực, trình độ và chất lượng đời sống nhân viên.')}
                    </p>
                    <h5>{t('VỚI XÃ HỘI')}</h5>
                    <p>- {t('Đóng góp tích cực cho cộng đồng những công trình dự án chất lượng, góp phần vào sự phát triển kinh tế – xã hội của đất nước')}</p>
                    </div>
                </div>
            </div>
        </div>
        <ScrollToTop/>
      <Footer/>
    </div>
  )
}


export default Gioithieuchung
