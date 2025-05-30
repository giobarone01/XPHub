import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image, alt }) {
    return (
        <LazyLoadImage
            src={image}
            alt={alt || "game image"}
            effect="blur"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            wrapperClassName="w-full h-full"
        />
    );
}
