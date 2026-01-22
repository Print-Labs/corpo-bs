"use client";

import { motion } from "framer-motion";

interface CrossfadeLinkProps {
    href: string;
    children: React.ReactNode;
    isLogoHovered: boolean;
    className?: string;
}

/**
 * CrossfadeLink Component
 * 
 * Renders a link that crossfades between two styles (Purple vs Green) 
 * instead of interpolating colors. This ensures the text transition 
 * matches the background's opacity crossfade perfectly.
 */
export default function CrossfadeLink({ href, children, isLogoHovered, className = "" }: CrossfadeLinkProps) {
    return (
        <a href={href} className={`relative inline-block ${className}`}>
            {/* Invisible spacer to maintain layout size */}
            <span className="opacity-0 font-medium" aria-hidden="true">
                {children}
            </span>

            {/* Purple Layer (Default) */}
            <motion.span
                className="absolute inset-0 font-medium text-purple-400"
                animate={{ opacity: isLogoHovered ? 0 : 1 }}
                transition={{ duration: 1.0 }}
                aria-hidden="true"
            >
                {children}
            </motion.span>

            {/* Green Layer (Logo Hovered) - Includes Glow */}
            <motion.span
                className="absolute inset-0 font-medium text-green-400"
                style={{ textShadow: "0 0 10px rgba(74, 222, 128, 0.5)" }}
                animate={{ opacity: isLogoHovered ? 1 : 0 }}
                transition={{ duration: 1.0 }}
            >
                {children}
            </motion.span>
        </a>
    );
}
