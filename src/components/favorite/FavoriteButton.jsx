import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./favoritebutton.css"

function FavoriteButton({ userId, landsaleId, landleaseId }) {
  const [isFavorited, setFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/favorite/checkfavorite/check",
          {
            params: { userId, landsaleId, landleaseId },
          }
        );
        setFavorited(response.data.isFavorited);
      } catch (error) {
        console.error(error);
      }
    };

    checkFavoriteStatus();
  }, [userId, landsaleId, landleaseId]);

  const handleFavorite = async (event) => {
    event.preventDefault(); // Ngăn chặn sự kiện click lan truyền lên các phần tử cha

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!userId) {
      window.alert('Vui lòng đăng nhập để thêm vào yêu thích!');
      return;
    }
    const newFavoritedStatus = !isFavorited;
  
    if (newFavoritedStatus) {
      await axios.post('http://localhost:8800/api/favorite', { userId, landsaleId, landleaseId});
      setFavorited(newFavoritedStatus);
      window.alert('Đã thêm vào yêu thích!');
    } else {
      await axios.delete('http://localhost:8800/api/favorite/favorites', { data: { userId, landsaleId, landleaseId } });
      setFavorited(newFavoritedStatus);
      window.alert('Đã xóa khỏi yêu thích!');
      window.location.reload();
    }
  };

  return (
    <div className={`favorite-button ${isFavorited ? 'favorited' : ''}`} onClick={handleFavorite}>
      <FontAwesomeIcon icon={faHeart} className="favorite-icon" />
    </div>
  );
}

export default FavoriteButton;
