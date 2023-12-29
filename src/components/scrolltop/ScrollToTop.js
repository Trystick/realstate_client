import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './scrollToTop.css';

function ScrollToTop() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={handleClick} className="scroll-to-top">
      <FontAwesomeIcon icon={faArrowAltCircleUp} className="iconscroll"/>
    </button>
  );
}

export default ScrollToTop;
