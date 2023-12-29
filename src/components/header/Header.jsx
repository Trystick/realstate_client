import {faBars, faCreditCard, faHeart, faHistory, faHourglass, faHouse, faSearch, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./header.css"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "./LOGO.png"
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import { AuthContext } from "../context/AuthContext";
import avatar from '../header/avatar.png'
import axios from "axios";

const Header = () => {
    const [itemsnb, setItemsnb] = useState([]);
    const [itemsnt, setItemsnt] = useState([]);
    const [items, setItems] = useState([]);

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch('https://realstate-api-glm4.onrender.com/api/landSaleCategory')
            .then(response => response.json())
            .then(data => {
                const itemsnb = data.map(item => ({
                    label: item.name,
                    id: item._id,
                    href: item.connect,
                }));
                console.log(itemsnb);
                setItemsnb(itemsnb); 
            })
            .catch(error => console.error('Error:', error));
    }, []); // Chỉ gọi API một lần khi component được mount

    useEffect(() => {
        fetch('https://realstate-api-glm4.onrender.com/api/landLeaseCategory')
            .then(response => response.json())
            .then(data => {
                const itemsnt = data.map(item => ({
                    label: item.name,
                    id: item._id,
                    href: item.connect,
                }));
                console.log(itemsnt);
                setItemsnt(itemsnt); 
            })
            .catch(error => console.error('Error:', error));
    }, []); // Chỉ gọi API một lần khi component được mount

    useEffect(() => {
        fetch('https://realstate-api-glm4.onrender.com/api/category')
            .then(response => response.json())
            .then(data => {
                const items = data.map(item => ({
                    label: item.name,
                    id: item._id,
                    href: item.connect,
                }));
                console.log(items);
                setItems(items); 
            })
            .catch(error => console.error('Error:', error));
    }, []); // Chỉ gọi API một lần khi component được mount
  
    const itemstt = [{label: 'Tin dự án', href:'/new'}, {label:'Tin thị trường', href:'/newtt'}, {label: 'Tin GoldenLand', href:'/newgolden'}];
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpenProlie, setIsOpenProlie] = useState(false);
    const [names, setNames] = useState("")
    const [activeIndex, setActiveIndex] = useState(0);

    const [activeItem, setActiveItem] = useState('Trangchu');
  

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const savedActiveItem = localStorage.getItem('activeItem');
        if (savedActiveItem) {
          setActiveItem(savedActiveItem);
        }
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
      }, []);
   
   
   const handleClick = (action) => {
        setActiveItem(action);
        localStorage.setItem('activeItem', action);
        switch (action) {
          case 'Trangchu':
            navigate("/");
            break;
          case 'Gioithieu':
            navigate("/present/Gioithieuchung");
            break;
          case 'Nhaban':
            navigate("/landsale");
            break;
          case 'Nhathue':
            navigate("/landlease");
            break;
          case 'Duan':
            navigate("/listEstate");
            break;
          case 'Tintuc':
            navigate(`/newtt`);
            break;
          case 'Tuyendung':
            navigate("/content");
            break;
          case 'Lienhe':
            navigate("/contact");
            break;
          default:
            break;
        }
    }
      
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            dispatch({ type: 'LOGOUT' });
            // Xóa thông tin người dùng khỏi localStorage
            localStorage.removeItem("user");
            navigate("/");
        }
    };
    
    const handleDropdownClick = (item) => {
        setActiveItem('Nhaban');
        localStorage.setItem('activeItem', 'Nhaban');
        navigate(item.href);
    }

    const handleDropdownClickNT = (item1) => {
        setActiveItem('Nhathue');
        localStorage.setItem('activeItem', 'Nhathue');
        navigate(item1.href);
    }

    const handleDropdownClickPJ = (item2) => {
        setActiveItem('Duan');
        localStorage.setItem('activeItem', 'Duan');
        navigate(item2.href);
    }

    const [userLocal, setUserLocal] = useState([]);
  // Lấy thông tin người dùng từ API khi trang tải
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    if (user && user._id) {
        const userId = user._id;
        axios.get(`https://realstate-api-glm4.onrender.com/api/users/${userId}`, {withCredentials: true})
        .then(response => {
            setUserLocal(response.data);
            localStorage.setItem('userId', response.data._id);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
 }, []);

    const handlePostClick = () => {
        if (userLocal && userLocal.type) {
            // Nếu gói còn hợp lệ, chuyển hướng người dùng đến trang đăng tin
            window.location.href = '/postpage';
        } else {
            // Nếu gói không còn hợp lệ, chuyển hướng người dùng đến trang mua gói
            window.location.href = '/packet';
        }
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        // handleClick('Nhaban');
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

    const toggleDropdown2 = () => {
        // handleClick('Nhaban');
        setIsDropdownOpen2(!isDropdownOpen2);
    };

    const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

    const toggleDropdown3 = () => {
        // handleClick('Nhaban');
        setIsDropdownOpen3(!isDropdownOpen3);
    };

    const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

    const toggleDropdown4 = () => {
        // handleClick('Nhaban');
        setIsDropdownOpen4(!isDropdownOpen4);
    };
      
  return (
    <div className="header">
         <div className="headerContainer">
            <div className="navContainer">
                    <Link to="/"><img src={logo} alt="logo" className="logo" /></Link>
            </div>
            <div className="headerList">
                <div className={`headerListItem ${activeItem === 'Trangchu' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faHouse} onClick={() => handleClick('Trangchu')}/>
                </div>
                <div className={`headerListItem ${activeItem === 'Gioithieu' ? 'active' : ''}`}>
                    <span 
                     onClick={() => handleClick('Gioithieu')}>{t('GIỚI THIỆU')}</span>
                </div>
                <div className={`headerListItem ${activeItem === 'Nhaban' ? 'active' : ''}`}
                   onMouseEnter={() => setIsOpen(true)}
                   onMouseLeave={() => setIsOpen(false)}
                >
                    <span onClick={() => handleClick('Nhaban') }>{t('NHÀ BÁN')}</span>
                    {isOpen && (
                    <div className="menudropdown">
                       {itemsnb.map((item, index) => (
                           <Link key={index} to={`/landsale/landsalecategory/${item.id}`} 
                            onClick={() => handleDropdownClick(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
                <div className={`headerListItem ${activeItem === 'Nhathue' ? 'active' : ''}`}
                   onMouseEnter={() => setIsOpen2(true)}
                   onMouseLeave={() => setIsOpen2(false)}
                >
                    <span onClick={() => handleClick('Nhathue')}>{t('NHÀ THUÊ')}</span>
                    {isOpen2 && (
                    <div className="menudropdown">
                        {itemsnt.map((item, index) => (
                             <Link key={index} to={`/landlease/landleasecategory/${item.id}`} 
                            onClick={() => handleDropdownClickNT(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
                <div className={`headerListItem ${activeItem === 'Duan' ? 'active' : ''}`}
                   onMouseEnter={() => setIsOpen3(true)}
                   onMouseLeave={() => setIsOpen3(false)}
                   >
                    <span onClick={() => handleClick('Duan')}>{t('DỰ ÁN')}</span>
                    {isOpen3 && (
                    <div className="menudropdown">
                        {items.map((item, index) => (
                            <Link key={index} to={`/listEstate/categoryEstate/${item.id}`} 
                            onClick={() => handleDropdownClickPJ(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
                <div className={`headerListItem ${activeItem === 'Tintuc'  ? 'active' : ''}`}
                    onMouseEnter={() => setIsOpen4(true)}
                    onMouseLeave={() => setIsOpen4(false)}>
                    <span onClick={() => handleClick('Tintuc')}>{t('TIN TỨC')}</span>
                    {isOpen4 && (
                    <div className="menudropdown">
                        {itemstt.map((item, index) => (
                            <Link key={index} to={item.href} className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
                <div className={`headerListItem ${activeItem === 'Tuyendung' ? 'active' : ''}`}>
                    <span onClick={() => handleClick('Tuyendung')}>{t('TUYỂN DỤNG')}</span>
                </div>
                <div className={`headerListItem ${activeItem === 'Lienhe' ? 'active' : ''}`}>
                    <span onClick={() => handleClick('Lienhe')}>{t('LIÊN HỆ')}</span>
                </div>
            </div>
            {user ? (
    <div className="headerSign">
        <div className="headerSignUp">
            <button className="btnsign">
                <a className="linkcss" onClick={handlePostClick} >ĐĂNG TIN</a>
            </button>
        </div>
        <div className="headerSignIn">
            <button className="btnsign">
                <a className="linkcss" onClick={handleLogout}>ĐĂNG XUẤT</a>
            </button>
        </div>
        <div className="headerAvatar" 
            onMouseEnter={() => setIsOpenProlie(true)}
            onMouseLeave={() => setIsOpenProlie(false)}>
            <a href="/profile">
                <img src={user && user.img ? user.img : avatar} alt="avatar" style={{borderRadius: '50%'}} className='avatarHeader'/>
            </a>
            {isOpenProlie && (
                <div className="dropdownMenu">
                <a href="/profile" className="dropdownItem">
                    <FontAwesomeIcon icon={faUser} className='iconProfile'/>
                    Hồ Sơ</a>
                <a href="/payhistory" className="dropdownItem">
                    <FontAwesomeIcon icon={faCreditCard} className='iconProfile'/>
                    Thanh Toán</a>
                <a href="/history" className="dropdownItem">
                    <FontAwesomeIcon icon={faHistory} className='iconProfile'/>
                    Lịch Sử</a>
                <a href="/favorite" className="dropdownItem">
                    <FontAwesomeIcon icon={faHeart} className='iconProfile'/>
                    Yêu Thích</a>
                <a className="dropdownItem" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faHourglass} className='iconProfile'/>
                Đăng Xuất</a>
                </div>
            )}
        </div>
    </div>
    ) : (
    <div className="headerSign">
        <div className="headerSignUp">
            <button className="btnsign">
                <a href="/signup" className="linkcss">ĐĂNG KÝ</a>
            </button>
        </div>
        <div className="headerSignIn">
            <button className="btnsign">
                <a href="/login" className="linkcss">ĐĂNG NHẬP</a>
            </button>
        </div>
    </div>
    )}
        <label htmlFor="nav_input_mobile" className="navbarrs">
            <FontAwesomeIcon icon={faBars}/>
        </label>
        <input type="checkbox" hidden name="" id="nav_input_mobile" className="nav_input" />
        <label className="nav_overplay" htmlFor="nav_input_mobile">
        </label>
        <div className="nav_mobile">
            <label className="nav_x" htmlFor="nav_input_mobile">
                <FontAwesomeIcon icon={faTimes} />
            </label>
            <div className="headerListMobile">
                <div className="navContainerMobile">
                        <Link to="/"><img src={logo} alt="logo" className="logoMobile" /></Link>
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Trangchu' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faHouse} onClick={() => handleClick('Trangchu')}/>
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Gioithieu' ? 'active' : ''}`}>
                    <span 
                    onClick={() => handleClick('Gioithieu')}>{t('GIỚI THIỆU')}</span>
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Nhaban' ? 'active' : ''}`}
                  onClick={toggleDropdown}>
                    <span>{t('NHÀ BÁN')}</span>
                    {isDropdownOpen && (
                    <div className="menudropdownmobile">
                       {itemsnb.map((item, index) => (
                           <Link key={index} to={`/landsale/landsalecategory/${item.id}`} 
                            onClick={() => handleDropdownClick(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                         </div>
                    )}
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Nhathue' ? 'active' : ''}`}
                 onClick={toggleDropdown2}>
                    <span>{t('NHÀ THUÊ')}</span>
                    {isDropdownOpen2 && (
                    <div className="menudropdownmobile">
                        {itemsnt.map((item, index) => (
                            <Link key={index} to={`/landlease/landleasecategory/${item.id}`} 
                            onClick={() => handleDropdownClickNT(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                         </div>
                    )}
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Duan' ? 'active' : ''}`}
                 onClick={toggleDropdown3}>
                    <span>{t('DỰ ÁN')}</span>
                    {isDropdownOpen3 && (
                    <div className="menudropdownmobile">
                        {items.map((item, index) => (
                            <Link key={index} to={`/listEstate/categoryEstate/${item.id}`} 
                            onClick={() => handleDropdownClickPJ(item)} 
                            className='linkheaderhref'>
                                <div>{item.label}</div>
                            </Link>
                        ))}
                    </div>
                )}
                </div>
                
                <div className={`headerListItemMobile ${activeItem === 'Tintuc' ? 'active' : ''}`}>
                    <span onClick={() => handleClick('Tintuc')}>{t('TIN TỨC')}</span>
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Tuyendung' ? 'active' : ''}`}>
                    <span onClick={() => handleClick('Tuyendung')}>{t('TUYỂN DỤNG')}</span>
                </div>
                <div className={`headerListItemMobile ${activeItem === 'Lienhe' ? 'active' : ''}`}>
                    <span onClick={() => handleClick('Lienhe')}>{t('LIÊN HỆ')}</span>
                </div>
            </div>
            {user ? (
            <div className="headerSignMobile">
                <div className="signupinmobile">
                    <div className="headerSignUpMobile">
                        <button className="btnsignMobile">
                            <a className="linkcssMobile" onClick={handlePostClick} >ĐĂNG TIN</a>
                        </button>
                    </div>
                    <div className="headerSignInMobile">
                        <button className="btnsignMobile">
                            <a className="linkcssMobile" onClick={handleLogout}>ĐĂNG XUẤT</a>
                        </button>
                    </div>
                </div>
                <div className="headerAvatarMobile" 
                    onClick={toggleDropdown4}>
                    <a className="aheadermobile">
                        <img src={user && user.img ? user.img : avatar} alt="avatar" style={{borderRadius: '50%'}} className='avatarHeaderMobile'/>
                    </a>
                    {isDropdownOpen4 && (
                        <div className="dropdownMenuMobile">
                        <a href="/profile" className="dropdownItem">
                            <FontAwesomeIcon icon={faUser} className='iconProfile'/>
                            Hồ Sơ</a>
                        <a href="/payhistory" className="dropdownItem">
                            <FontAwesomeIcon icon={faCreditCard} className='iconProfile'/>
                            Thanh Toán</a>
                        <a href="/history" className="dropdownItem">
                            <FontAwesomeIcon icon={faHistory} className='iconProfile'/>
                            Lịch Sử</a>
                        <a href="/favorite" className="dropdownItem">
                            <FontAwesomeIcon icon={faHeart} className='iconProfile'/>
                            Yêu Thích</a>
                        <a className="dropdownItem" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faHourglass} className='iconProfile'/>
                        Đăng Xuất</a>
                        </div>
                    )}
                </div>
            </div>
            ) : (
            <div className="headerSignMobile">
                <div className="headerSignUpMoblie">
                    <button className="btnsignMobile">
                        <a href="/signup" className="linkcssMobile">ĐĂNG KÝ</a>
                    </button>
                </div>
                <div className="headerSignInMoblie">
                    <button className="btnsignMobile">
                        <a href="/login" className="linkcssMobile">ĐĂNG NHẬP</a>
                    </button>
                </div>
            </div>
            )}  
        </div>
        </div>    
    </div>
  );
};

export default Header;
