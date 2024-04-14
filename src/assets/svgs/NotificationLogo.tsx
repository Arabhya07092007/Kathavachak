import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const NotificationLogo = (props: any) => (
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
      d="M11 16.36c5.17 0 7.56-.663 7.792-3.325 0-2.66-1.668-2.488-1.668-5.752 0-2.55-2.416-5.45-6.124-5.45-3.708 0-6.124 2.9-6.124 5.45 0 3.264-1.668 3.093-1.668 5.752C3.44 15.707 5.832 16.36 11 16.36Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.19 19.12c-1.25 1.388-3.201 1.404-4.464 0"
    />
  </Svg>
)
export default NotificationLogo
