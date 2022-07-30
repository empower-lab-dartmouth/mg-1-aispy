import "./play.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Dictaphone from './dictaphoneSetup'
import React, { useEffect, useRef, useLayoutEffect } from "react"; 
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, game, object, oldObject, readtext, lastmodel} from "../../store";
import {AISPY, YOUSPY, COLOR, OBJECT, LEARN, END, YESEND} from "../../models/names";
import {randomnumber} from "../../editor/randomnumber";
import Images from "../../database/images.json";
import { Conversation } from "../../editor/conversation";
import useSpeechToText from 'react-hook-speech-to-text';
import { useNavigate } from "react-router-dom";



function Play(){

    const ariaLabel = { 'aria-label': 'description' };
    const [gamesys, setgamesys] = useRecoilState(game);
    const [selectedimage, setselectedimage] = useRecoilState(currentimage);
    const [obj, setobj] = useRecoilState(object);
    const [oldObj, setoldObj] = useRecoilState(oldObject);
    const [read, setread] = useRecoilState(readtext);
    const [last ,setlast] = useRecoilState(lastmodel);

    const navigate = useNavigate();

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    
   

    const msg = new SpeechSynthesisUtterance();
    msg.text = read;
    const isFirst = useRef(true);
   

    useEffect (() => {
        // only voice out after the read updates
        if(isFirst.current == true){
             isFirst.current = false;
             if(gamesys.model == YOUSPY && gamesys.state == OBJECT){
                if(last.model == YOUSPY && last.state == OBJECT){
                    if(last.color == selectedimage.color){
                    window.speechSynthesis.speak(msg);
                    }
                }
             }
             else if(gamesys.model == AISPY && gamesys.state == COLOR){
                if(last.model == AISPY && last.state == COLOR){
                    window.speechSynthesis.speak(msg);
                }
             }
        }
        else{
            window.speechSynthesis.speak(msg)
        }
    },[read])

    const start = () => {
        startSpeechToText();
    }

    const stop = () => {
        stopSpeechToText();
        let ans = (document.getElementById("inputline") as  HTMLInputElement).value;  

        results.map((result: any, index) => {
         if(result.transcript != "undefined"){
            ans = result.transcript;
        }
        return true;
       });

       (document.getElementById("inputline") as HTMLInputElement).value = ans;
       setResults([]);
       
    }


    const changestate = async() => {
         if(gamesys.state == COLOR){
          
            // guess an object in the current image
            // set a variable to the input color from the user
            let color = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase();
            // var color = "red";
            await setselectedimage({...selectedimage, color: selectedimage.label[randomnumber(0, selectedimage.label.length - 1)][0]}); // need get current image's labels -> get one of the items (color and objects)
            
            await setobj("NA");
            await setoldObj("NA");

            for (var i = 0; i < selectedimage.label.length; i++) {
                if (selectedimage.label[i][0] == color) {
                    var obj = selectedimage.label[i][randomnumber(1,selectedimage.label[i].length - 1)];
                    await setobj(obj); // update current guess
                    await setoldObj(obj); // remember current guess for possible later correction (learning)
                    // setobj(selectedimage.label[i][randomnumber(1,selectedimage.label.length - 1)]); // guess random object of corresponding color
                }
            }
            setgamesys({...gamesys, state:OBJECT});
         }
        else if(gamesys.state == OBJECT){
            var newAns = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase().split(" ");
            var newObj = "NA";
            if(gamesys.model == AISPY){
                // add new object corresponding to guessing color
                // find (document.getElementById("inputline") as  HTMLInputElement).value in labels and set it to the new object
                for(let i =0; i < newAns.length; i++){
                    if(newAns[i] === "yes"){
                        await setgamesys({...gamesys, state:END});
                        (document.getElementById("inputline") as HTMLInputElement).value = "";
                        return;
                    }
                }
                for (let i = 0; i < newAns.length - 1; i++) {
                    if (newAns[i] === "a" || newAns[i] === "an" || newAns[i] === "the" || newAns[i] === "is") { // "it is a/an [object]", "this object is a/an [object]"
                        newObj = newAns[i + 1];
                    }
                    
                }

                // update label: insert newObj into corresponding color
                for (var i = 0; i < selectedimage.label.length; i++) {
                    if (selectedimage.label[i][0] == selectedimage.color) {
                        //selectedimage.label[i].push(newObj);
                        // should find another way to change the images in json file
                    }
                }
                // setoldObj(obj);
                console.log("new!", newObj);
                await setobj(newObj);
                await setgamesys({...gamesys, state:LEARN});
              
            }
            else{
                newObj = newAns[0];
                for (let i = 0; i < newAns.length - 1; i++) {
                    if (newAns[i] === "a" || newAns[i] === "an" || newAns[i] === "the" || newAns[i] === "is") { // "it is a/an [object]", "this object is a/an [object]"
                        newObj = newAns[i + 1];
                    } 
                }
                for(let i = 0; i<selectedimage.label.length; i++){
                    if(selectedimage.label[i][0] == selectedimage.color){
                        for(let j = 1; j<selectedimage.label[i].length; j++){
                           
                             if(newObj == selectedimage.label[i][j]){
                                await setgamesys({...gamesys, state: YESEND});
                                (document.getElementById("inputline") as HTMLInputElement).value = "";
                                return;
                             }
                        }
                    }
                }
                await setgamesys({...gamesys, state:END});
            }
        }
        else if(gamesys.state == LEARN){
            await setgamesys({...gamesys, state:END});
        }
        else if(gamesys.state == END){
            var newAns = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase().split(" ");
            for(let i =0; i < newAns.length; i++){
                if(newAns[i] === "yes" || newAns[i]=== "yeah"){
                    if(gamesys.model == AISPY){
                        await setgamesys({...gamesys, state:COLOR});
                    }
                    else{
                        await setgamesys({...gamesys, state:OBJECT});
                    }
                    (document.getElementById("inputline") as HTMLInputElement).value = "";
                    return 
                }
                else if(newAns[i] === "no" || newAns[i] === "nope"){
                    await setlast({state: gamesys.state, model: gamesys.model, color: selectedimage.color,});
                    navigate("/selection");
                }
            }
        }

        else if(gamesys.state == YESEND){
            var newAns = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase().split(" ");
            for(let i =0; i < newAns.length; i++){
                if(newAns[i] === "yes" || newAns[i]=== "yeah"){
                    let random = randomnumber(0, Images.length-1);
                     await setselectedimage({label: Images[random].label, path: Images[random].path, id: random, color: Images[random].label[randomnumber(0, selectedimage.label.length - 1)][0] });
                     await setgamesys({...gamesys, state:OBJECT});
                    (document.getElementById("inputline") as HTMLInputElement).value = "";
                    return;
                }
                else if(newAns[i] === "no" || newAns[i] === "nope"){
                    await setlast({state: gamesys.state, model: gamesys.model, color: selectedimage.color,});
                    navigate("/selection");
                }
            }
        }    

        (document.getElementById("inputline") as HTMLInputElement).value = "";
        return;
    }


    return (
        <div className = "play">
            <div className = "backbox">
            <Button variant="outlined" onClick = {() => setlast({state: gamesys.state, model: gamesys.model, color: selectedimage.color})  }>
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
           {   gamesys.state != LEARN &&
           <div className = "texts">

           <Input className = "space" id = "inputline" placeholder="Answer" inputProps={ariaLabel} />
       
           <Button  variant="outlined"onClick={isRecording ? stop :  start}>
              {isRecording ? 'Recording' : 'Record'}
           </Button>

           </div>
           }
           <ul>
           {interimResult && <li>{interimResult}</li>}
            </ul>
           <Button variant="outlined" onClick = {() => changestate()} >Confirm</Button>    
        </div>    
    )
};
export default Play;