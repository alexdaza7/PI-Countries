//BASICS
import './App.css';
import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import {setCountries} from './redux/actions';


//REACT-REDUX


//COMPONENTS
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import Cards from './components/cards/Cards';
import Detail from './components/Detail/Detail';
import SideBar from './components/SideBar/SideBar';
import Form from './components/Form/Form';

function App() {

  const { pathname } = useLocation()

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCountries())
  },[])


  const countries = useSelector(state=>state.countries)
  const filteredCountries = useSelector(state=>state.filteredCountries)

  return (
    <div className="App">
      <div>
        {
          pathname !== '/' && <NavBar/>
        }
        <Routes>
          <Route path={'/'} element={<LandingPage/>}/>
          <Route path={'/home'} element={
            <div style={{'display': 'flex'}}>
              <SideBar/>
              <Cards filteredCountries={filteredCountries}/>
            </div>
            }/>
          <Route path={'/detail/:ide'} element={<Detail countries={countries}/>}/>
          <Route path={'/NewActivity'} element={<h1><Form/></h1>}/>
          {/* <Route path={'/createActivity'} element={<NewActivity/>}/> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;