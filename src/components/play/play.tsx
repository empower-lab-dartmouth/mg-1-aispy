import "./play.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Input from '@mui/material/Input';
import Dictaphone from './dictaphoneSetup'
import React, { useEffect, useRef } from "react"; 
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, game, object, colorObject, oldObject, readtext, lastmodel} from "../../store";
import {AISPY, YOUSPY, COLOR, OBJECT, LEARN, END} from "../../models/names";
import {randomnumber} from "../../editor/randomnumber";
import Images from "../../database/images.json";
import { Conversation } from "../../editor/conversation";
import useSpeechToText from 'react-hook-speech-to-text';

function Play(){

    const ariaLabel = { 'aria-label': 'description' };
    const [gamesys, setgamesys] = useRecoilState(game);
    const [selectedimage, setselectedimage] = useRecoilState(currentimage);
    const [obj, setobj] = useRecoilState(object);
    const [colorObj, setcolorObj] = useRecoilState(colorObject);
    const [oldObj, setoldObj] = useRecoilState(oldObject);
    const [read, setread] = useRecoilState(readtext);
    const [last ,setlast] = useRecoilState(lastmodel);


    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    
   

    const msg = new SpeechSynthesisUtterance();
    msg.text = read;
    const isFirst = useRef(true);
   


    useEffect (() => {
        if(gamesys.model == YOUSPY){
            let random = randomnumber(0, Images.length-1);
            setselectedimage({label: Images[random].label, path: Images[random].path, id: random});
        }
    },[])

    useEffect (() => {
        // only voice out after the read updates
        if(isFirst.current == true){
             isFirst.current = false;
             if(gamesys.model == YOUSPY && gamesys.state == OBJECT){
                if(last.model == YOUSPY && last.state == OBJECT){
                    window.speechSynthesis.speak(msg);
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
    }


    const changestate = async() => {
         if(gamesys.state == COLOR){
          
            // guess an object in the current image
            // set a variable to the input color from the user
            let color = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase();
            // var color = "red";
            await setcolorObj(selectedimage.label[randomnumber(0, selectedimage.label.length - 1)][0]); // need get current image's labels -> get one of the items (color and objects)
            
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
            if(gamesys.model == AISPY){
                // add new object corresponding to guessing color
                // find (document.getElementById("inputline") as  HTMLInputElement).value in labels and set it to the new object
                var newAns = (document.getElementById("inputline") as  HTMLInputElement).value.toLowerCase().split(" ");
                var newObj = "";
                for (let i = 0; i < newAns.length - 1; i++) {
                    if (newAns[i] === "a" || newAns[i] === "an" || newAns[i] === "the") { // "it is a/an [object]", "this object is a/an [object]"
                        newObj = newAns[i + 1];
                    }
                }

                // update label: insert newObj into corresponding color
                for (var i = 0; i < selectedimage.label.length; i++) {
                    if (selectedimage.label[i][0] == colorObj) {
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
            <Button variant="outlined" onClick = {() => setlast({state: gamesys.state, model: gamesys.model})  }>
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

           <Input className = "space" id = "inputline" placeholder="Answer" inputProps={ariaLabel} />
       
           <Button  variant="outlined"onClick={isRecording ? stop :  startSpeechToText}>
              {isRecording ? 'Recording' : 'Record'}
           </Button>

           </div>
           <ul>
           {interimResult && <li>{interimResult}</li>}
            </ul>
           <Button variant="outlined" onClick = {() => changestate()} >Confirm</Button>    
        </div>    
    )
};
export default Play;