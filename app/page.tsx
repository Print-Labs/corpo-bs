"use client";

import { useState, useEffect, useMemo } from "react";
import LoginForm from "@/components/LoginForm";
import { motion } from "framer-motion";

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

  // Track gradient animation phase
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Generate colors based on gradient phase (for login form)
  const getGradientColor = (offset: number) => {
    const hue = (gradientPhase + offset) % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  // Fast brightness calculation - synced with gradient speed
  const getStarBrightness = (left: number, top: number) => {
    const positionPhase = (left + top) * 2; // 2x faster color change
    const raw = Math.sin((gradientPhase * 2 + positionPhase) * Math.PI / 180);
    return (raw + 1) / 2;
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-animate" />

      {/* Floating orbs for depth */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Stars with Deep Glow Radiance and Sway */}
      {STARS.map((star) => {
        const brightness = getStarBrightness(star.left, star.top);
        const colorValue = Math.round(brightness * 255);
        const coreColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
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
          0 0 ${8}px rgba(${colorValue}, ${colorValue}, ${colorValue}, 0.8),
          0 0 ${16}px rgba(${colorValue}, ${colorValue}, ${colorValue}, 0.5),
          0 0 ${32}px rgba(${colorValue}, ${colorValue}, ${colorValue}, 0.3),
          0 0 ${48}px rgba(${colorValue}, ${colorValue}, ${colorValue}, 0.15)
        `;

        return (
          <div
            key={star.id}
            className="absolute rounded-full"
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">

        {/* Interdimensional Printer Logo */}
        <motion.div
          className="interdimensional-logo mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Portal bubbles */}
          <div className="portal-bubble" style={{ width: 12, height: 12, top: -10, left: '5%', animationDelay: '0s' }} />
          <div className="portal-bubble" style={{ width: 8, height: 8, top: 5, left: '15%', animationDelay: '0.5s' }} />
          <div className="portal-bubble" style={{ width: 10, height: 10, top: -15, right: '10%', animationDelay: '1s' }} />
          <div className="portal-bubble" style={{ width: 6, height: 6, top: 0, right: '20%', animationDelay: '1.5s' }} />
          <div className="portal-bubble" style={{ width: 14, height: 14, top: -5, left: '50%', animationDelay: '0.7s' }} />

          {/* Main text */}
          <div>
            <span className="interdimensional-text">
              Interdimensional Printer
            </span>
          </div>

          {/* Dripping goo elements */}
          <div className="absolute bottom-0 left-0 right-0 h-10 overflow-visible">
            <div className="gooey-drip" />
            <div className="gooey-drip" />
            <div className="gooey-drip" />
            <div className="gooey-drip" />
            <div className="gooey-drip" />
            <div className="gooey-drip" />
          </div>
        </motion.div>

        {/* Login Form */}
        <LoginForm
          onPasswordFocusChange={setIsPasswordFocused}
          gradientColor={getGradientColor(0)}
        />
      </div>
    </main>
  );
}
