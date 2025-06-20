import React from 'react';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";

export default function PlatformIcon({ platform }) {
    const platformIcons = {
        pc: <FaWindows />,
        playstation: <FaPlaystation />,
        xbox: <FaXbox />,
        mac: <FaApple />,
        linux: <FaLinux />,
        ios: <FaApple />,
        android: <FaAndroid />,
    };

    const normalizePlatformSlug = (slug) => {
        if (slug.includes("playstation")) return "playstation";
        if (slug.includes("xbox")) return "xbox";
        if (slug.includes("nintendo")) return "nintendo";
        return slug;
    };

    const normalizedSlug = normalizePlatformSlug(platform);
    const Icon = platformIcons[normalizedSlug];

    if (!Icon) return null;

    return (
        <span title={normalizedSlug} className="text-sm sm:text-base drop-shadow-sm" aria-label={normalizedSlug}>
            {Icon}
        </span>
    );
}