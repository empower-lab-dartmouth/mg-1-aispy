import {atom, selector} from "recoil";

export const currentimage = atom({
    key: "current-image",
    default: {
        "lable" : "",
        "path" : "image.png",
        "id" : 0,
    },
})