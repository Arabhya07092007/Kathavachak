import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const OpenEmail = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#96A7AF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.5 15.833V8.392a1.667 1.667 0 0 1 .742-1.387l5.833-3.888a1.667 1.667 0 0 1 1.85 0l5.833 3.888a1.667 1.667 0 0 1 .742 1.387v7.441m-15 0A1.666 1.666 0 0 0 4.167 17.5h11.666a1.666 1.666 0 0 0 1.667-1.667m-15 0 5.625-3.75m9.375 3.75-5.625-3.75m-3.75 0L2.5 8.333m5.625 3.75.95.634a1.667 1.667 0 0 0 1.85 0l.95-.634m0 0 5.625-3.75"
    />
  </Svg>
)
export default OpenEmail
