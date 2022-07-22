import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Main from "./components/main/main";
import Selection from "./components/selection/selection"
import Imagelibrary from "./components/imagelibrary/imagelibrary"
import Play from "./components/play/play"
import Error from "./components/error";
import {RecoilRoot} from "recoil";

function App() {
  return (
    <div className="App">
     <RecoilRoot>
        <Routes>
           <Route path = "/"  element = {<Main />}/>
           <Route path = "/selection" element = {<Selection/>}/>
           <Route path = "/imagelibrary" element = {<Imagelibrary/>}/>
           <Route path = "/play" element = {<Play/>}/>
           <Route element = {<Error />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
