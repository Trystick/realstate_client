import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from './pages/home/Home';
import Estate from './pages/estate/Estate';
import ListEstate from './pages/listEstate/ListEstate';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Gioithieuchung from './pages/present/presentpage/gioithieuchung/Gioithieuchung';
import Contact from './pages/contact/Contact';
import Content from './pages/content/Content';
import Job from './pages/content/job/Job';
import Formungtuyen from './pages/content/formungtuyen/Formungtuyen';
import Login from './pages/login/Login';
import New from './pages/new/duan/New';
import NewGolden from './pages/new/goldenland/NewGolden';
import NewTT from './pages/new/thitruong/NewTT';
import NewDetail from './pages/new/NewDetail';
import Signup from './pages/signup/Signup';
import Resetpassword from './pages/resetpassword/Resetpassword';
import Resetpass from './pages/resetpassword/Resetpass';
import Profile from './pages/profile/Profile';
import Packet from './pages/packet/Packet';
import Pay from './pages/pay/Pay';
import LandSale from './pages/landsale/LandSale';
import LandLease from './pages/landlease/LandLease';
import ListEstateCategory from './pages/listestatecategory/ListEstateCategory'
import LandSalePage from './pages/landsalepage/LandSalePage'
import CategoryLandSale from './pages/categorylandsale/CategoryLandSale';
import CategoryLandLease from './pages/categorylandlease/CategoryLandLease';
import LandLeasePage from './pages/landleasepage/LandLeasePage';
import Favorite from './pages/favorite/Favorite';
import PostPage from './pages/postpage/PostPage';
import History from './pages/history/History';
import PostChange from './pages/postchange/PostChange';
import Success from './pages/pay/success/Success';
import PayHistory from './pages/payhistory/PayHistory';
import LoadSearch from './pages/loadsearch/LoadSearch';
import CancelPacket from './pages/cancelpacket/CancelPacket';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/contact' element = {<Contact/>}/>
        <Route path='/listEstate' element = {<ListEstate/>}/>
        <Route path='/listEstate/:estateId' element = {<Estate/>}/>
        <Route path='/listEstate/categoryEstate/:categoryEstateId' element = {<ListEstateCategory/>}/>
        <Route path='/:estateId' element = {<Estate/>}/>
        {/* <Route path='/estate' element = {<List/>}/> */}
        <Route path="/estate/:estateId" element = {<Estate/>}/>
        <Route path='/present/Gioithieuchung' element={<Gioithieuchung/>}/>
        <Route path='/content' element = {<Content/>}/>
        <Route path="/job/:jobId" element = {<Job/>}/>
        <Route path="/formungtuyen" element = {<Formungtuyen/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path='/new' element = {<New/>}/>
        <Route path='/newgolden' element = {<NewGolden/>}/>
        <Route path='/newtt' element = {<NewTT/>}/>
        <Route path='/newdetail/:postId' element = {<NewDetail/>}/>
        <Route path='/resetpass' element = {<Resetpassword/>}/>
        <Route path='/reset/:token' element = {<Resetpass/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        <Route path='/packet' element = {<Packet/>}/>
        <Route path='/pay/:payid' element = {<Pay/>}/>
        <Route path='/landsale' element={<LandSale/>}/>
        <Route path='/landsale/:landsaleId' element={<LandSalePage/>}/>
        <Route path='/landsale/landsalecategory/:categorylandsaleId' element={<CategoryLandSale/>}/>
        <Route path='/landlease' element={<LandLease/>}/>
        <Route path='/landlease/:landleaseId' element={<LandLeasePage/>}/>
        <Route path='/landlease/landleasecategory/:categorylandleaseId' element={<CategoryLandLease/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/postpage' element={<PostPage/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/postchange/:postchange' element={<PostChange/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/payhistory' element={<PayHistory/>}/>
        <Route path='/loadsearch' element={<LoadSearch/>}/>
        <Route path='/cancelpacket/:orderId' element={<CancelPacket/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
