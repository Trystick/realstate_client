import './resetpass.css'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import eye from '../signup/eye.png'

const Resetpass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {token} = useParams();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const isPasswordValid = (password) => {
        // Kiểm tra xem mật khẩu có ít nhất 8 kí tự, có một chữ cái viết hoa, một số và một kí tự đặc biệt
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }

   
    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid(password)) {
            alert('Mật khẩu phải có ít nhất 8 kí tự, bao gồm ít nhất một chữ cái viết hoa, một số và một kí tự đặc biệt.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        try {
            // Replace this URL with the endpoint for your password reset API
            // You'll also need to include the password reset token in the URL or body
            const res = await axios.post(`http://localhost:8800/api/auth/reset-password/${token}`, { password });
            if (res.status === 200) {
                alert('Mật khẩu của bạn đã được đặt lại thành công.');
            }
        } catch (err) {
            alert('Không thể đặt lại mật khẩu. Hãy thử lại.');
        }
    }

    console.log(handlePasswordResetSubmit);

    return (
        <div className='loginContainer'>
            <h2>Đặt lại mật khẩu</h2>
            <form onSubmit={handlePasswordResetSubmit}>
                <label>
                    Mật khẩu mới
                    <div className="passwordContainer">
                        <input type={showPassword ? "text" : "password"} name="password" onChange={(e) => setPassword(e.target.value)} required />
                        <img className="eyeIcon" src={eye} alt="Show Password" onClick={handleShowPassword} />
                    </div>
                </label>
                <label>
                    Xác nhận mật khẩu mới
                    <div className="passwordContainer">
                        <input type={showPassword ? "text" : "password"} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <img className="eyeIcon" src={eye} alt="Show Password" onClick={handleShowPassword} />
                    </div>
                </label>
                <input type="submit" value="Đặt lại mật khẩu" />
            </form>
        </div>
    )
}

export default Resetpass
