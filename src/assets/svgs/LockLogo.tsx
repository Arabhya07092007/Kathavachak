import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LockLogo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={20}
    // style={{backgroundColor:'red'}}
    fill="none"
    {...props}
  >
    <Path
      stroke="#96A7AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 11.5v1.667M3 16.5h10a1.666 1.666 0 0 0 1.667-1.667v-5A1.667 1.667 0 0 0 13 8.167H3a1.667 1.667 0 0 0-1.667 1.666v5A1.666 1.666 0 0 0 3 16.5Zm8.333-8.333V4.833a3.333 3.333 0 1 0-6.666 0v3.334h6.666Z"
    />
  </Svg>
)
export default LockLogo
