import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const BackBtn2 = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#060047"
      d="M10.372.367a1.25 1.25 0 0 0-1.77 0l-8.31 8.31a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77l-7.24-7.25 7.25-7.25c.48-.48.48-1.28-.01-1.76Z"
    />
  </Svg>
)
export default BackBtn2