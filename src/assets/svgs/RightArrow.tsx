import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../../utils/colors/colors"

const RightArrow = (props: any) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        height={25}
        viewBox="0 96 960 960"
        style={{ marginLeft: 10 }}
        width={25}
        fill={props.color}
        {...props}
    >
        <Path d="m480 896-42-43 247-247H160v-60h525L438 299l42-43 320 320-320 320Z" />
    </Svg>
)

export default RightArrow