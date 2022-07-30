import "./imagelibrary.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Images from "../../database/images.json";
import { currentimage } from "../../store";
import {useRecoilState, useRecoilValue} from "recoil";

const Imagelibrary = () => {

    const [selectedimage, setselectedimage] = useRecoilState(currentimage);

    const chooseimage = ( value: any, index: number) => {

     var originalbutton = document.getElementById(selectedimage.id.toString());
     if(originalbutton){
        originalbutton.style.backgroundColor = "";
     }

     setselectedimage({label: value.label, path: value.path, id: index, color: "NA"});

     var button = document.getElementById(index.toString());
     if(button){
     button.style.backgroundColor = "black";
     }
    }

    return (
        <div className = "imagelibrary">

            <div className = "image-database">

             {Images.map((value, index) => {
                return (
            <Button className = "space" id = {index.toString()} onClick = {() => chooseimage(value, index)}>
            <img src = {"../assets/images/"+value.path} height = "200px" width = "200px"/>
            </Button>) }
            )}
            
            </div>

            <div className = "confirm-box">
            <img  className = "downspace" src = {"../assets/images/"+selectedimage.path} height = "200px" width = "200px"/>
            <Button variant="contained">
                <Link to = "/play"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Confirm
                </Link>
            </Button>
            </div>

        </div>
    )
};
export default Imagelibrary;
