import "./featured.css"
import React, { useState, useEffect } from 'react';
import imgFeature1 from "./img/DUAN3.jpg"
import iconBuld from "./icon/building.png"
import iconGrap from "./icon/graphic-design.png"
import iconUser from "./icon/multiple-users-silhouette.png"
import iconSup from "./icon/support.png"
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import SearchTop from "../search/SearchTop";

const Featured = () => {

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
        }, 10);
        return () => clearInterval(interval);
      }, [count1, count2, count3, count4]);
    
    
    

  return (
    <div className="featured">
      <img src={imgFeature1} alt="" className="imgFeatured"/>
        <SearchTop/>
      <div className="featuredContainer">
        <div className="featuredItem">
            <div className="featureItem1">
                <h1 className="titleFeatured">{t('GIỚI THIỆU VỀ GOLDEN LAND')}</h1>
                <p className="textFeatured">
                {t('Được thành lập năm 2017, năm khá sôi động của thị trường bất động sản khi mà đất nền lên cơn sốt ở khắp Việt Nam, đặc biệt là các tỉnh thành phố lớn như TP HCM, Hà Nội và Đà Nẵng. Trải qua khoảng thời gian có nhiều biến động của thị trường bất động sản, GOLDEN LAND đang từng bước khẳng định uy tín, vị thế của mình trong ngành bất động sản, bằng việc sở hữu quỹ đất rộng lớn, đầu tư và phát triển các dự án dân cư chất lượng, hiện đang là chủ đầu tư của nhiều dự án quy mô hàng đầu Việt Nam. Ngoài ra, GOLDEN LAND còn là đơn vị tư vấn và phân phối nhiều dự án bất động sản lớn khác tại Việt Nam.')} <br/> 
                {t('Lấy sự chuyên nghiệp, tận tâm với nghề, luôn đặt sự hài lòng của đối tác và khách hàng lên hàng đầu, GOLDEN LAND hân hạnh đồng hành cùng quý đối tác và quý khách hàng, cam kết mang đến những dự án bất động sản tốt nhất và gia tăng giá trị đầu tư tối ưu nhất cho quý đối tác và khách hàng.')}
                </p>
            <button className="featuredBtn" ><Link to='/present/Gioithieuchung' className="linkfeature1">{t('Xem Thêm')}</Link></button>
            </div>
        </div>
        <div className="featuredItem" >
            <div className="featureItem2">
                <div className="doubleIcon1">
                    <div className="infoFeatured">
                        <img className="iconFeatured" src={iconBuld} alt=""/>
                        <span className="numberFeatured">{count1}+</span>
                        <span className="moreFeature">{t('năm hoạt động')}</span>
                    </div>
                    <div className="infoFeatured">
                        <img className="iconFeatured" src={iconGrap} alt=""/>
                        <span className="numberFeatured">{count2}+</span>
                        <span className="moreFeature">{t('dự án triển khai')}</span>
                    </div>
                </div>
                <div className="doubleIcon2">
                    <div className="infoFeatured">
                        <img className="iconFeatured" src={iconUser} alt=""/>
                        <span className="numberFeatured">{count3}+</span>
                        <span className="moreFeature">{t('khách hàng')}</span>
                    </div>
                    <div className="infoFeatured">
                        <img className="iconFeatured" src={iconSup} alt=""/>
                        <span className="numberFeatured">{count4}+</span>
                        <span className="moreFeature">{t('đối tác')}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
