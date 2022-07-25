import "./play.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Dictaphone from './dictaphoneSetup.js'
import React, { useEffect } from "react"; 
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, gamemodel, gamestate, object, colorObject} from "../../store";
import {AISPY, YOUSPY, COLOR, OBJECT, LEARN, END} from "../../models/names";
import {randomnumber} from "../../editor/randomnumber";
import Images from "../../database/images.json";




function Play(){

    const ariaLabel = { 'aria-label': 'description' };
    const [model, setmodel] = useRecoilState(gamemodel);
    const [state, setstate] = useRecoilState(gamestate);
    const [selectedimage, setselectedimage] = useRecoilState(currentimage);
    const [obj, setobj] = useRecoilState(object);
    const [colorObj, setcolorObj] = useRecoilState(colorObject);
 


    useEffect (() => {
        if(model == YOUSPY){
            setstate(OBJECT);
            let random = randomnumber(0, Images.length-1);
            setselectedimage({label: Images[random].label, path: Images[random].path, id: random});
        }
        else{
        setstate(COLOR);
        }
    },[])


    const changestate = () => {
         if(state == COLOR){
            setstate(OBJECT);
            // guess an object in the current image
            var color = "red"; // need get user selected color
            setcolorObj(selectedimage.label[randomnumber(0, selectedimage.label.length - 1)][0]); // need get current image's labels -> get one of the items (color and objects)
            for (var i = 0; i < selectedimage.label.length; i++) {
                if (selectedimage.label[i][0] == color) {
                    setobj(selectedimage.label[i][randomnumber(1,selectedimage.label.length - 1)]); // guess random object of corresponding color
                }
            }
         }
        else if(state == OBJECT){
            if(model == AISPY){
                setstate(LEARN);
                // add new object corresponding to guessing color
                var newObj = "apple"; // need get user object
                var color = "red"; // need user selected color
                // update label: insert newObj into corresponding color
            }
            else{
                setstate(END);
            }
        }
        else if(state == END){
            if(model == AISPY){
                setstate(COLOR);
            }
            else{
                setstate(OBJECT);
            }
        }

    }


    return (
        <div className = "play">
           <img src = {"../assets/images/"+selectedimage.path} height = "200px" width = "200px"/>
           <div className = "texts">
            {
                state == COLOR && model == AISPY &&
               <p className = "space">Tell me a color to spy!</p>
            }
            {
                state == OBJECT && model == AISPY &&
                <p className = "space">I think it is: { obj }</p>
            }
            {
                state == OBJECT && model == YOUSPY &&
                <p className = "space">Can you spy the object in { colorObj }?</p>
            }
            {
                state == LEARN && model == AISPY &&
                <p className = "space">I got it! It is not an apple! It is a banana!</p>
            }
            {
                state == END && model == AISPY &&
                <p className = "space">Do you want to spy another term?</p>
            }
             {
                state == END && model == YOUSPY &&
                <p className = "space">No you are wrong! Do you want to give another try?</p>
             }
               <Button variant="outlined">Replay</Button>
           </div>
           <div className = "texts">
           <Input className = "space" placeholder="Answer" inputProps={ariaLabel} />
           <Button variant="outlined" onClick = {() => changestate()} >Confirm</Button>    
           <Dictaphone />        

           </div>
        </div>    
    )
};
export default Play;