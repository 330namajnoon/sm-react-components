import PropTypes from "prop-types";
import { useMediaQuerySize } from "#components/hooks";
import { Children, cloneElement } from "react";

/**
 * @typedef {Object} CustomProp
 * @property {any} xs
 * @property {any} sm
 * @property {any} md
 * @property {any} lg
 * @property {any} xl
 */

/**
 * @param {Object.<string, (CustomProp | any)>} props
 */
const MediaQueryProps = (props) => {
    const { children } = props;
    const mediaQuerySize = useMediaQuerySize();
    const mediaQuerySizes = ["xs", "sm", "md", "lg", "xl", "default"];

    const isMediaQueryProp = (prop) => Object.keys(prop).some((key) => mediaQuerySizes.includes(key));

    const getMediaQueryProp = (prop) => {
        let indexOf = mediaQuerySizes.indexOf(mediaQuerySize);
        if (prop[mediaQuerySizes[indexOf]] === undefined && prop.default) return prop.default;
        if (typeof prop[mediaQuerySizes[indexOf]] === "boolean") {
            while (!!prop[mediaQuerySizes[indexOf]] && indexOf > 0) indexOf--;
            while (!!prop[mediaQuerySizes[indexOf]] && indexOf < mediaQuerySizes.length) indexOf++;
        } else {
            while (!prop[mediaQuerySizes[indexOf]] && indexOf > 0) indexOf--;
            while (!prop[mediaQuerySizes[indexOf]] && indexOf < mediaQuerySizes.length) indexOf++;
        }
        return prop[mediaQuerySizes[indexOf]];
    };

    const getMediaQueryProps = (props) => {
        if (Array.isArray(props)) return props;
        if (props.$$typeof) return getChildren(props);
        let newProps = { ...props };
        if (newProps.children) delete newProps.children;
        return Object.keys(newProps).reduce((init, propKey) => {
            return {
                ...init,
                [propKey]:
                    typeof newProps[propKey] === "object" ? (isMediaQueryProp(newProps[propKey]) ? getMediaQueryProp(newProps[propKey]) : getMediaQueryProps(newProps[propKey])) : newProps[propKey],
            };
        }, {});
    };

    const getChildProps = (child) => {
        const childProps = getMediaQueryProps(child.props);
        return {
            ...childProps,
            children:
                typeof children.props.children === "function"
                    ? children.props.children(childProps)
                    : Array.isArray(children.props.children)
                    ? children.props.children.map((child) => (typeof child === "function" ? child(childProps) : child))
                    : children.props.children,
        };
    };

    const getChildren = (children) => {
        return Children.map(children, (child) => {
            return cloneElement(child, getChildProps(child));
        });
    };

    return getChildren(children);
};

MediaQueryProps.propTypes = {
    style: PropTypes.any,
    children: PropTypes.any,
};

export default MediaQueryProps;
