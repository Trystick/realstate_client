import "./impresslandlease.css"

import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const ImpressLandLease = () => {
  const { t } = useTranslation();

  const {data, loading, error, reFetch} = useFetch(`https://realstate-api-glm4.onrender.com/api/landLease/landleasethree`)
  console.log(data);

  return (
    <div className="immpessContainer">
      <h1 className='title'> {t('NHÀ THUÊ TIÊU BIỂU')}</h1>
      <div className='impresslandlease'>
      {data && data.landleases && data.landleases.map(item => (
        <div className='impressItem' key={item._id}>
          <img src={item.photos[0]} alt='' className='impressImg'/>
          <div className='impressDa'>
            <div className="nameimpress">
              <div className='impressTitle'>{t(item.name)}</div>
            </div>
              <button className='impressBtn'><Link className="linkimpress"  to={`/landlease/${item._id}`}>{t('Chi Tiết')}</Link> </button>
          </div>
        </div>
       ))}
      </div>
      <button className="btnImpress"><Link to="/landlease" className="linkimpress">{t('Tất cả nhà thuê')}</Link></button>
    </div>
  )
}

export default ImpressLandLease
