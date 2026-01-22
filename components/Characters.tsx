"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// ABSTRACT GEOMETRIC CHARACTERS
// Elegant floating orbs/crystals with glow effects
// ═══════════════════════════════════════════════════════════════════════════════

interface CharacterConfig {
    id: number;
    type: "orb" | "crystal" | "ring" | "star";
    primaryColor: string;
    secondaryColor: string;
    size: number;
    floatDelay: number;
    glowIntensity: number;
}

const CHARACTERS: CharacterConfig[] = [
    {
        id: 1,
        type: "orb",
        primaryColor: "#A78BFA",
        secondaryColor: "#EC4899",
        size: 120,
        floatDelay: 0,
        glowIntensity: 0.6,
    },
    {
        id: 2,
        type: "crystal",
        primaryColor: "#60A5FA",
        secondaryColor: "#34D399",
        size: 140,
        floatDelay: 0.5,
        glowIntensity: 0.7,
    },
    {
        id: 3,
        type: "ring",
        primaryColor: "#F472B6",
        secondaryColor: "#FBBF24",
        size: 100,
        floatDelay: 1,
        glowIntensity: 0.5,
    },
    {
        id: 4,
        type: "star",
        primaryColor: "#818CF8",
        secondaryColor: "#A78BFA",
        size: 110,
        floatDelay: 1.5,
        glowIntensity: 0.6,
    },
];

interface CharactersProps {
    isPasswordFocused: boolean;
}

export default function Characters({ isPasswordFocused }: CharactersProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-96 flex items-center justify-center">
            {/* Particle background */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Characters */}
            <div className="relative flex items-center justify-center gap-8 flex-wrap max-w-2xl">
                {CHARACTERS.map((config, index) => (
                    <Character
                        key={config.id}
                        config={config}
                        index={index}
                        isPasswordFocused={isPasswordFocused}
                        mousePos={mousePos}
                    />
                ))}
            </div>
        </div>
    );
}

interface CharacterProps {
    config: CharacterConfig;
    index: number;
    isPasswordFocused: boolean;
    mousePos: { x: number; y: number };
}

function Character({ config, index, isPasswordFocused, mousePos }: CharacterProps) {
    const floatClass = [
        "float",
        "float-delay-1",
        "float-delay-2",
        "float-delay-3",
    ][index % 4];

    return (
        <motion.div
            className={`relative ${floatClass}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: isPasswordFocused ? 0.3 : 1,
                scale: isPasswordFocused ? 0.8 : 1,
            }}
            transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
            }}
            style={{
                filter: `blur(${isPasswordFocused ? "8px" : "0px"})`,
            }}
        >
            <div
                className="relative"
                style={{
                    width: config.size,
                    height: config.size,
                }}
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${config.primaryColor}40 0%, transparent 70%)`,
                        filter: `blur(20px)`,
                    }}
                    animate={{
                        scale: isPasswordFocused ? 0.5 : [1, 1.2, 1],
                        opacity: isPasswordFocused ? 0.2 : config.glowIntensity,
                    }}
                    transition={{
                        scale: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        opacity: {
                            duration: 0.6,
                        },
                    }}
                />

                {/* Main shape */}
                {config.type === "orb" && <Orb config={config} isPasswordFocused={isPasswordFocused} />}
                {config.type === "crystal" && <Crystal config={config} isPasswordFocused={isPasswordFocused} />}
                {config.type === "ring" && <Ring config={config} isPasswordFocused={isPasswordFocused} />}
                {config.type === "star" && <Star config={config} isPasswordFocused={isPasswordFocused} />}

                {/* Inner highlight */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white/40 rounded-full blur-xl pointer-events-none"
                    animate={{
                        opacity: isPasswordFocused ? 0 : [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHAPE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function Orb({ config, isPasswordFocused }: { config: CharacterConfig; isPasswordFocused: boolean }) {
    return (
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
            }}
            animate={{
                rotate: isPasswordFocused ? 0 : 360,
            }}
            transition={{
                rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                },
            }}
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full shimmer opacity-30" />
        </motion.div>
    );
}

function Crystal({ config, isPasswordFocused }: { config: CharacterConfig; isPasswordFocused: boolean }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.3))" }}
        >
            <defs>
                <linearGradient id={`grad-${config.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: config.primaryColor, stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: config.secondaryColor, stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <motion.polygon
                points="50,10 90,50 50,90 10,50"
                fill={`url(#grad-${config.id})`}
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={{
                    rotate: isPasswordFocused ? 0 : 360,
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ transformOrigin: "50% 50%" }}
            />
            {/* Inner diamond */}
            <polygon
                points="50,30 70,50 50,70 30,50"
                fill="white"
                opacity="0.2"
            />
        </svg>
    );
}

function Ring({ config, isPasswordFocused }: { config: CharacterConfig; isPasswordFocused: boolean }) {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
                <linearGradient id={`ring-grad-${config.id}`} gradientTransform="rotate(45)">
                    <stop offset="0%" style={{ stopColor: config.primaryColor }} />
                    <stop offset="100%" style={{ stopColor: config.secondaryColor }} />
                </linearGradient>
            </defs>
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={`url(#ring-grad-${config.id})`}
                strokeWidth="8"
                animate={{
                    strokeDasharray: isPasswordFocused ? "0, 251" : ["0, 251", "251, 0", "0, 251"],
                    rotate: isPasswordFocused ? 0 : 360,
                }}
                transition={{
                    strokeDasharray: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                    rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                    },
                }}
                style={{ transformOrigin: "50% 50%" }}
            />
            {/* Inner circles */}
            <circle cx="50" cy="50" r="25" fill="white" opacity="0.1" />
            <circle cx="50" cy="50" r="15" fill="white" opacity="0.2" />
        </svg>
    );
}

function Star({ config, isPasswordFocused }: { config: CharacterConfig; isPasswordFocused: boolean }) {
    const points = "50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35";

    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <defs>
                <linearGradient id={`star-grad-${config.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: config.primaryColor }} />
                    <stop offset="100%" style={{ stopColor: config.secondaryColor }} />
                </linearGradient>
            </defs>
            <motion.polygon
                points={points}
                fill={`url(#star-grad-${config.id})`}
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={{
                    rotate: isPasswordFocused ? 0 : [0, 360],
                    scale: isPasswordFocused ? 0.8 : [1, 1.1, 1],
                }}
                transition={{
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                style={{ transformOrigin: "50% 50%" }}
            />
            {/* Center glow */}
            <circle cx="50" cy="50" r="10" fill="white" opacity="0.4" />
        </svg>
    );
}
