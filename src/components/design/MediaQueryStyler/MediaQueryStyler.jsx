import PropTypes from "prop-types";
import { useMediaQuerySize } from "#components/hooks";
import { Children, cloneElement } from "react";

/**
 * @template T
 * @typedef {T | { xs: T; sm: T; md: T; lg: T; xl: T }} CustomProp
 */

/**
 *
 * @param {{style: {[k in keyof React.CSSProperties]?: CustomProp<React.CSSProperties[k]>}; propKey: keyof {style: "style"; sx: "sx";}}} props
 * @returns { React.JSX.Element }
 */
const MediaQueryStyler = ({ style = {}, children, propKey = "style", ...rest }) => {
    const mediaQuerySize = useMediaQuerySize();

    const findMediaQueryValue = (style, mediaQuerySize) => {
        if (style[mediaQuerySize]) return style[mediaQuerySize];
        const indexs = Object.keys(style)
            .map((key) => ["xs", "sm", "md", "lg", "xl"].indexOf(key))
            .filter((n) => n >= 0);
        const index = ["xs", "sm", "md", "lg", "xl"].indexOf(mediaQuerySize);
        let min = index;
        while (!indexs.includes(min) && min > -1) min--;
        while (!indexs.includes(min) && min < indexs.length) min++;
        return style[["xs", "sm", "md", "lg", "xl"][min ?? 0]];
    };

    const setStyleBasedOnMediaQuery = (style) => {
        const updatedStyle = { ...style };
        for (const key in updatedStyle) {
            if (typeof updatedStyle[key] === "object") {
                updatedStyle[key] = findMediaQueryValue(updatedStyle[key], mediaQuerySize);
            }
        }
        return updatedStyle;
    };

    return Children.map(children, (child) => {
        return cloneElement(child, { [propKey]: { ...setStyleBasedOnMediaQuery({ ...rest, ...style }), ...child.props[propKey] } });
    });
};

MediaQueryStyler.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
    propKey: PropTypes.string,
};

export default MediaQueryStyler;
