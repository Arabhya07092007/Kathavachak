import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LeftArrow = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.188 9.206h11.25M7.725 13.724 3.187 9.206l4.538-4.519"
    />
  </Svg>
)
export default LeftArrow
