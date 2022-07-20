import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Main from "./components/main/main";
import Error from "./components/error";
import {RecoilRoot} from "recoil";

function App() {
  return (
    <div className="App">
     <RecoilRoot>
        <Routes>
           <Route path = "/"  element = {<Main />}/>
           <Route element = {<Error />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
