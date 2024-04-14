import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TermsAndCondition = (props: any) => (
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
      d="M20.183 11.308c0 4.702-3.414 9.106-8.077 10.394a1.884 1.884 0 0 1-.98 0c-4.664-1.288-8.078-5.692-8.078-10.394V7.087c0-.789.596-1.683 1.337-1.981L9.74 2.914a4.988 4.988 0 0 1 3.76 0l5.355 2.192c.73.298 1.336 1.192 1.336 1.98l-.01 4.222Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M11.616 12.635a1.923 1.923 0 1 0 0-3.846 1.923 1.923 0 0 0 0 3.846ZM11.616 12.635v2.884"
    />
  </Svg>
)
export default TermsAndCondition
