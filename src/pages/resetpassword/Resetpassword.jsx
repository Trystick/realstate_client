import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './resetpassword.css'

const Resetpassword = () => {

    const navigate = useNavigate();

    const [resetPasswordEmail, setResetPasswordEmail] = useState('');

    // This function will handle the password reset request
    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8800/api/auth/reset-password", { email: resetPasswordEmail });
            if (res.status === 200) {
                alert('link đặt lại mật khẩu đã được gửi đến email của bạn.');
                navigate("/login");
            } else if (res.status === 404) {
                alert('Email này chưa được đăng ký.');
            }
        } catch (err) {
            alert('Không thể gửi email !!! Hãy gửi lại');
        }
    }
    

  return (
    <div className='loginContainer'>
        {/* ...existing code... */}
        <form onSubmit={handlePasswordReset}>
            <h2> Quên mật khẩu</h2>
            <label>
                Nhập email xác nhận
                <input type="email" name="resetPasswordEmail" onChange={(e) => setResetPasswordEmail(e.target.value)} required className='inpreset' />
            </label>
            <input type="submit" value="Gửi yêu cầu đặt lại mật khẩu" />
        </form>
    </div>
  )
}

export default Resetpassword
