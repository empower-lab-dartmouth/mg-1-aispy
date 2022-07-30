import "./main.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const Main = () =>{
    return (
        <div className="main">
            <p>Welcome to AISpy!</p>
            <div className = "start-button">
            <Button variant="contained">
                <Link to = "/selection"  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                Start
                </Link>
            </Button>
            </div>
        </div>
    )
};
export default Main;