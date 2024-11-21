import { StaticImageData } from "next/image";
import Cat from "../../public/pets/newcat.png";
import Bear from "../../public/pets/newbear.png";
import Bunny from "../../public/pets/newbunny.png";
import Dog from "../../public/pets/newdog.png";
import Duck from "../../public/pets/newduck.png";
import Frog from "../../public/pets/newfrog.png";
import Fox from "../../public/pets/fox.png";

import WitchHat from "../../public/accessories/witchhat(2).png";
import StrawHat from "../../public/accessories/strawhat.png";
import TopHat from "../../public/accessories/tophat.png";
import ChefHat from "../../public/accessories/chefhat.png";

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
            name: "witchhat",
            image: WitchHat,
            price: 50,
        },
        {
            name: "strawhat",
            image: StrawHat,
            price: 50,
        },
        {
            name: "tophat",
            image: TopHat,
            price: 50,
        },
        {
            name: "chefhat",
            image: ChefHat,
            price: 50,
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
        {
            name: "bear",
            image: Bear,
            price: 50,
        },
        {
            name: "bunny",
            image: Bunny,
            price: 50,
        },
        {
            name: "duck",
            image: Duck,
            price: 50,
        },
        {
            name: "frog",
            image: Frog,
            price: 50,
        },
    ],
};
