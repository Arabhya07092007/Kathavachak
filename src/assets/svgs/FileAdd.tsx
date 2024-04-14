import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const FileAdd = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    // style={{backgroundColor:'yellow'}}
    {...props}
  >
    <Path
      stroke="#865DFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.884}
      d="M15.758 2.817h.322c3.84 0 5.76 0 7.094.94.382.268.721.588 1.008.947.998 1.255.998 3.063.998 6.678v2.997c0 3.49 0 5.235-.552 6.628-.888 2.24-2.766 4.008-5.146 4.843-1.48.52-3.335.52-7.042.52-2.12 0-3.178 0-4.025-.297-1.36-.477-2.433-1.487-2.94-2.767-.316-.797-.316-1.794-.316-3.788v-4.925"
    />
    <Path
      stroke="#865DFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.884}
      d="M25.18 14.593a3.926 3.926 0 0 1-3.926 3.926c-.784 0-1.708-.137-2.47.067a1.963 1.963 0 0 0-1.389 1.388c-.204.762-.066 1.686-.066 2.47a3.926 3.926 0 0 1-3.926 3.926"
    />
    <Path
      stroke="#865DFF"
      strokeLinecap="round"
      strokeWidth={1.884}
      d="M13.403 7.527H3.982m4.71-4.71v9.421"
    />
  </Svg>
)
export default FileAdd
