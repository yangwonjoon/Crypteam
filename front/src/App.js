/*eslint-disable*/

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import VirtualInvesting from './components/Pages/VirtualInvesting.js';
import AutoTrading from './components/Pages/AutoTrading.js';
import BackTesting from './components/Pages/BackTesting.js';
import CoinNews from './components/Pages/CoinNews.js';
import CreateModel from './components/Pages/CreateModel.js';
import Notice from './components/Pages/Notice.js';

import Main from './components/Main.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import Navibar from './components/Navibar.js';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <div>
    <Navibar/>
    


    </div>
    <div>
    <Routes>
        <Route path="/main" element={<Main/>}/>
        <Route path="/createmodel" element={<CreateModel/>}/>
        <Route path="/backtesting" element={<BackTesting/>}/>
        <Route path="/virtualinvest" element={<VirtualInvesting/>}/>
        <Route path="/autotrading" element={<AutoTrading/>}/>
        <Route path="/coinnews" element={<CoinNews/>}/>
        <Route path="/notice" element={<Notice/>}/>

        <Route path="/Login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </div>

    </>
  );
}

export default App;
