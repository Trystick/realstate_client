import "./impresslandsale.css"

import useFetch from "../../hooks/useFetch"
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next';
import '../../hooks/i18n';

const ImpressLandSale = () => {
  const { t } = useTranslation();

  const {data, loading, error, reFetch} = useFetch(`http://localhost:8800/api/landSale/landsalethree`)
  console.log(data);

  return (
    <div className="immpessContainer">
      <h1 className='title'> {t('NHÀ BÁN TIÊU BIỂU')}</h1>
      <div className='impresslandsale'>
      {data && data.landsales && data.landsales.map(item => (
        <div className='impressItem' key={item._id}>
          <img src={item.photos[0]} alt='' className='impressImg'/>
          <div className='impressDa'>
            <div className="nameimpress">
              <div className='impressTitle'>{t(item.name)}</div>
            </div>
              <button className='impressBtn'><Link className="linkimpress"  to={`/landsale/${item._id}`}>{t('Chi Tiết')}</Link> </button>
          </div>
        </div>
       ))}
      </div>
      <button className="btnImpress"><Link to="/landsale" className="linkimpress">{t('Tất cả nhà bán')}</Link></button>
    </div>
  )
}

export default ImpressLandSale
