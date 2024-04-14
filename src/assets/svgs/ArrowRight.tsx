import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ArrowRight = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#6B7280"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={0.962}
      d="m5.46 11.288 3.657-3.657a1.114 1.114 0 0 0 0-1.57L5.459 2.404"
    />
  </Svg>
)
export default ArrowRight
