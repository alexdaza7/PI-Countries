//BASICS
import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setCountries} from './redux/actions';

//COMPONENTS
import LandingPage from './components/LandingPage/LandingPage';
import Cards from './components/cards/Cards';
import Detail from './components/Detail/Detail';
import SideBar from './components/SideBar/SideBar';
import Form from './components/Form/Form';

function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setCountries('start'))
  },[])

  return (
    <div className="App">
        <Routes>
          <Route path={'/'} element={<LandingPage/>}/>
          <Route path={'/home'} element={
          <React.Fragment>
            <SideBar className='SideBar'/>
            <Cards className='content'/>
          </React.Fragment>}/>
          <Route path={'/detail/:ide'} element={<Detail/>}/>
        </Routes>
        <Form/>
    </div>
  );
}

export default App;
