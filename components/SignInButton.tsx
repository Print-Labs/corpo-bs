"use client";

import { motion } from "framer-motion";

interface SignInButtonProps {
    isLogoHovered: boolean;
}

/**
 * SignInButton Component
 * 
 * A sophisticated button with complex shadow and background transitions.
 * 
 * Visual Logic:
 * 1. Theme Transition (1.0s):
 *    - The button crossfades between two background layers (Rainbow vs Green).
 *    - The BASE SHADOWS are attached to these background layers, so the shadow color 
 *      also crossfades smoothly over 1.0s.
 * 
 * 2. Hover Interaction (0.5s):
 *    - On hover, a separate "Glow Container" fades in.
 *    - This container holds two INTENSE GLOW shadows (Purple vs Green).
 *    - These intense glows also crossfade over 1.0s based on the theme.
 * 
 * This decoupling ensures that:
 * - Theme changes are slow and liquid (1.0s).
 * - Hover interactions are reasonably fast (0.5s) layers on top.
 * - Colors never snap or glitch.
 */
export default function SignInButton({ isLogoHovered }: SignInButtonProps) {
    return (
        <motion.button
            type="submit"
            className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white relative"
            whileHover="hover"
            whileTap="tap"
            variants={{
                hover: { scale: 1.02 },
                tap: { scale: 0.98 }
            }}
        >
            {/* 
              BACKGROUND LAYERS (Base Theme)
              These layers handle the main background gradient AND the base resting shadow.
              They crossfade over 1.0s matching the page background.
            */}

            {/* Layer 1: Rainbow Theme (Default) */}
            <motion.div
                className="absolute inset-0 btn-gradient-animate rounded-xl"
                // Fixed Purple Shadow matching the rainbow theme
                style={{ boxShadow: "0 10px 30px rgba(118, 75, 162, 0.5)" }}
                animate={{ opacity: isLogoHovered ? 0 : 1 }}
                transition={{ duration: 1.0 }}
            />

            {/* Layer 2: Green Theme (Logo Hovered) */}
            <motion.div
                className="absolute inset-0 btn-gradient-green-black rounded-xl"
                // Fixed Green Shadow matching the green theme
                style={{ boxShadow: "0 10px 30px rgba(22, 163, 74, 0.4), 0 0 20px rgba(22, 163, 74, 0.2)" }}
                animate={{ opacity: isLogoHovered ? 1 : 0 }}
                transition={{ duration: 1.0 }}
            />

            {/* 
              HOVER GLOW CONTAINER (Interaction)
              This container fades in when the user HOVERS the button.
              It allows the intense glow to appear without disturbing the base layers.
            */}
            <motion.div
                className="absolute inset-0 rounded-xl"
                variants={{
                    hover: { opacity: 1 },
                    initial: { opacity: 0 }
                }}
                initial="initial"
                transition={{ duration: 0.5 }} // Smooth hover fade
            >
                {/* Purple Hover Glow - Crossfades 1.0s */}
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ boxShadow: "0 15px 35px rgba(118, 75, 162, 0.7), 0 0 0px transparent" }}
                    animate={{ opacity: isLogoHovered ? 0 : 1 }}
                    transition={{ duration: 1.0 }}
                />

                {/* Green Hover Glow - Crossfades 1.0s */}
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ boxShadow: "0 10px 30px rgba(22, 163, 74, 0.6), 0 0 20px rgba(22, 163, 74, 0.4)" }}
                    animate={{ opacity: isLogoHovered ? 1 : 0 }}
                    transition={{ duration: 1.0 }}
                />
            </motion.div>

            {/* Content (Z-Index to sit on top) */}
            <span className="relative z-10">Sign in</span>
        </motion.button>
    );
}
