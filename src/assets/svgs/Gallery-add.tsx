import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import CustomText from '../../components/atoms/CustomText';
import { View } from 'react-native';
const GalleryAdd = (props: any) => (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      fill="none"
      style={{backgroundColor: 'yellow'}}
      {...props}>
      <Path
        stroke="#865DFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.875 18.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
      />
      <Path
        stroke="#865DFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M24.375 3.75h-7.5C7.5 3.75 3.75 7.5 3.75 16.875v11.25C3.75 37.5 7.5 41.25 16.875 41.25h11.25c9.375 0 13.125-3.75 13.125-13.125V18.75"
      />
      <Path
        stroke="#865DFF"
        strokeLinecap="round"
        strokeWidth={2}
        d="M29.531 9.375h10.313M34.688 14.531V4.22"
      />
      <Path
        stroke="#865DFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m5.006 35.531 9.244-6.206c1.481-.994 3.619-.881 4.95.263l.619.543c1.462 1.257 3.825 1.257 5.287 0l7.8-6.693c1.463-1.257 3.825-1.257 5.288 0l3.056 2.625"
      />
    </Svg>
);
export default GalleryAdd;
