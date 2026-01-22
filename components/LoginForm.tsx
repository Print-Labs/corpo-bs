"use client";

import { useState } from "react";
import { Github, Apple } from "lucide-react";
import { motion } from "framer-motion";
import SignInButton from "./SignInButton";

import CrossfadeLink from "./CrossfadeLink";

interface LoginFormProps {
    onPasswordFocusChange: (isFocused: boolean) => void;
    gradientColor?: string;
    isLogoHovered?: boolean;
}

export default function LoginForm({ onPasswordFocusChange, gradientColor = "#A78BFA", isLogoHovered = false }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <motion.div
            className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl"
            style={{
                boxShadow: `0 0 60px ${gradientColor}40, 0 20px 60px rgba(0,0,0,0.3)`,
                borderColor: `${gradientColor}30`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="text-center mb-8">
                <div className="relative inline-block">
                    {/* Rainbow Text (Absolute Overlay) */}
                    <motion.h1
                        className="text-4xl font-bold mb-2 text-gradient-animate absolute inset-0"
                        animate={{ opacity: isLogoHovered ? 0 : 1 }}
                        transition={{ duration: 1.0 }}
                        aria-hidden="true"
                    >
                        Welcome Back
                    </motion.h1>

                    {/* Green Text (Relative Layout) */}
                    <motion.h1
                        className="text-4xl font-bold mb-2 text-gradient-green-black"
                        animate={{
                            opacity: isLogoHovered ? 1 : 0,
                            textShadow: isLogoHovered
                                ? "0 0 20px rgba(22, 163, 74, 0.5), 0 0 40px rgba(22, 163, 74, 0.3)"
                                : "0 0 0px transparent"
                        }}
                        transition={{ duration: 1.0 }}
                    >
                        Welcome Back
                    </motion.h1>
                </div>
                <motion.p
                    className="text-sm"
                    style={{ color: `${gradientColor}CC` }}
                    animate={{ color: `${gradientColor}CC` }}
                    transition={{ duration: 1.0 }}
                >
                    Sign in to continue your journey
                </motion.p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 mb-6">
                <SocialButton icon={<Github className="w-5 h-5" />} label="Github" />
                <SocialButton icon={<Apple className="w-5 h-5" />} label="Apple" />
                <SocialButton
                    icon={
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    }
                    label="Google"
                />
            </div>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-3 text-gray-400">Or continue with</span>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Email Input */}
                <div>
                    <motion.label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: `${gradientColor}DD` }}
                        animate={{ color: `${gradientColor}DD` }}
                        transition={{ duration: 1.0 }}
                    >
                        Email address
                    </motion.label>
                    <motion.input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-xl glass border border-white/20 px-4 py-3 text-white placeholder-gray-500 input-glow focus:outline-none text-sm"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        whileFocus={{ scale: 1.01 }}
                    />
                </div>

                {/* Password Input */}
                <div>
                    <motion.label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                        style={{ color: `${gradientColor}DD` }}
                        animate={{ color: `${gradientColor}DD` }}
                        transition={{ duration: 1.0 }}
                    >
                        Password
                    </motion.label>
                    <motion.input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-xl glass border border-white/20 px-4 py-3 text-white placeholder-gray-500 input-glow focus:outline-none text-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => {
                            setFocusedField("password");
                            onPasswordFocusChange(true);
                        }}
                        onBlur={() => {
                            setFocusedField(null);
                            onPasswordFocusChange(false);
                        }}
                        whileFocus={{ scale: 1.01 }}
                    />
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                    <CrossfadeLink href="#" isLogoHovered={isLogoHovered} className="text-sm">
                        Forgot password?
                    </CrossfadeLink>
                </div>

                {/* Submit Button */}
                <SignInButton isLogoHovered={isLogoHovered} />
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <CrossfadeLink href="#" isLogoHovered={isLogoHovered}>
                    Sign up
                </CrossfadeLink>
            </p>
        </motion.div>
    );
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <motion.button
            type="button"
            className="flex-1 inline-flex justify-center items-center rounded-xl glass border border-white/20 px-4 py-3 text-gray-300 hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <span className="sr-only">Sign in with {label}</span>
            {icon}
        </motion.button>
    );
}
