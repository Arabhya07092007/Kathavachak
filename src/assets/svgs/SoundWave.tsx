import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SoundWave = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={24}
    // style={{backgroundColor:'black'}}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.849}
      d="M2.32 7.097v8.149M8.018 4.381v13.562M13.716 1.666v18.993M19.414 4.381v13.562M25.113 7.097v8.149"
    />
  </Svg>
)
export default SoundWave
