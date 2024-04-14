import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShareLogo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillOpacity={0.8}
      d="M19.875 18.75a3.375 3.375 0 1 1-6.548-1.148l-4.97-3.193a3.375 3.375 0 1 1 0-4.818l4.97-3.188a3.383 3.383 0 1 1 .812 1.261l-4.968 3.192a3.375 3.375 0 0 1 0 2.297l4.968 3.192a3.375 3.375 0 0 1 5.736 2.405Z"
    />
  </Svg>
)
export default ShareLogo
