import { useEffect, useState } from "react";

/**
 *
 * @returns {string}
 */
const useMediaQuerySize = () => {
    const breakPoints = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    };
    const [width, setWidth] = useState(window.innerWidth);

    const setDimension = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", setDimension);

        return () => {
            window.removeEventListener("resize", setDimension);
        };
    }, [width]);

    switch (true) {
        case width < breakPoints.sm:
            return "xs";
        case width < breakPoints.md:
            return "sm";
        case width < breakPoints.lg:
            return "md";
        case width < breakPoints.xl:
            return "lg";
        default:
            return "xl";
    }
};

export default useMediaQuerySize;
