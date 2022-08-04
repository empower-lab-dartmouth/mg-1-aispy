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
     /*
      * Inconsistency with spaces and new lines, consider using something like
     *  https://www.npmjs.com/package/eslint-config-airbnb
     * a link package like this would make it super easy to standardize the look of the code.
     * That also helps reduce errors.
     */
     if(button){
     button.style.backgroundColor = "black";
     }
    }

    return (
        /**
         * consistency with naming schema, i.e. dashes, camel case, or all lowercase? 
         * From my experience, we should prefer dashes or upper case camel case. 
         * Upper camel case is probably most standard.
         */
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
