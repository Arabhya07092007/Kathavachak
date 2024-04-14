import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const MoreCircle = (props: any) => (
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
      d="M12 2.75a9.25 9.25 0 1 1 0 18.5 9.25 9.25 0 0 1 0-18.5Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.94 12.013h.008M11.93 12.013h.01M7.921 12.013h.01"
    />
  </Svg>
)
export default MoreCircle
