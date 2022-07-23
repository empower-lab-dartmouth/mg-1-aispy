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