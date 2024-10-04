import React from "react";
import { FaCoins } from "react-icons/fa";

interface HeaderProps {
    coins: number;
}

export default function Header({ coins }: Readonly<HeaderProps>) {
    return (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white rounded-full px-4 py-2 flex items-center shadow-md">
            <FaCoins className="mr-1" />
            <span className="font-bold">{coins}</span>
        </div>
    );
}
