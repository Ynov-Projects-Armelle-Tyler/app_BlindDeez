import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#FFFFFF"
      {...props}
    >
      <Path fill="none" d="M0 0H24V24H0z" />
      <Path d="M21.58 16.09l-1.09-7.66A3.996 3.996 0 0016.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zm-2.1.72a.54.54 0 01-.42.19c-.15 0-.29-.06-.39-.16L15.83 14H8.17l-2.84 2.84c-.1.1-.24.16-.39.16a.54.54 0 01-.42-.19.52.52 0 01-.13-.44l1.09-7.66C5.63 7.74 6.48 7 7.47 7h9.06c.99 0 1.84.74 1.98 1.72l1.09 7.66c.03.2-.05.34-.12.43z" />
      <Path d="M9 8L8 8 8 10 6 10 6 11 8 11 8 13 9 13 9 11 11 11 11 10 9 10z" />
      <Circle cx={17} cy={12} r={1} />
      <Circle cx={15} cy={9} r={1} />
    </Svg>
  )
}

export default SvgComponent
