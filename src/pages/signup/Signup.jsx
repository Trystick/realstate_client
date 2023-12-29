import './signup.css'
import { useContext, useState } from 'react';
import eye from '../signup/eye.png'
import axios from 'axios'
import { AuthContext } from '../../components/context/AuthContext'
import {useNavigate} from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Logosn from '../../components/header/LOGO.png'
function Signup() {
    const [file, setFile] = useState("");
    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const checkUsernameExists = async (username) => {
        try {
            const res = await axios.get(`https://realstate-api-glm4.onrender.com/api/checkexist?username=${username}`);
            return res.data.exists;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    const checkPhoneNumberExists = async (phoneNumber) => {
        try {
            const res = await axios.get(`https://realstate-api-glm4.onrender.com/api/checkexist?phoneNumber=${phoneNumber}`);
            return res.data.exists;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    
    const checkEmailExists = async (email) => {
        try {
            const res = await axios.get(`https://realstate-api-glm4.onrender.com/api/checkexist?email=${email}`);
            return res.data.exists;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
    

    const handleClick = async e => {
        e.preventDefault();
    
        // Kiểm tra tên đăng nhập
        if (form.username.length <= 5) {
            alert('Tên đăng nhập phải dài hơn 5 ký tự!');
            return;
        }
    
        // Kiểm tra tên đăng nhập đã tồn tại
        const usernameExists = await checkUsernameExists(form.username);
        if (usernameExists) {
            alert('Tên đăng nhập đã tồn tại!');
            return;
        }
    
        // Kiểm tra số điện thoại
        if (!/^\d{10,}$/.test(form.phoneNumber)) {
            alert('Số điện thoại phải có ít nhất 10 số!');
            return;
        }
    
        // Kiểm tra số điện thoại đã tồn tại
        const phoneNumberExists = await checkPhoneNumberExists(form.phoneNumber);
        if (phoneNumberExists) {
            alert('Số điện thoại đã tồn tại!');
            return;
        }
    
        // Kiểm tra email
        if (!/^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/.test(form.email)) {
            alert('Email không hợp lệ!');
            return;
        }
    
        // Kiểm tra email đã tồn tại
        const emailExists = await checkEmailExists(form.email);
        if (emailExists) {
            alert('Email đã tồn tại!');
            return;
        }
    
        // Kiểm tra mật khẩu
        if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(form.password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ viết hoa, 1 ký tự đặc biệt và 1 số!');
            return;
        }
    
        if (form.password !== form.confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
    
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("https://realstate-api-glm4.onrender.com/api/auth/register", form)
            dispatch({type:"LOGIN_SUCCESS", payload: { ...res.data.details, role: res.data.role }})
            alert("Đăng ký thành công")
            navigate('/login')
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }
    
    

    const handleChange = async (e) => {
        // Cập nhật trạng thái ngay lập tức khi sự kiện thay đổi xảy ra
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dw1rf0o5f/image/upload", data);
            const {url} = uploadRes.data;
            // Cập nhật URL hình ảnh sau khi yêu cầu POST thành công
            setForm(prevForm => ({
                ...prevForm,
                img: url
            }));
        } catch {
            // Xử lý lỗi tại đây
        }
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleClick(e);
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    console.log(form.username);
    return (
        <div className="register">
            <div className="registerForm">
                <h2>Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="" className='pictureavatar'
                    />
                    <label htmlFor="file">
                        Ảnh đại diện  <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                    <label>
                        Tên đăng nhập
                        <input type="text" name="username" id='username' onChange={handleChange}/>
                    </label>
                    <label>
                        Số Điện Thoại
                        <input type="text" name="phoneNumber" onChange={handleChange}/>
                    </label>
                    <label>
                        Email
                        <input type="text" name="email" onChange={handleChange}/>
                    </label>
                    <label>
                        Mật khẩu
                        <div className="passwordContainer">
                            <input type={showPassword ? "text" : "password"} name="password" id='password' onChange={handleChange}/>
                            <img className="eyeIcon" src={eye} alt="Show Password" onClick={handleShowPassword} />
                        </div>
                    </label>
                    <label>
                    Xác nhận mật khẩu
                    <div className="passwordContainer">
                            <input type={showPassword ? "text" : "password"} name="confirmPassword" onChange={handleChange}/>
                            <img className="eyeIcon" src={eye} alt="Show Password" onClick={handleShowPassword} />
                    </div>
                    </label>
                    <input type="submit" value="Đăng ký" onClick={handleClick} />
                </form>
                <p className="loginLink">Bạn đã có tài khoản? Đăng nhập <a href="/login">tại đây</a>.</p>
            </div>
            <div className="rightlogo">
                <div className="logowww">
                    <img src={Logosn} alt="" className="imglogosn" />
                </div>
                <div className="welcomewww">
                    <div className="textwelcome">
                        welcome to goldenland
                    </div>
                </div>
            </div>
        </div>
        
    );
}
export default Signup
