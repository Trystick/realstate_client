import { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import './postchange.css'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const PostChange = () => {
    //xét màu cho bán và thuê
    const [activePost, setActivePost] = useState('');
    const [dataActive, setDataActive] = useState(null);
    const {postchange} = useParams();
    const [categoryLandSaleId, setCategoryLandSaleId] = useState('');
    const [categoryLandLeaseId, setCategoryLandLeaseId] = useState('');
    const [address, setAddress] = useState({
        provinces: '',
        districts: '',
        wards: '',
        streets: ''
    });

    useEffect(() => {
        const fetchData = async () => {
          try {
            let response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landSale/find/${postchange}`);
            if (response.status === 200 && response.data) {
              setActivePost('salepost');
              setPostName(response.data.name);
              setPostTitle(response.data.title);
              setPostDescription(response.data.desc);
              setArea(response.data.area);
              setPrice(response.data.price);
              setBedroom(response.data.room);
              setToilet(response.data.toilet);
              setCategoryLandSaleId(response.data.categoryLandSaleId);
            } else {
              response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landLease/find/${postchange}`);
              if (response.status === 200 && response.data) {
                setActivePost('leasepost');
                setPostName(response.data.name);
                setPostTitle(response.data.title);
                setPostDescription(response.data.desc);
                setArea(response.data.area);
                setPrice(response.data.price);
                setBedroom(response.data.room);
                setToilet(response.data.toilet);
                setCategoryLandLeaseId(response.data.categoryLandLeaseId);
              }
            }
            setDataActive(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [postchange]);
      
     
    //load dữ liệu loại bất động sản
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const handleSelectChange = (event) => {
        setSelectedId(event.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
          let url;
          try {
            let response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landSale/find/${postchange}`);
            if (response.status === 200 && response.data) {
              url = `https://realstate-api-glm4.onrender.com/api/landSaleCategory/${categoryLandSaleId}`;
            } else {
              response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landLease/find/${postchange}`);
              if (response.status === 200 && response.data) {
                url = `https://realstate-api-glm4.onrender.com/api/landLeaseCategory/${categoryLandLeaseId}`;
              }
            }
            response = await axios.get(url);
            setData(response.data);
            // const ids = response.data.map(item => item._id);
            // setIds(ids);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [postchange, categoryLandSaleId, categoryLandLeaseId]);
      console.log(categoryLandSaleId);

    //set địa chỉ
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [streets, setStreets] = useState([]);

    useEffect(() => {
        axios.get('/Index.json')
            .then(response => {
                if (response.data) {
                    const provincesArray = Object.entries(response.data).map(([name, { code, file_path }]) => ({ name, code, file_path }));
                    setProvinces(provincesArray);
                    handleProvinceChange(provincesArray[0].code);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    
console.log(provinces);

    const handleProvinceChange = (provinceCode) => {
        const province = provinces.find(p => p.code === provinceCode);
        axios.get(`http://localhost:3000/${province.file_path}`)
            .then(response => {
                setDistricts(response.data.district);
                
                setAddress(prevState => ({
                    ...prevState,
                    provinces: province.name
                }));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    console.log(districts);
    const handleDistrictChange = (districtName) => {
        const district = districts.find(d => d.name === districtName);
        setWards(district.ward);
        setAddress(prevState => ({
            ...prevState,
            districts: districtName
        }));
    }
    
    const handleWardChange = (wardName) => {
        const ward = wards.find(w => w.name === wardName);
        const district = districts.find(d => d.ward.includes(ward));
        setStreets(district.street);
        setAddress(prevState => ({
            ...prevState,
            wards: wardName
        }));
    }
    
    const handleStreetChange = (streetName) => {
        setAddress(prevState => ({
            ...prevState,
            streets: streetName
        }));
    }
    
    const [userLocal, setUserLocal] = useState([]);
    
    // Lấy thông tin người dùng từ API khi trang tải
    useEffect(() => {
      const userJson = localStorage.getItem('user');
      const user = JSON.parse(userJson);
      const userId = user._id;
      axios.get(`https://realstate-api-glm4.onrender.com/api/users/${userId}`, {withCredentials: true})
      .then(response => {
          setUserLocal(response.data);
          localStorage.setItem('userId', response.data._id);
          setInfo(prev => ({
            ...prev,
            nameContact: response.data.username,
            phoneContact: response.data.phoneNumber,
            emailContact: response.data.email,
        }));
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
  }, []);
   
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  // Cập nhật trạng thái khi userLocal thay đổi
  useEffect(() => {
      setUsername(userLocal.username || '');
      setPhoneNumber(userLocal.phoneNumber || '');
      setEmail(userLocal.email || '');
  }, [userLocal]);
  

    // Hàm xử lý sự kiện thay đổi
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
//validate form
    const [validationErrors, setValidationErrors] = useState({});
    const [postName, setPostName] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [toilet, setToilet] = useState('');
    const [bedroom, setBedroom] = useState('');
   

    // Hàm xác thực form
const validateForm = () => {
    let errors = {};
    
    // Kiểm tra xem người dùng đã chọn tỉnh/thành phố chưa
    if (!address.provinces) {
        errors.provinces = 'Vui lòng chọn tỉnh, thành phố';
    }

    // Kiểm tra xem người dùng đã chọn quận/huyện chưa
    if (!address.districts) {
        errors.districts = 'Vui lòng chọn quận, huyện';
    }

    // Kiểm tra xem người dùng đã chọn phường/xã chưa
    if (!address.wards) {
        errors.wards = 'Vui lòng chọn phường, xã';
    }

    // Kiểm tra xem người dùng đã nhập đủ ký tự cho "Tên bài đăng" chưa
    if (postName.length < 30 || postName.length > 99) {
        errors.postName = 'Tên bài đăng phải có ít nhất 30 ký tự và tối đa 99 ký tự';
    }

    // Kiểm tra xem người dùng đã nhập đủ ký tự cho "Tiêu đề" chưa
    if (postTitle.length < 30 || postTitle.length > 99) {
        errors.postTitle = 'Tiêu đề phải có ít nhất 30 ký tự và tối đa 99 ký tự';
    }

    // Kiểm tra xem người dùng đã nhập đủ ký tự cho "Mô tả" chưa
    if (postDescription.length < 30 || postDescription.length > 3000) {
        errors.postDescription = 'Mô tả phải có ít nhất 30 ký tự và tối đa 3000 ký tự';
    }
    // Kiểm tra xem người dùng đã nhập "Diện tích" chưa
    if (!area) {
        errors.area = 'Vui lòng nhập diện tích';
    }

    // Kiểm tra xem người dùng đã nhập "Mức giá" chưa
    if (!price) {
        errors.price = 'Vui lòng nhập mức giá';
    }

    // Kiểm tra xem người dùng đã nhập số lượng "Toilet" chưa
    if (!toilet) {
        errors.toilet = 'Vui lòng nhập số lượng toilet';
    }

    // Kiểm tra xem người dùng đã nhập số lượng "Phòng ngủ" chưa
    if (!bedroom) {
        errors.bedroom = 'Vui lòng nhập số lượng phòng ngủ';
    }
    // Kiểm tra xem người dùng đã tải lên hình ảnh chưa
    if (file.length === 0) {
        errors.file = 'Vui lòng tải lên ít nhất 4 hình ảnh';
    }
    // Kiểm tra xem người dùng đã nhập "Tên liên hệ" chưa
    if (!username) {
        errors.username = 'Vui lòng nhập tên liên hệ';
    }

    // Kiểm tra xem người dùng đã nhập "Số điện thoại" chưa
    if (!phoneNumber) {
        errors.phoneNumber = 'Vui lòng nhập số điện thoại';
    }
    // Cập nhật trạng thái lỗi xác thực
    setValidationErrors(errors);

    // Nếu không có lỗi, form hợp lệ
    return Object.keys(errors).length === 0;

}

// Sử dụng hàm xác thực form trước khi gửi form
const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
        // Gửi form nếu nó hợp lệ
    }
}

  //xử lý form 
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const [file, setFile] = useState("");

    const handleImageChange = (event) => {
        if (event.target.files.length < 4 || event.target.files.length > 15) {
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                file: 'Vui lòng tải lên ít nhất 4 hình ảnh và không quá 15 hình ảnh'
            }));
        } else {
            setFile(event.target.files);
            setValidationErrors(prevErrors => ({
                ...prevErrors,
                file: ''
            }));
        }
    }


  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  useEffect(() => {
    setInfo(prev => ({
        ...prev,
        location: `${address.streets}, ${address.wards}, ${address.districts}, ${address.provinces}`
    }));
}, [address]);
  
const handleClickForm = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của form
    if (!validateForm()) {
        return;  // Dừng hàm nếu form không hợp lệ
    }

    try {
      const list = await Promise.all(
        Object.values(file).map( async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);
        const {url} = uploadRes.data;
        return url;
    }));

    const updatePost = {
        ...info,
        selectedId: selectedId,
        photos: list,
        userId: userLocal._id,
    };
    
    let url;
    let response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landSale/find/${postchange}`);
    if (response.status === 200 && response.data) {
        url = `https://realstate-api-glm4.onrender.com/api/landSale/${postchange}`;
    } else {
        response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landLease/find/${postchange}`);
        if (response.status === 200 && response.data) {
            url = `https://realstate-api-glm4.onrender.com/api/landLease/${postchange}`;
        }
    }
    
    await axios.put(url, updatePost, {withCredentials: true});
    
    alert('Cập nhật bài thành công!');
      // Quay lại trang chủ
    navigate('/');
    } catch (err) {
      alert("Cập nhật thất bại !!! Đã xảy ra lỗi");
      console.log(err);
    }
  }


  console.log(selectedId);

  const handleCombinedChange = (event) => {
    handleSelectChange(event);
    handleChange(event);
  }

  const handleCombinedChangeUsername = (event) => {
    handleUsernameChange(event);
    handleChange(event);
  }

  const handleCombinedChangePhone = (event) => {
    handlePhoneNumberChange(event);
    handleChange(event);
  }

  const handleCombinedChangeEmail = (event) => {
    handleEmailChange(event);
    handleChange(event);
  }

  const [selectCategoryId, setSelectCategoryId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landSale/find/${postchange}`);
        if (response.status === 200 && response.data) {
          setSelectCategoryId('categoryLandSaleId');
        } else {
          response = await axios.get(`https://realstate-api-glm4.onrender.com/api/landLease/find/${postchange}`);
          if (response.status === 200 && response.data) {
            setSelectCategoryId('categoryLandLeaseId');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [postchange]);
  
console.log(data);
  return (
    <div className='postpageContainer'>
      <Header/>
      <form onSubmit={handleSubmit}>
        <div className="divpostone">
            <div className="titlePostPage">
                Thông tin cơ bản
            </div>
            <div className="choicesalelease">
                <div className="salepost"
                 style={{backgroundColor: activePost === 'salepost' ? 'goldenrod' : ''}}
                >
                    Nhà Bán
                </div>
                <div className="leasepost"
                style={{backgroundColor: activePost === 'leasepost' ? 'goldenrod' : ''}}
                >
                    Nhà Thuê
                </div>      
            </div>
            <div className="categorylandpost">
                <div className="titlecategorylandpost">
                    Loại bất động sản <span className='spanpost'>*</span>
                </div>
                <div className="selectcategorylandpost">
                    <select className={`selectcategorytag ${validationErrors.propertyType ? 'input-error' : ''}`} onChange={handleCombinedChange} id={selectCategoryId}>
                    <option value={data._id}>{data.name}</option>
                    </select>
                </div>
            </div>
            <div className="addresspost">
                <div className="leftaddresspost">
                    <div className="citypost">
                        <div className="titlecitypost">
                            Tỉnh, thành phố <span className='spanpost'>*</span>
                        </div>
                        <div className="selectcitypost">
                        <select className={`selectcategorytag ${validationErrors.provinces ? 'input-error' : ''}`} onChange={e => handleProvinceChange(e.target.value)}>
                                <option value="default">----Chọn----</option>
                                {provinces.map(({name, code}) => (
                                    <option key={code} value={code}>{name}</option>
                                ))}
                            </select>
                        </div>
                        {validationErrors.provinces && <div className="error">{validationErrors.provinces}
                        </div>
                    }</div>
                    <div className="wardpost">
                        <div className="titlewardpost">
                            Phường, xã <span className='spanpost'>*</span>
                        </div>
                        <select className={`selectcategorytag ${validationErrors.wards ? 'input-error' : ''}`} onChange={e => {
                                        handleWardChange(e.target.value);
                                }}>
                            <option value="default">----Chọn----</option>
                            {wards.map(({name}) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    {validationErrors.wards && <div className="error">{validationErrors.wards}
                        </div>
                    }
                </div>
                <div className="rightaddressPost">
                    <div className="citypost">
                        <div className="titlecitypost">
                           Quận, huyện <span className='spanpost'>*</span>
                        </div>
                        <div className="selectcitypost">
                        <select className={`selectcategorytag ${validationErrors.districts ? 'input-error' : ''}`} onChange={e => {
                                   handleDistrictChange(e.target.value);
                        
                           }}>
                           <option value="default">----Chọn----</option>
                           {districts.map(({name}) => (
                               <option key={name} value={name}>{name}</option>
                           ))}
                       </select>
                        </div>
                        {validationErrors.districts && <div className="error">{validationErrors.districts}
                        </div>
                    }
                    </div>
                    <div className="wardpost">
                        <div className="titlewardpost">
                            Đường, phố
                        </div>
                        <div className="selectwardpost">
                        <select className='selectcategorytag' onChange={e => {handleStreetChange(e.target.value)}}>
                            <option value="default">----Chọn----</option>
                            {streets.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="addresspostdetail">
                <div className="titlewardpost">
                    Địa chỉ
                </div>
                <input type='text' className='inpdiachi' id='location' onChange={handleChange} value={`${address.streets}, ${address.wards}, ${address.districts}, ${address.provinces}`} />
            </div>
        </div>
        <div className="divposttwo">
            <div className="titlePostPage">
                Thông tin bài viết
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Tên bài đăng <span className='spanpost'>*</span>
                </div>
                <div className="texttitlepost">
                    <textarea id='name' className={`textareapost ${validationErrors.area ? 'input-error' : ''}`} value={postName} onChange={e => 
                        {setPostName(e.target.value)
                            handleChange(e);
                        }}/>
                    {validationErrors.postName && <div className="error">{validationErrors.postName}</div>}
                    <div className="noticetext">Tối thiểu 30 ký tự, tối đa 99 ký tự</div>
                </div>
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Tiêu đề <span className='spanpost'>*</span>
                </div>
                <div className="texttitlepost">
                    <textarea id='title' className={`textareapost ${validationErrors.area ? 'input-error' : ''}`} value={postTitle} onChange={e => {
                        setPostTitle(e.target.value);
                        handleChange(e);
                        }}/>
                    {validationErrors.postTitle && <div className="error">{validationErrors.postTitle}</div>}
                    <div className="noticetext">Tối thiểu 30 ký tự, tối đa 99 ký tự</div>
                </div>
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Mô tả <span className='spanpost'>*</span>
                </div>
                <div className="texttitlepost">
                    <textarea id='desc' className={`textareadescpost ${validationErrors.area ? 'input-error' : ''}`} value={postDescription} onChange={e => {
                        setPostDescription(e.target.value);
                        handleChange(e);
                        }}/>
                    {validationErrors.postDescription && <div className="error">{validationErrors.postDescription}</div>}
                    <div className="noticetext">Tối thiểu 30 ký tự, tối đa 3000 ký tự</div>
                </div>
            </div>
        </div>
        <div className="divposttwo">
            <div className="titlePostPage">
                Thông tin bất động sản
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Diện tích <span className='spanpost'>*</span>
                </div>
                <div className="inputareapost">
                <input type='number' id='area' className={`inputarea ${validationErrors.area ? 'input-error' : ''}`} value={area} onChange={e => {
                    setArea(e.target.value)
                    handleChange(e);
                    }}/>
                   <div className="donviarea">(m<sup>2</sup>)</div>
                </div>
                {validationErrors.area && <div className="error">{validationErrors.area}</div>}
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Mức giá <span className='spanpost'>*</span>
                </div>
                <div className="inputareapost">
                   <input type='number' id='price' className={`inputarea ${validationErrors.price ? 'input-error' : ''}`} value={price} onChange={e => {
                    setPrice(e.target.value);
                    handleChange(e);
                    }}/>
                   <div className="pricemontbillion">{activePost === 'salepost' ? '(tỷ)' : '(triệu/tháng)'}</div>
                </div>
                {validationErrors.price && <div className="error">{validationErrors.price}</div>}
            </div>
            <div className="toiletandroom">
                <div className="toiletpost">
                    <div className="titletoiletpost">Toilet <span className='spanpost'>*</span></div>
                    <input type="number" id='toilet' className={`inptoilet ${validationErrors.toilet ? 'input-error' : ''}`} value={toilet} onChange={e => {
                        setToilet(e.target.value)
                        handleChange(e);
                        }} />
                    {validationErrors.toilet && <div className="error">{validationErrors.toilet}</div>}
                </div>
                <div className="room">
                    <div className="titletoiletpost" >Phòng ngủ <span className='spanpost'>*</span></div>
                    <input type="number" id='room' className={`inptoilet ${validationErrors.bedroom ? 'input-error' : ''}`} value={bedroom} onChange={e => {
                        setBedroom(e.target.value);
                        handleChange(e);
                        }}/>
                    {validationErrors.bedroom && <div className="error">{validationErrors.bedroom}</div>}
                </div>
            </div>
        </div>
        <div className="divposttwo">
            <div className="titlePostPage">
                Hình ảnh <span className='spanpost'>*</span>
            </div>
            <div className="textnoicepicture">
                <ol>
                <li>Đăng tối thiểu 4 ảnh thường.</li>
                <li>Đăng tối đa 15 ảnh với tất cả các loại tin.</li>
                <li>Hãy dùng ảnh thật, không trùng, không chèn SĐT.</li>
                <li>Đặt tên ảnh ngắn ngọn.</li>
                </ol>
            </div>
            <div className="postpicture">
                <img
                    src={
                        file
                          ? URL.createObjectURL(file[0])
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                    alt="" 
                    className={`picturepostpicture ${validationErrors.file ? 'input-error' : ''}`}
                    />
                    <label htmlFor="file">
                    <DriveFolderUploadOutlinedIcon className="iconpicturepost" />
                    Bấm để chọn ảnh
                        </label>
                        <input
                        type="file"
                        id="file"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                    {validationErrors.file && <div className="error">{validationErrors.file}</div>}
            </div>
        </div>
        <div className="divposttwo">
            <div className="titlePostPage">
                Thông tin liên hệ
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Tên liên hệ <span className='spanpost'>*</span>
                </div>
                <div className="inputareapost">
                <input type='text' id='nameContact' className={`inputarealienhepost ${validationErrors.username ? 'input-error' : ''}`} value={username} onChange={handleCombinedChangeUsername}/>
                </div>
                {validationErrors.username && <div className="error">{validationErrors.username}</div>}
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Số điện thoại <span className='spanpost'>*</span>
                </div>
                <div className="inputareapost">
                <input type='text' id='phoneContact' className={`inputarealienhepost ${validationErrors.phoneNumber ? 'input-error' : ''}`} value={phoneNumber} onChange={handleCombinedChangePhone}/>
                </div>
                {validationErrors.username && <div className="error">{validationErrors.phoneNumber}</div>}
            </div>
            <div className="titlepostpage">
                <div className="titlepost">
                    Email 
                </div>
                <div className="inputareapost">
                <input type='text' id='emailContact' className='inputarealienhepost' value={email} onChange={handleCombinedChangeEmail}/>
                </div>
            </div>
        </div>
        <div className="btnpostpageinp">
            <input type="submit" value="Cập nhật" className='btnpostpage' onClick={handleClickForm}/>
        </div>
    </form>
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default PostChange
