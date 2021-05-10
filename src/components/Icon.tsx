import React from 'react'
import SVG from 'react-inlinesvg'

const reqIcons = require.context('assets/icons', true, /\.svg$/)

type IconProps = {
  name: string,
  size?: number,
  strokeColor?: string,
  fillColor?: string
}

function Icon({ name, size = 16, strokeColor, fillColor, ...other }: IconProps) {
  return (
    <i
      className="icon"
      style={{
        display: 'inline-block',
        height: size,
        width: size
      }}
      {...other}
    >
      <SVG
        style={{
          display: 'block',
          height: size,
          width: size,
          stroke: strokeColor,
          fill: fillColor
        }}
        src={reqIcons?.(`./${name}.svg`)?.default}
      />
    </i>
  )
}

export default Icon

export type { IconProps }
