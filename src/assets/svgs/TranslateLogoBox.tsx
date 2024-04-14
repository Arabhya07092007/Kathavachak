import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const TrnaslateLogoBox = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    // style={{backgroundColor:'yellow'}}
    {...props}
  >
    <Path
      stroke="#2E2E5D"
      // stroke={props?.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M28.99 14.96h-9.98M24 13.28v1.68M26.5 14.94c0 4.3-3.36 7.78-7.5 7.78"
    />
    <Path
      // stroke={props?.color}
      stroke="#2E2E5D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M29 22.72c-1.8 0-3.4-.96-4.55-2.47"
    />
    <Path
      stroke="#2E2E5D"
      // stroke={props?.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 28h6c5 0 7-2 7-7v-6c0-5-2-7-7-7h-6c-5 0-7 2-7 7v6c0 5 2 7 7 7Z"
    />
    <Path
      fill="#2E2E5D"
      // fill={props?.color}
      d="M5.769 38.03v.74h-1.9V45h-.91v-6.23h-1.91v-.74h4.72Zm2.03 2.38c.16-.313.387-.557.68-.73.3-.173.663-.26 1.09-.26v.94h-.24c-1.02 0-1.53.553-1.53 1.66V45h-.91v-5.48h.91v.89Zm2.48 1.83c0-.56.114-1.05.34-1.47a2.47 2.47 0 0 1 .93-.99c.4-.233.844-.35 1.33-.35.48 0 .897.103 1.25.31.354.207.617.467.79.78v-1h.92V45h-.92v-1.02c-.18.32-.45.587-.81.8-.353.207-.766.31-1.24.31-.486 0-.926-.12-1.32-.36a2.526 2.526 0 0 1-.93-1.01c-.226-.433-.34-.927-.34-1.48Zm4.64.01c0-.413-.083-.773-.25-1.08a1.72 1.72 0 0 0-.68-.7c-.28-.167-.59-.25-.93-.25-.34 0-.65.08-.93.24-.28.16-.503.393-.67.7-.166.307-.25.667-.25 1.08 0 .42.084.787.25 1.1.167.307.39.543.67.71.28.16.59.24.93.24.34 0 .65-.08.93-.24a1.79 1.79 0 0 0 .68-.71c.167-.313.25-.677.25-1.09Zm5.128-2.83c.667 0 1.207.203 1.62.61.414.4.62.98.62 1.74V45h-.9v-3.1c0-.547-.136-.963-.41-1.25-.273-.293-.646-.44-1.12-.44-.48 0-.863.15-1.15.45-.28.3-.42.737-.42 1.31V45h-.91v-5.48h.91v.78c.18-.28.424-.497.73-.65.314-.153.657-.23 1.03-.23Zm5.667 5.67c-.42 0-.797-.07-1.13-.21a1.964 1.964 0 0 1-.79-.6c-.193-.26-.3-.557-.32-.89h.94a.927.927 0 0 0 .38.67c.233.173.537.26.91.26.347 0 .62-.077.82-.23.2-.153.3-.347.3-.58a.562.562 0 0 0-.32-.53c-.213-.12-.543-.237-.99-.35a8.145 8.145 0 0 1-1-.32 1.9 1.9 0 0 1-.66-.49c-.18-.22-.27-.507-.27-.86 0-.28.083-.537.25-.77a1.66 1.66 0 0 1 .71-.55c.307-.14.657-.21 1.05-.21.607 0 1.097.153 1.47.46.373.307.573.727.6 1.26h-.91a.934.934 0 0 0-.35-.69c-.207-.173-.487-.26-.84-.26-.327 0-.587.07-.78.21a.649.649 0 0 0-.29.55c0 .18.057.33.17.45.12.113.267.207.44.28.18.067.427.143.74.23.393.107.713.213.96.32.247.1.457.253.63.46.18.207.273.477.28.81 0 .3-.083.57-.25.81-.167.24-.403.43-.71.57-.3.133-.647.2-1.04.2Zm4.195-7.49V45h-.91v-7.4h.91Zm1.21 4.64c0-.56.114-1.05.34-1.47.227-.427.537-.757.93-.99.4-.233.844-.35 1.33-.35.48 0 .897.103 1.25.31.354.207.617.467.79.78v-1h.92V45h-.92v-1.02c-.18.32-.45.587-.81.8-.353.207-.766.31-1.24.31-.486 0-.926-.12-1.32-.36a2.524 2.524 0 0 1-.93-1.01c-.226-.433-.34-.927-.34-1.48Zm4.64.01c0-.413-.083-.773-.25-1.08a1.722 1.722 0 0 0-.68-.7c-.28-.167-.59-.25-.93-.25-.34 0-.65.08-.93.24a1.74 1.74 0 0 0-.67.7c-.166.307-.25.667-.25 1.08 0 .42.084.787.25 1.1.167.307.39.543.67.71.28.16.59.24.93.24.34 0 .65-.08.93-.24a1.79 1.79 0 0 0 .68-.71c.167-.313.25-.677.25-1.09Zm3.568-1.98v3.23c0 .267.057.457.17.57.114.107.31.16.59.16h.67V45h-.82c-.506 0-.886-.117-1.14-.35-.253-.233-.38-.617-.38-1.15v-3.23h-.71v-.75h.71v-1.38h.91v1.38h1.43v.75h-1.43Zm7.533 1.78c0 .173-.01.357-.03.55h-4.38c.033.54.216.963.55 1.27.34.3.75.45 1.23.45.393 0 .72-.09.98-.27.267-.187.453-.433.56-.74h.98a2.38 2.38 0 0 1-.88 1.29c-.44.327-.987.49-1.64.49-.52 0-.987-.117-1.4-.35a2.496 2.496 0 0 1-.96-.99c-.233-.433-.35-.933-.35-1.5s.113-1.063.34-1.49c.227-.427.543-.753.95-.98.413-.233.886-.35 1.42-.35.52 0 .98.113 1.38.34.4.227.706.54.92.94.22.393.33.84.33 1.34Zm-.94-.19c0-.347-.077-.643-.23-.89a1.447 1.447 0 0 0-.63-.57c-.26-.133-.55-.2-.87-.2-.46 0-.853.147-1.18.44-.32.293-.503.7-.55 1.22h3.46Z"
    />
  </Svg>
)
export default TrnaslateLogoBox