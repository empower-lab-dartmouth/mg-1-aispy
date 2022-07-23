import {atom, selector} from "recoil";
import {image} from "../models/image";

export const currentimage = atom<image>({
    key: "current-image",
    default: {
        "lable" : "",
        "path" : "image.png",
        "id" : 0,
    },
})

export const gamemodel = atom({
    key: "game-model",
    default: 0,
})

export const gamestate = atom({
    key: "game-state",
    default: 1,
})