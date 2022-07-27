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

export const game = atom({
    key: "game",
    default: {
        state: 0,
        model: 0,
    },
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

export const readtext = atom({
    key: "read-text",
    default: "",
})

export const lastmodel = atom({
    key: "last-model",
    default: {
        state: 0,
        model: 0,
    },
})


