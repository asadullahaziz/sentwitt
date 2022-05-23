import Register from './Components/Register/Register.jsx';
import './App.css';
import Login from './Components/Login/Login.jsx';
import Home from './Components/Home/Home.jsx';
import User from './Components/User/User.jsx';
import History from './Components/History/History.jsx';
import Result from './Components/Result/Result.jsx';
import {BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

function App() {

return (
<Router>
  <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='RegisterPage' element={<Register/>}/>
      <Route path='HomePage' element={<Home/>}/>
      <Route path='HistoryPage' element={<History/>}/>   
      <Route path='UserPage' element={<User/>}/>  
      <Route path='ResultPage' element={<Result/>}/>  
  </Routes>
</Router>
);
}

export default App;