import React, { useEffect }  from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, game, object, oldObject, readtext} from "../store";
import {AISPY, YOUSPY, COLOR, OBJECT, LEARN, END, YESEND} from "../models/names";

export const Conversation = () => {

    const [read, setread] = useRecoilState(readtext);
    const [gamesys, setgamesys] = useRecoilState(game);    
    const [obj, setobj] = useRecoilState(object);
    const [oldObj, setoldObj] = useRecoilState(oldObject);
    const image = useRecoilValue(currentimage);


    useEffect (() => {
     var texts = "";
    if (gamesys.state == COLOR && gamesys.model == AISPY){   
         texts = "Tell me a color to spy!";   
    }
    else if (gamesys.state == OBJECT && gamesys.model == AISPY){
         texts = "I think it is: " + obj;
    }
    else if (gamesys.state == OBJECT && gamesys.model == YOUSPY){
        texts = "Can you spy the object in " + image.color +" ?";
    }
    else if (gamesys.state == LEARN && gamesys.model == AISPY){
        texts = "I got it! It is not " + oldObj + " . It is " + obj + " !";
    }
    else if (gamesys.state == END && gamesys.model == AISPY){
        texts = "Do you want to spy another term?";
    }
    else if(gamesys.state == END && gamesys.model == YOUSPY){
        texts = "No you are wrong! Do you want to give another try?";
     }
     else if(gamesys.state == YESEND && gamesys.model == YOUSPY){
        texts = "Correct! Do you want to spy another term? "
     }
    setread(texts);
    console.log(texts);
    }, [gamesys.state])
   
    return (
        <p className = "space">{read}</p>
    );
}