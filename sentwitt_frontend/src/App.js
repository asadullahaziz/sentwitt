import './App.css';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import User from './Components/User/User.jsx';
import History from './Components/History/History.jsx';
import Result from './Components/Result/Result.jsx';
import ForgotPassword from './Components/ForgotPassword/Forgot.jsx';
import ResetPassword from './Components/ResetPassword/Resetpassword.jsx';
import Search from './Components/textAnalysis/textAnalysis.jsx';
import UploadImage from './Components/UploadImage/uploadimg.jsx';
import ProtectedRoutes from './Components/ProtectedRoutes';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';


function App() {

return (
<Router>
  <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='RegisterPage' element={<Register/>}/>
      {/* <Route element={<ProtectedRoutes/>}> */}
        <Route path='HomePage' element={<Home/>}/>
        <Route path='HistoryPage' element={<History/>}/>   
        <Route path='UserPage' element={<User/>}/>  
        <Route path='ResultPage/:id' element={<Result/>}/>  
        <Route path='ForgotPage' element={<ForgotPassword/>}/>
        <Route path='ResetPasswordPage' element={<ResetPassword/>}/>
        <Route path='SearchPage' element={<Search/>}/>
        <Route path='UploadimgPage' element={<UploadImage/>}/>
      {/* </Route> */}
      <Route path="*" element={<p style={{color: "#F9994C"}}>There's nothing here: 404!</p>} />
  </Routes>
</Router>
);
}

export default App;