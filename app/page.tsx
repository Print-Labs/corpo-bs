"use client";

import { useState, useEffect, useMemo } from "react";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate static star data once
const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    depth: Math.random(),
    size: 2 + Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    moveAmount: 3 + Math.random() * 2,
    delay: Math.random() * 400,
  }));
};

const STARS = generateStars(60);

export default function Home() {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [gradientPhase, setGradientPhase] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Track gradient animation phase
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate colors based on gradient phase (for login form)
  const getGradientColor = (offset: number) => {
    if (isLogoHovered) {
      // Green-black theme when logo is hovered
      const hue = 120; // Green hue
      return `hsl(${hue}, 60%, 35%)`;
    }
    const hue = (gradientPhase + offset) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  // Fast brightness calculation - synced with gradient speed
  const getStarBrightness = (left: number, top: number) => {
    const positionPhase = (left + top) * 2; // 2x faster color change
    const raw = Math.sin((gradientPhase * 2 + positionPhase) * Math.PI / 180);
    return (raw + 1) / 2;
  };

  // Get star glow color based on hover and position
  const getStarGlow = (left: number, top: number, brightness: number) => {
    if (isLogoHovered) {
      // Diagonal split: top-left is green side, bottom-right is black side
      const diagonalPosition = (left + top) / 2;
      if (diagonalPosition < 50) {
        // Green side - dark/black glow
        const darkValue = Math.round((1 - brightness) * 40);
        return { r: darkValue, g: darkValue + 10, b: darkValue };
      } else {
        // Black side - white glow
        const brightValue = Math.round(brightness * 255);
        return { r: brightValue, g: brightValue, b: brightValue };
      }
    }
    // Default: grayscale glow
    const colorValue = Math.round(brightness * 255);
    return { r: colorValue, g: colorValue, b: colorValue };
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background - both rendered, opacity crossfade */}
      <div
        className="absolute inset-0 gradient-animate transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLogoHovered ? 0 : 1 }}
      />
      <div
        className="absolute inset-0 gradient-green-black transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLogoHovered ? 1 : 0 }}
      />


      {/* Stars with Deep Glow Radiance and Sway */}
      {STARS.map((star) => {
        const brightness = getStarBrightness(star.left, star.top);
        const glowColor = getStarGlow(star.left, star.top, brightness);
        const coreColor = `rgb(${glowColor.r}, ${glowColor.g}, ${glowColor.b})`;
        const glowOpacity = 0.6 + brightness * 0.4;

        // Much more dramatic movement synced with gradient
        const gradientRad = gradientPhase * Math.PI / 180;
        // Drift follows gradient direction - closer stars move more
        const depth = star.depth || 0.5;
        const driftX = Math.cos(gradientRad) * 80 * depth;
        const driftY = Math.sin(gradientRad) * 80 * depth;
        // Sway adds organic floating
        const swayX = Math.sin((gradientPhase * 2 + star.left) * Math.PI / 180) * 25;
        const swayY = Math.cos((gradientPhase * 2 + star.top) * Math.PI / 180) * 25;
        const totalX = driftX + swayX;
        const totalY = driftY + swayY;

        const deepGlow = `
          0 0 ${2}px ${coreColor},
          0 0 ${4}px ${coreColor},
          0 0 ${8}px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.8),
          0 0 ${16}px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.5),
          0 0 ${32}px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.3),
          0 0 ${48}px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, 0.15)
        `;

        return (
          <div
            key={star.id}
            className="absolute rounded-full transition-all duration-500"
            style={{
              width: star.size,
              height: star.size,
              left: `${star.left}%`,
              top: `${star.top}%`,
              background: coreColor,
              boxShadow: deepGlow,
              opacity: glowOpacity,
              transform: `translate(${totalX}px, ${totalY}px)`,
            }}
          />
        );
      })}

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-10 md:grid md:grid-cols-2 md:items-center md:gap-12">

          {/* Logo / Brand */}
          <motion.div
            className="w-full flex flex-col items-center md:items-start cursor-pointer"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <Image
              src="/logo.png"
              alt="Interdimensional Printer"
              width={520}
              height={520}
              priority
              className={`h-auto w-[260px] sm:w-[340px] md:w-[380px] lg:w-[420px] transition-all duration-500 ${isLogoHovered
                ? 'drop-shadow-[0_0_35px_rgba(34,197,94,0.5)]'
                : 'drop-shadow-[0_0_28px_rgba(0,255,136,0.35)]'
                }`}
            />
          </motion.div>

          {/* Login Form */}
          <div className="w-full flex justify-center md:justify-end">
            <LoginForm
              onPasswordFocusChange={setIsPasswordFocused}
              gradientColor={getGradientColor(0)}
              isLogoHovered={isLogoHovered}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

