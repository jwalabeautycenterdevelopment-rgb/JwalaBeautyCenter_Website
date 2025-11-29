"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound({
    statusCode = 404,
    title = "Page Not Found",
    description = "The page you're looking for doesn't exist or has been moved.",
    showHomeButton = true,
    homeButtonText = "Back to Home",
    homeButtonLink = "/",
    showParticles = true,
    particleCount = 15,
    className = "",
    theme = "blue",
    animationIntensity = "medium"
}) {
    const themes = {
        blue: {
            gradient: "from-blue-50 via-white to-blue-50",
            primary: "from-blue-600 to-blue-700",
            secondary: "from-blue-200 to-blue-300",
            text: "from-blue-600 to-blue-700"
        },
        purple: {
            gradient: "from-purple-50 via-white to-purple-50",
            primary: "from-purple-600 to-purple-700",
            secondary: "from-purple-200 to-purple-300",
            text: "from-purple-600 to-purple-700"
        },
        green: {
            gradient: "from-green-50 via-white to-green-50",
            primary: "from-green-600 to-green-700",
            secondary: "from-green-200 to-green-300",
            text: "from-green-600 to-green-700"
        },
        orange: {
            gradient: "from-orange-50 via-white to-orange-50",
            primary: "from-orange-600 to-orange-700",
            secondary: "from-orange-200 to-orange-300",
            text: "from-orange-600 to-orange-700"
        }
    };

    const animations = {
        low: {
            particleDuration: [4, 6],
            mainSpring: 80,
            stagger: 0.2
        },
        medium: {
            particleDuration: [3, 5],
            mainSpring: 100,
            stagger: 0.3
        },
        high: {
            particleDuration: [2, 4],
            mainSpring: 120,
            stagger: 0.4
        }
    };

    const currentTheme = themes[theme];
    const currentAnimation = animations[animationIntensity];

    const floatingParticles = showParticles ? Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: currentAnimation.particleDuration[0] + Math.random() * (currentAnimation.particleDuration[1] - currentAnimation.particleDuration[0]),
        size: Math.random() * 20 + 10,
    })) : [];

    const emojis = {
        main: "🔍",
        topRight: "❓",
        bottomLeft: "📄"
    };

    return (
        <div className={`h-screen flex flex-col items-center justify-center bg-linear-to-br ${currentTheme.gradient} text-center px-4 relative overflow-hidden ${className}`}>

            {showParticles && floatingParticles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className={`absolute rounded-full bg-linear-to-r ${currentTheme.secondary} opacity-20`}
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: currentAnimation.mainSpring,
                    damping: 15,
                    duration: 0.8
                }}
                className="relative z-10 max-w-2xl"
            >
                <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{
                        rotate: 0,
                        scale: 1,
                        y: [0, -20, 0],
                    }}
                    transition={{
                        rotate: {
                            type: "spring",
                            stiffness: 120,
                            duration: 1
                        },
                        scale: {
                            type: "spring",
                            stiffness: 100,
                            delay: 0.2
                        },
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="text-9xl mb-6 relative"
                >
                    <motion.span
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            rotate: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            scale: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        {emojis.main}
                    </motion.span>
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            rotate: {
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute -top-2 -right-2 text-2xl"
                    >
                        {emojis.topRight}
                    </motion.div>
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1.2, 0.8, 1.2],
                        }}
                        transition={{
                            rotate: {
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            },
                            scale: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute -bottom-2 -left-2 text-2xl"
                    >
                        {emojis.bottomLeft}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: currentAnimation.stagger
                            }
                        }
                    }}
                >
                    <motion.h1
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 40,
                                filter: "blur(10px)"
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                transition: {
                                    type: "spring",
                                    stiffness: currentAnimation.mainSpring,
                                    duration: 0.8
                                }
                            }
                        }}
                        className={`text-6xl md:text-7xl font-extrabold bg-linear-to-r ${currentTheme.text} bg-clip-text text-transparent mb-4`}
                    >
                        {statusCode} - {title}
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                                scale: 0.95
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 80,
                                    duration: 0.6
                                }
                            }
                        }}
                        className="text-xl md:text-2xl text-gray-600 mt-2 leading-relaxed"
                    >
                        {description}
                    </motion.p>
                </motion.div>

                {showHomeButton && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 0.8,
                            type: "spring",
                            stiffness: 150
                        }}
                        className="mt-8"
                    >
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                y: -2
                            }}
                            whileTap={{
                                scale: 0.95,
                                y: 0
                            }}
                        >
                            <Link
                                href={homeButtonLink}
                                className={`relative px-8 py-4 bg-linear-to-r ${currentTheme.primary} text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold text-lg group overflow-hidden`}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
                                    animate={{
                                        x: [-100, 300],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: "easeInOut"
                                    }}
                                />

                                <span className="relative z-10 flex items-center justify-center gap-2 text-blue-600">
                                    {homeButtonText}
                                    <motion.span
                                        animate={{
                                            x: [0, 30, 2],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        🏠
                                    </motion.span>
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>

            <div className="absolute inset-0 opacity-10">
                <div
                    className={`absolute inset-0 bg-linear-to-r ${currentTheme.secondary}`}
                    style={{
                        backgroundImage: `linear-gradient(#000 1px, transparent 1px),
                            linear-gradient(90deg, #000 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>
        </div>
    );
}