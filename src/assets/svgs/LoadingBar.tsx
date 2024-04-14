import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"
const LoadingBar = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={146}
    height={9}
    fill="none"
    {...props}
  >
    <Path
      fill="#865DFF"
      fillOpacity={0.4}
      d="M0 4.667a3.8 3.8 0 0 1 3.8-3.8h138.067a3.8 3.8 0 0 1 0 7.6H3.8a3.8 3.8 0 0 1-3.8-3.8Z"
    />
    <Rect width={63.374} height={7.6} y={0.867} fill="#865DFF" rx={3.8} />
  </Svg>
)
export default LoadingBar
