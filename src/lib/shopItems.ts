import { StaticImageData } from "next/image";
import SunGlasses from "../../public/63ffd408044a42f175317026e8f9e884.png";
import Cat from "../../public/favpng_cat-pixel-art-pusheen.png";
import Dog from "../../public/Lovepik_com-380361703-pixel-style-cute-dog-pixel-art-cartoon-white.png";
import Fox from "../../public/fox.png";

interface ColorItem {
    name: string;
    color: string;
    price: number;
}

interface Accessories {
    name: string;
    image: StaticImageData;
    price: number;
}

interface ShopItems {
    colors: ColorItem[];
    accessories: Accessories[];
    pets: Accessories[];
}

export const shopItems: ShopItems = {
    colors: [
        {
            name: "blue",
            color: "#92DBFF",
            price: 25,
        },
        {
            name: "brown",
            color: "#BE7C5B",
            price: 25,
        },
        {
            name: "cyan",
            color: "#80FFB9",
            price: 25,
        },
        {
            name: "green",
            color: "#B7FF80",
            price: 25,
        },
        {
            name: "orange",
            color: "#FFBE6F",
            price: 25,
        },
        {
            name: "pink",
            color: "#FF94FA",
            price: 25,
        },
        {
            name: "purple",
            color: "#8F8FFF",
            price: 25,
        },
        {
            name: "red",
            color: "#FF7878",
            price: 25,
        },
        {
            name: "white",
            color: "#FFFFFF",
            price: 25,
        },
        {
            name: "yellow",
            color: "#FFED80",
            price: 25,
        },
    ],
    accessories: [
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
        {
            name: "sunglasses",
            image: SunGlasses,
            price: 15,
        },
    ],
    pets: [
        {
            name: "cat",
            image: Cat,
            price: 50,
        },
        {
            name: "dog",
            image: Dog,
            price: 50,
        },
        {
            name: "fox",
            image: Fox,
            price: 50,
        },
    ],
};
