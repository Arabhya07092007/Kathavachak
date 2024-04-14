import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ArrowDown = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={18}
    fill="none"
    // style={{backgroundColor:'red'}}
    {...props}
  >
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.7}
      d="m14.734 6.466-4.566 4.567a1.39 1.39 0 0 1-1.961 0L3.64 6.466"
    />
  </Svg>
)
export default ArrowDown
