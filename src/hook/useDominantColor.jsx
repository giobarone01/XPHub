import { useState, useEffect } from 'react';

export default function useDominantColor(imageUrl) {
    const [dominantColor, setDominantColor] = useState('rgba(31, 41, 55, 0.5)');
    const [palette, setPalette] = useState([]);

    useEffect(() => {
        if (!imageUrl) return;

        const extractColors = async () => {
            try {
                const ColorThief = (await import('colorthief')).default;

                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = imageUrl;

                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                const colorThief = new ColorThief();
                const dominant = colorThief.getColor(img);
                const palette = colorThief.getPalette(img, 6);

                setDominantColor(`rgba(${dominant.join(', ')}, 0.7)`);
                setPalette(palette.map(color => `rgb(${color.join(', ')})`));
            } catch (error) {
                console.error('Error extracting colors:', error);
                // Fallback colors
                setDominantColor('rgba(31, 41, 55, 0.5)');
                setPalette([
                    'rgb(31, 41, 55)',
                    'rgb(55, 65, 81)',
                    'rgb(75, 85, 99)',
                    'rgb(107, 114, 128)',
                    'rgb(156, 163, 175)',
                    'rgb(209, 213, 219)'
                ]);
            }
        };

        extractColors();
    }, [imageUrl]);

    return { dominantColor, palette };
}