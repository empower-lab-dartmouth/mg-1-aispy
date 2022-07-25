import {atom, selector} from "recoil";
import {image} from "../models/image";

export const currentimage = atom<image>({
    key: "current-image",
    default: {
        label : [[""]],
        path : "image.png",
        id : 0,
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

export const object = atom({
    key: "object",
    default: "",
})

export const colorObject = atom({
    key: "object-color",
    default: "",
})

export const oldObject = atom({
    key: "old-object",
    default: "",
})

