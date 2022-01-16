import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Failure from './components/failure';
import Step1 from './components/step1';
import Step2 from './components/step2';
import Step3 from './components/step3';
import Success from './components/success';
import { UserProvider} from './context';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserProvider><Step1 /></UserProvider>} />
      <Route path="step2" element={<UserProvider><Step2 /></UserProvider>} />
      <Route path="step3" element={<UserProvider><Step3 /></UserProvider>} />
      <Route path="success" element={<Success />} />
      <Route path="failure" element={<Failure />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
