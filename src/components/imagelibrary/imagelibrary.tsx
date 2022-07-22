import "./imagelibrary.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

const Imagelibrary = () => {
    return (
        <div className = "imagelibrary">

            <div className = "image-database">
            
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            <img className = "space" src = "../assets/image.png"/>
            
            </div>

            <div className = "confirm-box">
            <img  className = "downspace" src = "../assets/image.png"/>
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
