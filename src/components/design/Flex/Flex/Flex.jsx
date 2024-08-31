import PropTypes from "prop-types";
import MediaQueryStyler from "#components/design/MediaQueryStyler";
import FlexColumn from "../FlexColumn/FlexColumn";
import FlexRow from "../FlexRow/FlexRow";

/**
 * @template T
 * @typedef {T | { xs: T; sm: T; md: T; lg: T; xl: T }} CustomProp
 */

/**
 *
 * @param {{children: React.JSX.Element} & {[k in keyof React.CSSProperties]?: CustomProp<React.CSSProperties[k]>}}} props
 * @returns { React.JSX.Element }
 */
const Flex = ({ children, ...rest }) => {
    return (
        <MediaQueryStyler style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", ...rest }}>
            <div>{children}</div>
        </MediaQueryStyler>
    );
};

Flex.defaultProps = {
    children: PropTypes.node,
};

Flex.Column = FlexColumn;
Flex.Row = FlexRow;

export default Flex;
