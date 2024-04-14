import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const UserLogo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
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
      d="M13.333 5.833a3.333 3.333 0 1 1-6.667 0 3.333 3.333 0 0 1 6.667 0v0ZM10 11.667A5.833 5.833 0 0 0 4.167 17.5h11.666A5.834 5.834 0 0 0 10 11.667v0Z"
    />
  </Svg>
)
export default UserLogo
