import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ScanLogo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={31}
    fill="none"
    // style={{backgroundColor:'red'}}
    {...props}
  >
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.94}
      d="M2.583 11.625v-3.23a5.805 5.805 0 0 1 5.813-5.812h3.229M19.375 2.583h3.23a5.805 5.805 0 0 1 5.812 5.813v3.229M28.417 20.667v1.937a5.805 5.805 0 0 1-5.813 5.813h-1.937M11.625 28.417h-3.23a5.805 5.805 0 0 1-5.812-5.813v-3.229M10.98 14.208a3.23 3.23 0 1 0 0-6.458 3.23 3.23 0 0 0 0 6.458ZM9.688 23.25a1.937 1.937 0 1 0 0-3.875 1.937 1.937 0 0 0 0 3.875ZM21.313 11.625a1.937 1.937 0 1 0 0-3.875 1.937 1.937 0 0 0 0 3.875ZM20.02 23.25a3.23 3.23 0 1 0 0-6.458 3.23 3.23 0 0 0 0 6.458Z"
    />
  </Svg>
)
export default ScanLogo
