import "./play.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Dictaphone from './dictaphoneSetup'
import React, { useEffect, useRef } from "react"; 
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, game, object, colorObject, oldObject, readtext} from "../../store";
import {AISPY, YOUSPY, COLOR, OBJECT, LEARN, END} from "../../models/names";
import {randomnumber} from "../../editor/randomnumber";
import Images from "../../database/images.json";
import { Conversation } from "../../editor/conversation";




function Play(){

    const ariaLabel = { 'aria-label': 'description' };
    const [gamesys, setgamesys] = useRecoilState(game);
    const [selectedimage, setselectedimage] = useRecoilState(currentimage);
    const [obj, setobj] = useRecoilState(object);
    const [colorObj, setcolorObj] = useRecoilState(colorObject);
    const [oldObj, setoldObj] = useRecoilState(oldObject);
    const [read, setread] = useRecoilState(readtext);

    const isFirst = useRef(true);
 
    const msg = new SpeechSynthesisUtterance();
    msg.text = read;
   


    useEffect (() => {
        if(gamesys.model == YOUSPY){
            let random = randomnumber(0, Images.length-1);
            setselectedimage({label: Images[random].label, path: Images[random].path, id: random});
        }
    },[])

    useEffect (() => {
        if(isFirst.current){
            isFirst.current = false;
        }
        else{
        window.speechSynthesis.speak(msg)
        }
    },[read])


    const changestate = async() => {
         if(gamesys.state == COLOR){
            setgamesys({...gamesys, state:OBJECT});
            // guess an object in the current image
            var color = "red"; // need get user selected color
            setcolorObj(selectedimage.label[randomnumber(0, selectedimage.label.length - 1)][0]); // need get current image's labels -> get one of the items (color and objects)
            for (var i = 0; i < selectedimage.label.length; i++) {
                if (selectedimage.label[i][0] == color) {
                    setobj(selectedimage.label[i][randomnumber(1,selectedimage.label.length - 1)]); // guess random object of corresponding color
                }
            }
         }
        else if(gamesys.state == OBJECT){
            if(gamesys.model == AISPY){
                setgamesys({...gamesys, state:LEARN});
                // add new object corresponding to guessing color
                var newObj = "app"; // need get user object

                // update label: insert newObj into corresponding color
                setoldObj(obj);
                setobj(newObj);
              
            }
            else{
                setgamesys({...gamesys, state:END});
            }
        }
        else if(gamesys.state == LEARN){
            setgamesys({...gamesys, state:END});
        }
        else if(gamesys.state == END){
            if(gamesys.model == AISPY){
                setgamesys({...gamesys, state:COLOR});
            }
            else{
                setgamesys({...gamesys, state:OBJECT});
            }
        }
    }


    return (
        <div className = "play">
            <div className = "backbox">
            <Button variant="outlined" onClick = {() =>   isFirst.current = true}>
               <Link to = "/selection"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Back
                </Link>
            </Button>
            </div>
           <img src = {"../assets/images/"+selectedimage.path} height = "200px" width = "200px"/>
           <div className = "texts">
                {Conversation()}
               <Button variant="outlined" onClick = {() =>  window.speechSynthesis.speak(msg)}>Replay</Button>
           </div>
           <div className = "texts">
           <Input className = "space" placeholder="Answer" inputProps={ariaLabel} />
           <div className = "recordbox">
           <Dictaphone />     
           </div>
           </div>
           <Button variant="outlined" onClick = {() => changestate()} >Confirm</Button>    
        </div>    
    )
};
export default Play;