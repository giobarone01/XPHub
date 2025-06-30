import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MobileOptimizedMotion({ children, className, ...props }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    if (isMobile) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }

    return <motion.div className={className} {...props}>{children}</motion.div>;
}