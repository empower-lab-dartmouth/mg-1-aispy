import "./selection.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

function Selection(){
    return (
        <div className="selection">
            <div className = "button-box">
            <Stack spacing={20} direction = "column">
            <Button variant="contained">
                <Link to = "/imagelibrary" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                AI Spy
                </Link>
            </Button>

            <Button variant="contained">
                <Link to = "/play" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                You Spy
                </Link>
            </Button>
            </Stack>
            </div>
        </div>
    )
}
export default Selection;
