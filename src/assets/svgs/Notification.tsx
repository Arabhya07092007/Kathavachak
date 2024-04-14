<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.6347 3.18286C8.45201 3.18286 5.86547 5.7694 5.86547 8.95209V11.7309C5.86547 12.3175 5.61547 13.2117 5.31739 13.7117L4.21162 15.5482C3.52893 16.6829 4.00008 17.9425 5.25008 18.3656C9.39432 19.7502 13.8655 19.7502 18.0097 18.3656C19.1732 17.9809 19.6828 16.6059 19.0482 15.5482L17.9424 13.7117C17.6539 13.2117 17.4039 12.3175 17.4039 11.7309V8.95209C17.4039 5.77902 14.8078 3.18286 11.6347 3.18286Z" stroke="#1C2A3A" stroke-width="1.44231" stroke-miterlimit="10" stroke-linecap="round"/>
<path d="M13.4134 3.46142C13.1153 3.37488 12.8076 3.30757 12.4903 3.26911C11.5673 3.15372 10.6826 3.22103 9.85571 3.46142C10.1346 2.74988 10.8269 2.24988 11.6346 2.24988C12.4423 2.24988 13.1346 2.74988 13.4134 3.46142Z" stroke="#1C2A3A" stroke-width="1.44231" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5194 18.7117C14.5194 20.2982 13.2213 21.5963 11.6347 21.5963C10.8463 21.5963 10.1155 21.2694 9.59628 20.7501C9.07704 20.2309 8.75012 19.5001 8.75012 18.7117" stroke="#1C2A3A" stroke-width="1.44231" stroke-miterlimit="10"/>
</svg>
import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Notification = (props: any) => (
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
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M11.635 3.183a5.774 5.774 0 0 0-5.77 5.77v2.778c0 .587-.25 1.48-.548 1.98l-1.105 1.837C3.529 16.683 4 17.942 5.25 18.366a20.117 20.117 0 0 0 12.76 0 1.925 1.925 0 0 0 1.038-2.818l-1.106-1.836c-.288-.5-.538-1.394-.538-1.981V8.952c0-3.173-2.596-5.77-5.77-5.77Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M13.413 3.461a6.494 6.494 0 0 0-3.558 0 1.91 1.91 0 0 1 1.78-1.211c.807 0 1.5.5 1.778 1.211Z"
    />
    <Path
      stroke="#1C2A3A"
      strokeMiterlimit={10}
      strokeWidth={1.442}
      d="M14.52 18.712a2.893 2.893 0 0 1-2.885 2.884c-.789 0-1.52-.327-2.039-.846a2.895 2.895 0 0 1-.846-2.038"
    />
  </Svg>
)
export default Notification
