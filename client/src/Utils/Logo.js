import React from 'react'

export default function Logo(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1480 1959" style={props.logoStyle}>
      <title>Logo</title>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path style={props.pathStyle} d="M740,980c-139.18,0-252-112.82-252-252S600.82,476,740,476V0l-3,15C330,15,0,345,0,752s330,737,737,737h3Z"/>
          <path style={props.pathStyle} d="M740,979c139.18,0,252,112.82,252,252s-112.82,252-252,252v476l3-15c407,0,737-330,737-737S1150,470,743,470h-3Z"/>
        </g>
      </g>
    </svg>
  )
}
