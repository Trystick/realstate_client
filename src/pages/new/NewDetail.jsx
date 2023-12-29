import './newdetail.css'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { faCalendar, faHouse, faReply, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useParams } from 'react-router-dom'
import imgnewdetail from "../listEstate/img/h1.jpg"
import useFetch from '../../hooks/useFetch'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import ScrollToTop from '../../components/scrolltop/ScrollToTop'
import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';
import { AuthContext } from '../../components/context/AuthContext'

const NewDetail = () => {
  const {postId} = useParams();
  const { user, dispatch } = useContext(AuthContext);
  const [likeId, setLikeId] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [datare, setDataRe] = useState(null);

  useEffect(() => {
    if (!user || !user._id) {
      console.error('User is not logged in');
      return;
    }
  
    fetch(`https://realstate-api-glm4.onrender.com/api/like/check/${user._id}/${postId}`)
      .then(response => response.json())
      .then(data => setHasLiked(data.hasLiked));
  }, [user, postId]);
  
  const handleLike = async () => {
    if (!user || !user._id) {
      console.error('User is not logged in');
      return;
    }
  
    const url = hasLiked ? `https://realstate-api-glm4.onrender.com/api/like/${localStorage.likeId}` : 'https://realstate-api-glm4.onrender.com/api/like';
    const method = hasLiked ? 'DELETE' : 'POST';
    const userId = user._id;
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, postId })
    };
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error('Error liking/unliking post');
      }
      const data = await response.json();
      setDataRe(data);
      if (method === 'POST') {
        setLikeId(data.like);
        localStorage.setItem('likeId', data.like); // Lưu likeId vào localStorage
      } else {
        localStorage.removeItem('likeId'); // Xóa likeId khỏi localStorage khi unlike
      }
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error(error);
    }
};


  const [comment, setComment] = useState('');
  
  const handleCommentChange = (event) => {
    if (!user) {
      alert('Vui lòng đăng nhập để bình luận');
      return;
    }
    setComment(event.target.value);
  };
  
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState('');
  const [replyingCommentId, setReplyingCommentId] = useState(null);

  const handleReplyChange = (event) => {
      setReply(event.target.value);
  };

  const handleReplyClick = (commentId) => {
    if (replyingCommentId === commentId) {
      setReplyingCommentId(null); 
    } else {
      setReplyingCommentId(commentId);
    }
  };

  const { t } = useTranslation();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const {data,loading, error} = useFetch(`https://realstate-api-glm4.onrender.com/api/post/find/${postId}`);

  const ArrayData = [data];
 
  const [datanew, setDataNew] = useState([]);

  useEffect(() => {
      axios.get('https://realstate-api-glm4.onrender.com/api/post/randomposts')
        .then(response => setDataNew(response.data))
        .catch(error => console.error(error));
    }, []);
  
    const handleCommentSubmit = async () => {
      if (!user) {
        alert('Vui lòng đăng nhập để bình luận');
        return;
      }
      try {
        const response = await axios.post('https://realstate-api-glm4.onrender.com/api/comment', {
          userId: user._id,
          postId,
          content: comment,
          isApproved: false,  // bình luận mới chưa được kiểm duyệt
        });
    
        if (response.status === 201) {
          alert('Bình luận của bạn đã được gửi và đang chờ kiểm duyệt');
          setComment('');
          window.location.reload();
        }
      } catch (error) {
        console.error('Error creating comment', error);
        alert('Có lỗi xảy ra khi đăng bình luận');
      }
    };
    

    const [comments, setComments] = useState([]);
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await axios.get(`https://realstate-api-glm4.onrender.com/api/comment/postId/${postId}`);
    
          if (response.status === 200) {
            const commentData = response.data;
            const approvedComments = commentData.filter(comment => comment.isApproved);
            const commentsWithUser = await Promise.all(approvedComments.map(async (comment) => {
              const userResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/users/${comment.userId}`);
              let repliesWithUser = [];
              if (comment.replies && comment.replies.length > 0) {
                const approvedReplies = comment.replies.filter(reply => reply.isApproved);
                repliesWithUser = await Promise.all(approvedReplies.map(async (reply) => {
                  const replyUserResponse = await axios.get(`https://realstate-api-glm4.onrender.com/api/users/${reply.userId}`);
                  return { ...reply, user: replyUserResponse.data };
                }));
              }
              return { ...comment, user: userResponse.data, replies: repliesWithUser };
            }));
          
            setComments(commentsWithUser);
          }
          
        } catch (error) {
          console.error('Error fetching comments', error);
        }
      };
    
      fetchComments();
    }, [postId]);
    
    const handleReplySubmit = async (commentId) => {
      console.log(commentId);
      if (!user) {
        alert('Vui lòng đăng nhập để trả lời');
        return;
      }
  
      try {
        const response = await axios.post(`https://realstate-api-glm4.onrender.com/api/comment/${commentId}/replies`, {
          userId: user._id,
          content: reply,
          isApproved: false,
        });
  
        if (response.status === 201) {
          alert('Trả lời của bạn  đã được gửi và đang chờ kiểm duyệt');
          setReply('');
          setIsReplying(false);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error creating reply', error);
      }
    };



  return (
    <div>
      <Header/>
      <div className="newdetailContainer">
        <img src={imgnewdetail} alt="" className="imgdetailnew"/>
        <div className='homepage'>
        <Link to="/"><FontAwesomeIcon icon={faHouse} className="iconhome"/></Link>
            <span>&gt;</span>
            <p ><Link to="/newtt" className='linknewdetail'>{t('Tin tức')}</Link></p>
            <span>&gt;</span>
            <p>{t('Chi tiết tin tức')}</p>
        </div>
        {loading ? (
  "Loading...."
) : (
  <>
    {ArrayData && ArrayData.length > 0 ? (
      ArrayData.map(item => (
        <div className="contentnewdetail" key={item._id}>
          <div className="timecreate">
            <FontAwesomeIcon icon={faCalendar} className="iconcalender"/>
            <div className="timenewdate">{formatDate(item.createdAt)}</div>
          </div>
          <h4 className="titlenewdetail">{t(item.name)}</h4>
          <div className="textdescnewdetailfirst"><Link to="/newtt" className='linknewdetail'>{t(item.title)}</Link></div>
          {item.photos && item.photos.length > 0 && (
            <>
              <img
                src={item.photos[0]}
                alt=""
                className="imgcontentnewdetail"
              />
              <div className="minhhoa">{t('hình minh họa')}</div>
            </>
          )}
           <div className="textdescnewdetailsecond">{t(item.descone)}</div>
          {item.photos && item.photos.length > 1 && (
            <>
              <img
                src={item.photos[1]}
                alt=""
                className="imgcontentnewdetail"
              />
               <div className="minhhoa">{t('hình minh họa')}</div>
            </>
          )}
          <div className="textdescnewdetailsecond">{t(item.desctwo)}</div>
          {item.photos && item.photos.length > 2 && (
            <>
              <img
                src={item.photos[2]}
                alt=""
                className="imgcontentnewdetail"
              />
              <div className="minhhoa">{t('hình minh họa')}</div>
            </>
          )}
          <div className="textdescnewdetailsecond">{t(item.descthree)}</div>
           {item.photos && item.photos.length > 3 && (
            <>
              <img
                src={item.photos[3]}
                alt=""
                className="imgcontentnewdetail"
              />
             <div className="minhhoa">{t('hình minh họa')}</div>
            </>
          )}
           <div className="textdescnewdetailsecond">{t(item.descfour)}</div>
           {item.photos && item.photos.length > 4 && (
            <>
              <img
                src={item.photos[4]}
                alt=""
                className="imgcontentnewdetail"
              />
              <div className="minhhoa">{t('hình minh họa')}</div>
            </>
          )}
          <div className="textdescnewdetailsecond">{t(item.descfive)}</div>
        </div>
      ))
    ) : (
      <p>{t('Không có dữ liệu')}</p>
    )}
  </>
)}
    <div className="titleother">{t('TIN TỨC KHÁC')}</div>
        <div className="other">
          {loading ? "loading" : <>
            {datanew.map(item => (<Link to={`/newdetail/${item._id}`} className="linknewdetail">
            <div className="newother">
              <div className="itemneworder">
                <img src={item.photos[0]} alt="" className="imgnewother" />
                <div className="namenewother">{t(item.name)}</div>
              </div>
            </div>
            </Link>
            ))}</>}
        </div>
        <div className="likepost">
          <div className="likediv" onClick={handleLike}>
          <FontAwesomeIcon icon={faThumbsUp} className={`iconlikepost ${hasLiked ? 'liked' : ''}`}/>
            <div className="titlelikepost">
                Like bài viết
            </div>
          </div>
        </div>
        <div className="commentdiv" >
          <div className="inpcomment">
            <div className="inpcommentuser">
              <textarea type="text" className="inputcomment" onChange={handleCommentChange}/>
              <button className="btnsendcomment" onClick={handleCommentSubmit}>
                Bình luận
              </button>
            </div>
          </div>
          <div className="thanhngang"></div>
          <div className="titlecommentpost">Bình luận bài viết</div>
          {comments.map((commentload) => (
          <div className="divanycomment" key={commentload._id}>    
              <div className="formreplycomment">
                <div className="usercommentform" >
                  <div className="imgussercomment">
                    <img src={commentload.user.img} alt="" className="imgcommentuser" />
                  </div>
                  <div className="tableinfousercomment">
                    <div className="nameusercomment">
                    {commentload.user.username}
                    </div>
                    <div className="commentbyusser">
                    {commentload.content}
                    </div>
                  </div>
                </div>
                <div className="replycomment">
                    <div className="replydiv" onClick={() => handleReplyClick(commentload._id)}>
                      <FontAwesomeIcon icon={faReply} className='iconreplycomment'/> Trả lời
                    </div>
                    {replyingCommentId === commentload._id && (
                        <div className="replycommentbycomment">
                            <textarea value={reply} onChange={handleReplyChange} className='replycommentreply'/>
                            <button className="btnsendreplycommentreply" onClick={() => {
                                handleReplySubmit(commentload._id);
                                setReplyingCommentId(null);
                              }}>
                              Gửi
                            </button>
                        </div>
                    )}
                </div>
              </div>
              {commentload.replies && commentload.replies.length > 0 && commentload.replies.map((replymap) => (
              <div className="formreplycomment" key={replymap._id}>
                <div className="usercommentformreply">
                  <div className="imgussercomment">
                    <img src={replymap.user.img} alt="" className="imgcommentuser" />
                  </div>
                  <div className="tableinfousercomment">
                    <div className="nameusercomment">
                      {replymap.user.username}
                    </div>
                    <div className="commentbyusser">
                      {replymap.content}
                    </div>
                  </div>
                </div>
              </div>
              ))}
          </div>
           ))}
        </div>
      </div>
      <ScrollToTop/>
      <Footer/>
    </div>
  )
}

export default NewDetail
