import './App.css';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import User from './Components/User/User.jsx';
import History from './Components/History/History.jsx';
import Result from './Components/Result/Result.jsx';
import VarifyEmail from './Components/VarifyEmail/VarifyEmail';
import ResetPassword from './Components/ResetPassword/Resetpassword.jsx';
import TextAnalysis from './Components/TextAnalysis/TextAnalysis.jsx';
import UploadImage from './Components/UploadImage/UploadImg.jsx';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Protected from './Components/Protected';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='RegisterPage' element={<Register />} />
        <Route path='VarifyEmailPage/:task' element={<VarifyEmail />} />
        <Route path='ResetPasswordPage' element={<ResetPassword />} />
        <Route element={<Protected />}>
          <Route path='HomePage' element={<Home />} />
          <Route path='HistoryPage' element={<History />} />
          <Route path='UserPage' element={<User />} />
          <Route path='ResultPage/:id' element={<Result />} />
          <Route path='TextAnalysisPage' element={<TextAnalysis />} />
          <Route path='UploadImgPage' element={<UploadImage />} />
        </Route>
        <Route path="*" element={<p style={{ color: "#F9994C" }}>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}

export default App;