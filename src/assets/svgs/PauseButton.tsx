import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const PauseButton = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={70}
    height={70}
    fill="none"
    // style={{backgroundColor:'yellow'}}
    {...props}
  >
    {/* <Circle cx={33.335} cy={33.335} r={33.335} fill="#865DFF" />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
    //   strokeWidth={2.25}
    // fill="#865DFF"
    // fillRule="evenodd"
    // clipRule="evenodd"
      d="M29.475 43.665v-21.33c0-2.025-.855-2.835-3.015-2.835h-5.445c-2.16 0-3.015.81-3.015 2.835v21.33c0 2.025.855 2.835 3.015 2.835h5.445c2.16 0 3.015-.81 3.015-2.835ZM48 43.665v-21.33c0-2.025-.855-2.835-3.015-2.835H39.54c-2.145 0-3.015.81-3.015 2.835v21.33c0 2.025.855 2.835 3.015 2.835h5.445c2.16 0 3.015-.81 3.015-2.835Z"
    /> */}
    <Circle cx={33.335} cy={33.335} r={33.335} fill="#865DFF" />
    <Path
      fill="#fff"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M29.475 43.665v-21.33c0-2.025-.855-2.835-3.015-2.835h-5.445c-2.16 0-3.015.81-3.015 2.835v21.33c0 2.025.855 2.835 3.015 2.835h5.445c2.16 0 3.015-.81 3.015-2.835ZM48 43.665v-21.33c0-2.025-.855-2.835-3.015-2.835H39.54c-2.145 0-3.015.81-3.015 2.835v21.33c0 2.025.855 2.835 3.015 2.835h5.445c2.16 0 3.015-.81 3.015-2.835Z"
    />
  </Svg>
)
export default PauseButton
