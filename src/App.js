import React, { useContext, useState, useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Home from './pages/home/Home';
import Profile from './pages/Profile/Profile';
import DummyHome from './pages/DummyHome/dummy';

import "./App.css";

import ReactSwitch from "react-switch";
import { ThemeContext } from '@emotion/react';
import Login from './pages/login/Login';
import Register from './pages/register/register';
import { AuthContext } from './context/AuthContext';

function App() {

    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
      })
    
      const detectSize = () => {
        detectHW({
          winWidth: window.innerWidth,
        })
      }
    
      useEffect(() => {
        window.addEventListener('resize', detectSize)
    
        return () => {
          window.removeEventListener('resize', detectSize)
        }
      }, [windowDimenion])

    const {user} = useContext(AuthContext)
    
    const [theme,setTheme] = useState("dark");

    const toggleTheme = () => {
         setTheme((curr) => (curr === "light" ? "dark" : "light"))
        };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
        <div className={windowDimenion.winWidth>1150?'app':'phone'} id={theme}>
            <div className="blur" style={{top:"-10%",right:"0"}}></div>
            <div className="blur" style={{top:"36%",left:"-8rem"}}></div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={user ? <Home /> : <DummyHome/>} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/login" element={user? <Navigate replace to="/"/> : < Login/>} />
                    <Route path="/register" element={user? <Navigate replace to="/"/> :< Register/>} />
                </Routes>
            </BrowserRouter>
            <div className={windowDimenion.winWidth > 1150 ?'switch' : 'phneswitch'}>
            {windowDimenion.winWidth>1150 && <div>Dark Mode</div>}
                <div>
                    <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
                </div>
            </div>
        </div>
        </ThemeContext.Provider>
     );
}

export default App;