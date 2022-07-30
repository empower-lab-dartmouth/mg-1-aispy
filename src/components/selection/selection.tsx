import "./selection.css";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentimage, game} from "../../store";
import {AISPY, YOUSPY, COLOR, OBJECT} from "../../models/names";
import {randomnumber} from "../../editor/randomnumber";
import Images from "../../database/images.json";


function Selection(){

    const [gamesys, setgamesys] = useRecoilState(game);
    const [selectedimage, setselectedimage] = useRecoilState(currentimage);

    return (
        <div className="selection">
            <div className = "button-box">
            <Stack spacing={20} direction = "column">
            <Button variant="contained" onClick = {async() => setgamesys({state: COLOR, model: AISPY,})}>
                <Link to = "/imagelibrary" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                AI Spy
                </Link>
            </Button>

            <Button variant="contained"onClick = {async() => {
                let random = randomnumber(0, Images.length-1);
                setselectedimage({label: Images[random].label, path: Images[random].path, id: random, color: Images[random].label[randomnumber(0, selectedimage.label.length - 1)][0] });
                setgamesys({state: OBJECT, model: YOUSPY,});
                }}>
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
