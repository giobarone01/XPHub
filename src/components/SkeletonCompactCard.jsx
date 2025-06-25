import { motion } from "framer-motion";

export default function SkeletonCompactCard({ height = '150px' }) {
    return (
        <motion.div 
            className="relative w-full animate-pulse bg-gray-900 rounded-xl overflow-hidden"
            style={{ height }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-2 z-10">
                <div className="h-4 w-3/4 bg-my-purple rounded"></div>
            </div>
        </motion.div>
    );
}