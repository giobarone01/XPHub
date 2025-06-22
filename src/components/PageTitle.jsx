import { motion } from "framer-motion";

export default function PageTitle({ children, subtitle, className = "" }) {
    return (
        <div className={`my-10 ${className}`}>
            <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="relative z-10">{children}</span>
            </motion.h1>
            {subtitle && (
                <motion.p
                    className="text-sm sm:text-base text-gray-300 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}