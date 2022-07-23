import "./play.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Dictaphone from './dictaphoneSetup.js'


function Play(){

    const ariaLabel = { 'aria-label': 'description' };

    return (
        <div className = "play">
           <img src = "../assets/image.png"/>
           <div className = "texts">
               <p className = "space">Guess what I am spying!</p>
               <Button variant="outlined">Replay</Button>
           </div>
           <div className = "texts">
           {/* <Input className = "space" placeholder="Answer" inputProps={ariaLabel} />
           <Button variant="outlined">Record</Button>    */}
           <Dictaphone />        

           </div>
        </div>    
    )
};
export default Play;