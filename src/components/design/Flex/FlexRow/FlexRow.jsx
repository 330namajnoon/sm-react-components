import PropTypes from "prop-types";
import MediaQueryStyler from "#components/design/MediaQueryStyler";

/**
 * @template T
 * @typedef {T | { xs: T; sm: T; md: T; lg: T; xl: T }} CustomProp
 */

/**
 *
 * @param {{children: React.JSX.Element} & {[k in keyof React.CSSProperties]?: CustomProp<React.CSSProperties[k]>}}} props
 * @returns { React.JSX.Element }
 */
const FlexRow = ({ children, ...rest }) => {
    return (
        <MediaQueryStyler style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1, width: "100%", height: "100%", ...rest }}>
            <div>{children}</div>
        </MediaQueryStyler>
    );
};

FlexRow.defaultProps = {
    children: PropTypes.node,
};

export default FlexRow;
