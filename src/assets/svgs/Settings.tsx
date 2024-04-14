import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Setting = (props: any) => (
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
      d="M11.616 14.423a2.885 2.885 0 1 0 0-5.77 2.885 2.885 0 0 0 0 5.77Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M2 12.385v-1.693c0-1 .817-1.827 1.827-1.827 1.74 0 2.452-1.23 1.577-2.74-.5-.865-.202-1.99.673-2.49l1.664-.952c.76-.452 1.74-.183 2.192.577l.106.182c.865 1.51 2.288 1.51 3.163 0l.106-.182c.452-.76 1.433-1.03 2.192-.577l1.664.952c.875.5 1.173 1.625.673 2.49-.875 1.51-.164 2.74 1.577 2.74 1 0 1.826.818 1.826 1.827v1.693c0 1-.817 1.827-1.826 1.827-1.74 0-2.452 1.23-1.577 2.74.5.875.202 1.99-.673 2.49l-1.664.952c-.76.452-1.74.183-2.192-.577l-.106-.182c-.865-1.51-2.288-1.51-3.163 0l-.106.182c-.452.76-1.433 1.03-2.192.577l-1.664-.952a1.826 1.826 0 0 1-.673-2.49c.875-1.51.163-2.74-1.577-2.74A1.832 1.832 0 0 1 2 12.385Z"
    />
  </Svg>
)
export default Setting
