import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 460.114 460.114"
      xmlSpace="preserve"
      enableBackground="new 0 0 460.114 460.114"
      {...props}
    >
      <Path fill="#171717" d="M393.538 203.629L102.557 5.543a31.97 31.97 0 00-32.94-1.832 31.967 31.967 0 00-17.022 28.26v396.173a31.97 31.97 0 0049.962 26.428l290.981-198.087a31.97 31.97 0 000-52.856z" />
    </Svg>
  )
}

export default SvgComponent