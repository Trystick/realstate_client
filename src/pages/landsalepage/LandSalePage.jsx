import './landsalepage.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import SearchTop from '../../components/search/SearchTop'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAreaChart, faBed, faCopy, faHeart, faLocation, faMoneyCheck, faShare, faToilet } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import FavoriteButton from '../../components/favorite/FavoriteButton'

const LandSalePage = () => {
 
  const [imgs, setImgs] = useState([]);
  const [wordData,setWordData]=useState(imgs[0])
  const [val,setVal] = useState(0)
  const {landsaleId} = useParams();
  const [houseData, setHouseData] = useState([]);
  const [users, setUsers] = useState({});

  const [data, setData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8800/api/landSale/randomlandsales', // Thay thế bằng đường dẫn API của bạn
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8800/api/landSale/find/${landsaleId}`)
      .then(response => {
        setImgs(response.data.photos);
        setWordData(response.data.photos[0]);
        setHouseData(response.data); // Lưu trữ tất cả dữ liệu trả về từ API
        // Gọi API để lấy thông tin người dùng
        axios.get(`http://localhost:8800/api/users/${response.data.userId}`, {withCredentials: true})
          .then(userResponse => {
            setUsers(userResponse.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [landsaleId]);

  
  const handleClick=(index)=>{
    console.log(index)
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  const handleNext = ()=>{
    let index = val < imgs.length -1 ? val +1 : val;
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  const handlePrevious = ()=>{
    let index = val <= imgs.length -1 && val > 0? val - 1 : val;
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }

   //hàm chuyển đổi ngày tháng
   function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const url = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className='landSaleDetaiContainer'>
        <Header/> 
      <div className="contentdetaillandsale">
        <div className="leftdetaillandsale">
          <div className="grouppicturelandsaledetail">
            <div className="toppicturesliderlandsale">
            <button className='btns' onClick={handlePrevious}>&larr;</button>
               <img src={wordData} className='imglandsaledetail'/> 
            <button className='btns' onClick={handleNext}>&rarr;</button>
            </div>
            <div className="bottompicturelandsaledetail">
            <div className='flex_row'>
              {imgs.map((data,i)=>
              <div className="thumbnail" key={i} >
                <img className={wordData===data?"clicked":""} src={data} onClick={()=>handleClick(i)} height="100%" width="95%" />
              </div>
              )}
              </div>
            </div>
          </div>
          {houseData && (<div>
           <div className="namelandsaledetail">
            {houseData.name}
          </div>
          <div className="addresslandsaledetail">
          {houseData.location}
          </div>
          <div className="ultitilandsaledetail">
            <div className="groupinfolandsale">
              <div className="arealandsaledetail">
                  <p className='plandsaledetail'>Mức giá</p>
                  <p className='plandsaledetailunder'>{houseData.price} tỷ</p>
              </div>
              <div className="arealandsaledetail">
                  <p className='plandsaledetail'>Diện tích</p>
                  <p className='plandsaledetailunder'>{houseData.area} m<sup>2</sup></p>  
              </div>
              <div className="arealandsaledetail">
                  <p className='plandsaledetail'>Phòng ngủ</p>
                  <p className='plandsaledetailunder'>{houseData.room} PN</p>
              </div>
            </div>
            <div className="sharelikelandsale">
              <FontAwesomeIcon icon={faShare} className='iconshrarelike' onClick={toggleOpen} />
              {isOpen && (
                <div className="dropdown">
                  <FacebookShareButton
                      url={url}
                      className='btnsharesocialfa'
                    >
                    <FacebookIcon size={30} round />
                    Facebook
                  </FacebookShareButton>
                  <TwitterShareButton
                      url={url}
                      className='btnsharesocialtw'
                    >
                    <TwitterIcon size={30} round />
                    Twitter
                  </TwitterShareButton>
                  <button onClick={copyLink} className='btnsharesocialcopy'><FontAwesomeIcon icon={faCopy} className='iconcopy'/> Copy Link</button>
                </div>
              )}
                <FavoriteButton userId={userLocal._id} landsaleId={houseData._id} onClick={(event) => event.stopPropagation()} className='iconheartlike'/>
            </div>
          </div>
          <div className="deslandsaledetail">
            <div className="titledeslandsale">Thông tin mô tả</div>
            <div className="descontentlandsaledetail" dangerouslySetInnerHTML={{ __html: houseData?.desc?.replace(/\n/g, '<br>') }}>
            {/* {houseData.desc} */}
            </div>
          </div>
          <div className="characlandsaledetail">
            <div className="titlecharaclandsaledetail">
              Đặc điểm bất động sản
            </div>
            <div className="groupleftrightcharacdetaillandsale">
              <div className="groupleftcharaclandsaledetail">
                  <div className="grouptopcharaclandsaledetail">
                    <FontAwesomeIcon icon={faAreaChart} className='iconcharacdetaillandsale' />
                    <div className="ptopleft">Diện tích</div>
                    <div className="ptopright">{houseData.area} m<sup>2</sup></div>
                  </div>
                  <div className="groupbottomcharaclandsaledetail">
                    <FontAwesomeIcon icon={faBed} className='iconcharacdetaillandsale' />
                    <div className="punderleft">Số phòng ngủ</div>
                    <div className="punderright">{houseData.room} phòng</div>
                  </div>
              </div>
              <div className="grouprightcharaclandsaledetail">
                  <div className="grouptopcharaclandsaledetail">
                    <FontAwesomeIcon icon={faMoneyCheck} className='iconcharacdetaillandsale'/>
                    <div className="ptopleft">Mức giá</div>
                    <div className="ptopright">{houseData.price} tỷ</div>
                  </div>
                  <div className="groupbottomcharaclandsaledetail">
                  <FontAwesomeIcon icon={faToilet} className='iconcharacdetaillandsale'/>
                    <div className="punderleft">Số toilet</div>
                    <div className="punderright2">{houseData.toilet} phòng</div>
                  </div>
              </div>
            </div>
          </div>
          <div className="anotherinfodetaillandsale">
            <div className="titleanotherdetaillandsale">
              Thông tin khác
            </div>
            <div className="groupanotherdetaillandsale">
              <div className="itemanotherdetaillandsale">
                  <div className="firstitemanotherdetaillandsale">Ngày đăng</div>
                  <div className="seconditemanotherdetaillandsale">{formatDate(houseData.createdAt)}</div>
              </div>
              <div className="itemanotherdetaillandsale">
                  <div className="firstitemanotherdetaillandsale">Tên liên hệ</div>
                  <div className="seconditemanotherdetaillandsale">{houseData.nameContact}</div>
              </div>
              <div className="itemanotherdetaillandsale">
                  <div className="firstitemanotherdetaillandsale">Số điện thoại </div>
                  <div className="seconditemanotherdetaillandsale">{houseData.phoneContact}</div>
              </div>
              <div className="itemanotherdetaillandsale">
                  <div className="firstitemanotherdetaillandsale">Email liên hệ</div>
                  <div className="seconditemanotherdetaillandsale">{houseData.emailContact}</div>
              </div>
            </div>
          </div>
          </div>
          )}
          <div className="tinnoibatkhac">
            <div className="titletinoibatkhac">
              Tin nổi bật khác
            </div>
            <div className="grouptinnoibat">
                {data.map((item, index) => (
                <div className="itemtinnoibat">
                  <div className="anhtinnoibat">
                    <img src={item.photos[0]} alt="" className="imgnoibat" />
                  </div>
                  <div className="coveritemtinnoibat">
                    <div className="priceareanoibat">
                      <div className="ppriceareanoibat">
                      {item.price} tỷ
                      </div>
                      <div className="ppriceareanoibat">
                      {item.area} m<sup>2</sup>
                      </div>
                    </div>
                    <div className="locanoibatkhac">
                      <FontAwesomeIcon icon={faLocation} className='iconlocatinnoibat'/>
                      <div className="ploacationnoibat">, {item.location}</div>
                    </div>
                  </div>
                </div>
                ))}
            </div>
          </div>
        </div>
        <div className="rightdetaillandsale">
           {users && ( <div className="itemuserdangtin">
              <div className="avatarlandsaledetail">
                <img src={users.img} alt="" className="avtaruserlandsale" />
              </div>
              <div className="bydangtin">
                Được đăng bởi
              </div>
              <div className="usernamedangtin">
                {users.username}
              </div>
              <div className="phoneuserdangtin">
              {users.phoneNumber}
              </div>
            </div>
            )}
        </div>
         
      </div>
     
      <ScrollToTop/>
       <Footer/>
    </div>
  )
}

export default LandSalePage
