import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MobileOptimizedMotion({ children, className, ...props }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            const isMobileDevice = window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
            setIsDesktop(!isMobileDevice);
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

    if (isDesktop) {
        const { initial, animate, exit, transition, ...otherProps } = props;

        return (
            <motion.div className={className} {...otherProps}>
                {children}
            </motion.div>
        );
    }

    return <div className={className}>{children}</div>;
}