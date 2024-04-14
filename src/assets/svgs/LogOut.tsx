import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const LogOut = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.442}
      d="M8.635 7.961c.298-3.461 2.077-4.875 5.97-4.875h.126c4.298 0 6.019 1.722 6.019 6.02v6.269c0 4.298-1.721 6.02-6.02 6.02h-.124c-3.866 0-5.644-1.395-5.962-4.799M14.5 12.23H3.558M5.702 9.01l-3.221 3.22 3.221 3.222"
    />
  </Svg>
)
export default LogOut
