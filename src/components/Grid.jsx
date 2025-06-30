import React from "react";
import { motion } from "framer-motion";
export default function Grid({ children, columns }) {
    const gridColumns = columns || "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

    return (
        <div className={`container mx-auto grid ${gridColumns} gap-6 md:gap-8 lg:gap-10`}>
            {React.Children.map(children, (child, index) => (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}
