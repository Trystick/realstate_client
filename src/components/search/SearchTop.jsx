import { useEffect, useState } from 'react';
import './searchtop.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchTop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [propertyType, setPropertyType] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [areaRange, setAreaRange] = useState('all');

    const [propertyTypes, setPropertyTypes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await axios.get('https://realstate-api-glm4.onrender.com/api/property-types');
                setPropertyTypes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPropertyTypes();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://realstate-api-glm4.onrender.com/api/search?searchTerm=${searchTerm}&propertyTypeId=${propertyType}&priceRange=${priceRange}&areaRange=${areaRange}`);
            const results = response.data;
            console.log(results);
            // Xử lý kết quả tìm kiếm ở đây
            navigate('/loadsearch', { state: { results } });
        } catch (err) {
            console.error(err);
        }
    };
    

    const handleReset = () => {
        setSearchTerm('');
        setPropertyType('all');
        setPriceRange('all');
        setAreaRange('all');
    };

    return (
        <div className="searchTopBDS">
            <div className='inputsearchimpress'>
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    placeholder="Tìm kiếm..." 
                    className="inpsearchimpress"
                />
                <button onClick={handleSearch} className='btnsearchimpress'>Tìm kiếm</button>
            
                <div className="selectgroup">
                    <div className="selectimpress">
                        <select className="imselectkv" value={propertyType} onChange={e => setPropertyType(e.target.value)}>
                            <option value="all">Tất cả</option>
                            {propertyTypes.map((type, index) => (
                                <option key={index} value={type._id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="selectimpress">
                        <select className="imselectgia" value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option value="all">Tất cả</option>
                            <option value="1-5">1-5 triệu</option>
                            <option value="6-15">6-15 triệu</option>
                            <option value="16-30">16-30 triệu</option>
                            <option value="31-50">31-50 triệu</option>
                            <option value="500-1000">500 triệu-1 tỷ</option>
                            <option value="1000-3000">1 tỷ-3 tỷ</option>
                            <option value="4000+">Trên 4 tỷ</option>
                        </select>
                    </div>
                    <div className="selectimpress">
                        <select className="imselectdt" value={areaRange} onChange={e => setAreaRange(e.target.value)}>
                            <option value="all">Tất cả</option>
                            <option value="0-30">Dưới 30 m2</option>
                            <option value="30-50">30-50 m2</option>
                            <option value="50-80">50-80 m2</option>
                            <option value="80-100">80-100 m2</option>
                            <option value="100+">Trên 100 m2</option>
                        </select>
                    </div>
                    <button onClick={handleReset} className='btnresetimpress'>reset</button>
                </div>
            </div>
        </div>
    );
};

    export default SearchTop
