import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../components/context/AuthContext'
import './login.css'
import axios from 'axios'
import eye from '../signup/eye.png'
import logologin from '../../components/header/LOGO.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const [rememberUser, setRememberUser] = useState(false);

    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername) {
            setCredentials((prevForm) => ({ ...prevForm, username: rememberedUsername }));
        }
    }, []);
    
    const handleRememberUserChange = (e) => {
        setRememberUser(e.target.checked);
        if (e.target.checked) {
            // Nếu người dùng chọn "Lưu tài khoản", lưu tên đăng nhập vào localStorage
            localStorage.setItem('rememberedUsername', credentials.username);
        } else {
            // Nếu người dùng bỏ chọn "Lưu tài khoản", xóa tên đăng nhập khỏi localStorage
            localStorage.removeItem('rememberedUsername');
        }
    };    

    const handleClick = async e => {
        e.preventDefault();

        if (credentials.username.length <= 5) {
            alert('Tên đăng nhập phải dài hơn 5 ký tự!');
            return;
        }

        // Kiểm tra mật khẩu
        if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(credentials.password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ viết hoa, 1 ký tự đặc biệt và 1 số!');
            return;
        }

        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("http://localhost:8800/api/auth/login", credentials,
            {withCredentials: true})
            console.log(res.data);
            dispatch({type:"LOGIN_SUCCESS", payload: { ...res.data.details, role: res.data.role.name }})
            alert("Đăng nhập thành công")
            if (rememberUser) {
                // Nếu người dùng chọn "Lưu tài khoản", lưu tên đăng nhập vào localStorage
                localStorage.setItem('rememberedUsername', credentials.username);
            }
            navigate('/')
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
            if (err.response.status === 404) {
                alert("Lỗi: Không tìm thấy tài khoản!");
            } else if (err.response.status === 400) {
                alert("Lỗi: Sai mật khẩu hoặc tên đăng nhập!");
            } else {
                alert("Lỗi: Đã xảy ra lỗi không xác định!");
            }
        }
    }
    
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }
    
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credentials.username.length <= 5) {
            alert('Tên đăng nhập phải dài hơn 5 ký tự!');
            return;
        }

        // Kiểm tra mật khẩu
        if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/.test(credentials.password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm 1 chữ viết hoa, 1 ký tự đặc biệt và 1 số!');
            return;
        }

        handleClick(e);
    }

  return (
    <div className='loginpage'>
        <div className='loginContainer'>
         <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Tên đăng nhập
                <input type="text" name="username" id='username' onChange={handleChange}/>
            </label>
            <label>
                Mật khẩu
                <div className="passwordContainer">
                    <input type={showPassword ? "text" : "password"} name="password" id='password' onChange={handleChange}/>
                    <img className="eyeIcon" src={eye} alt="Show Password" onClick={handleShowPassword} />
                </div>
            </label>
            <input type="submit" value="Đăng nhập" onClick={handleClick} />
            <label>
                <a href='/resetpass' className='resetpass'>Quên mật khẩu !!!</a>
            </label>
        </form>
        <p className="loginLink">Bạn chưa có tài khoản? Đăng ký <a href="/signup">tại đây</a>.</p>
        </div>
        <div className="rightlogin">
            <div className="logologin">
                <div className="imglogin">
                    <img src={logologin} alt="" className="imglog" />
                </div>
            </div>
            <div className="textloginw">
                <div className="wellogin">
                    <h2 className='h2textlogin'>Welcome Back My Friend</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
