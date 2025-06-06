import React from "react";
import { motion } from "framer-motion";
export default function Grid({ children }) {
    return (
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {React.Children.map(children, (child, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    );
}
