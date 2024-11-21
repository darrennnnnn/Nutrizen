import Image from "next/image";
import blue from "../../../../public/character/bluegif.gif";
import brown from "../../../../public/character/browngif.gif";
import cyan from "../../../../public/character/cyangif.gif";
import green from "../../../../public/character/greengif.gif";
import orange from "../../../../public/character/orangegif.gif";
import pink from "../../../../public/character/pinkgif.gif";
import purple from "../../../../public/character/purplegif.gif";
import red from "../../../../public/character/redgif.gif";
import white from "../../../../public/character/whitegif.gif";
import yellow from "../../../../public/character/yellowgif.gif";

import Cat from "../../../../public/pets/newcat.png";
import Bear from "../../../../public/pets/newbear.png";
import Bunny from "../../../../public/pets/newbunny.png";
import Dog from "../../../../public/pets/newdog.png";
import Duck from "../../../../public/pets/newduck.png";
import Frog from "../../../../public/pets/newfrog.png";
import Fox from "../../../../public/pets/fox.png";

import WitchHat from "../../../../public/accessories/witchhat(2).png";
import StrawHat from "../../../../public/accessories/strawhat.png";
import TopHat from "../../../../public/accessories/tophat.png";
import ChefHat from "../../../../public/accessories/chefhat.png";

import { ColorOptions } from "@/lib/types";

interface CaloriesOverviewProps {
    currentCalories: number;
    targetCalories: number;
    characterColor: string | ColorOptions;
    pet: string;
    accessory: string;
}

const characterImage = {
    blue: blue,
    brown: brown,
    cyan: cyan,
    green: green,
    orange: orange,
    pink: pink,
    purple: purple,
    red: red,
    white: white,
    yellow: yellow,
} as const;

export default function CaloriesOverview({
    currentCalories,
    targetCalories,
    characterColor,
    pet,
    accessory,
}: Readonly<CaloriesOverviewProps>) {
    const percentage = Math.min(100, (currentCalories / targetCalories) * 100);
    const strokeWidth = 20;
    const radius = 80;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const petImage = {
        cat: Cat,
        dog: Dog,
        fox: Fox,
        bear: Bear,
        bunny: Bunny,
        duck: Duck,
        frog: Frog,
    };

    const hatImage = {
        witchhat: WitchHat,
        strawhat: StrawHat,
        tophat: TopHat,
        chefhat: ChefHat,
    };
    return (
        <>
            <div className="relative flex-grow flex justify-center items-center pt-28">
                <div className="relative ">
                    <Image
                        src={
                            characterColor
                                ? characterImage[
                                      characterColor as keyof typeof characterImage
                                  ]
                                : ""
                        }
                        alt="blob"
                        height={250}
                        width={250}
                        unoptimized
                    />{" "}
                    {pet && (
                        <Image
                            src={petImage[pet as keyof typeof petImage]}
                            alt={pet}
                            className="position -bottom-10 -right-16 absolute h-40 w-40"
                        />
                    )}
                    {accessory && (
                        <Image
                            src={hatImage[accessory as keyof typeof hatImage]}
                            alt={pet}
                            className="absolute bottom-36 "
                        />
                    )}
                </div>
            </div>
            <div className="max-w-screen-sm w-full flex flex-col items-center pb-2">
                <div className="relative w-full pb-[60%]">
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 200 120"
                        preserveAspectRatio="xMidYMin slice"
                    >
                        <path
                            d="M20,100 A80,80 0 1,1 180,100"
                            fill="none"
                            stroke="#F0EDE3"
                            strokeWidth={strokeWidth}
                            strokeLinecap="butt"
                        />
                        <path
                            d="M20,100 A80,80 0 1,1 180,100"
                            fill="none"
                            stroke="#2ECC71"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="butt"
                            className="transition-stroke-dashoffset duration-500 ease-in-out"
                        />
                        <text
                            x="100"
                            y="90"
                            textAnchor="middle"
                            fontSize="36"
                            fontWeight="bold"
                            fill="#14532D"
                        >
                            {currentCalories}
                        </text>
                        <text
                            x="100"
                            y="105"
                            textAnchor="middle"
                            fontSize="12"
                            fill="#9E9E9E"
                        >
                            of {targetCalories} cal
                        </text>
                    </svg>
                </div>
            </div>
        </>
    );
}
