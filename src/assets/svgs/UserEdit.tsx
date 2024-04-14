import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const UserEdit = (props: any) => (
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
      d="M11.615 11.846a4.808 4.808 0 1 0 0-9.615 4.808 4.808 0 0 0 0 9.615Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="m18.548 15.442-3.404 3.404c-.134.135-.26.385-.288.567l-.183 1.299c-.067.47.26.798.731.73l1.298-.182c.183-.03.442-.154.567-.289l3.404-3.404c.587-.586.866-1.269 0-2.134-.856-.856-1.538-.577-2.125.01Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M18.058 15.933a3.063 3.063 0 0 0 2.135 2.134"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.442}
      d="M3.356 21.462c0-3.722 3.702-6.731 8.26-6.731 1 0 1.961.144 2.855.413"
    />
  </Svg>
)
export default UserEdit
