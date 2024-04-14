import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DirectSendLogo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={31}
    fill="none"
    {...props}
  >
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.938}
      d="M15.5 11.625V2.583l-2.583 2.584M15.5 2.583l2.583 2.584M2.558 16.792h5.696c.49 0 .93.27 1.15.71l1.51 3.023a2.583 2.583 0 0 0 2.313 1.433h4.56c.98 0 1.872-.555 2.311-1.433l1.512-3.023c.22-.44.671-.71 1.15-.71h5.63"
    />
    <Path
      stroke="#060047"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.938}
      d="M9.042 6.626c-4.573.672-6.459 3.359-6.459 8.874v3.875c0 6.458 2.584 9.042 9.042 9.042h7.75c6.458 0 9.042-2.584 9.042-9.042V15.5c0-5.515-1.886-8.202-6.459-8.874"
    />
  </Svg>
)
export default DirectSendLogo
