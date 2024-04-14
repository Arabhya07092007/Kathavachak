import * as React from "react"
import Svg, { SvgProps, Circle } from "react-native-svg"
const Dot = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={12}
    style={
    {
        // backgroundColor:'red'
    }
    }
    fill="none"
    {...props}
  >
    <Circle cx={5} cy={5} r={5} fill="#865DFF" />
  </Svg>
)
export default Dot
