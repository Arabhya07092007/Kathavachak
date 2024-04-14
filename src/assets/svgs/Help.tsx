import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Help = (props: any) => (
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
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M16.423 18.26h-3.846l-4.279 2.846a.959.959 0 0 1-1.49-.798V18.26C3.923 18.26 2 16.337 2 13.452v-5.77c0-2.884 1.923-4.807 4.808-4.807h9.615c2.885 0 4.808 1.923 4.808 4.808v5.769c0 2.885-1.923 4.808-4.808 4.808Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.442}
      d="M11.616 11.462v-.202c0-.654.403-1 .807-1.28.395-.268.789-.615.789-1.25 0-.884-.712-1.595-1.596-1.595-.885 0-1.597.711-1.597 1.596M11.611 13.76h.009"
    />
  </Svg>
)
export default Help
