import React, { useState } from 'react'
import { Button } from 'antd'
import { CirclePicker, HSLColor } from 'react-color'

// IP: 192.168.180.18

// Convert HSL to HSB
// https://gist.github.com/xpansive/1337890
const hsl2hsb = (hslColor: HSLColor) => {
  let { s: sat, l: light, h: hue } = hslColor
  sat *= light < 0.5 ? light : 1 - light
  return {
    //[hue, saturation, value]
    //Range should be between 0 - 1
    h: hue, //Hue stays the same
    s: (2 * sat) / (light + sat), //Saturation
    b: light + sat //Value
  }
}

const setLedColor = (hslColor: HSLColor) => {
  const hsbColor = hsl2hsb(hslColor)
  const socket = new WebSocket('ws://192.168.1.68')

  // Connection opened
  socket.addEventListener('open', function(event) {
    const msg = JSON.stringify({
      cmd: 'setColorHSB',
      H: hsbColor.h,
      S: hsbColor.s,
      B: hsbColor.b
    })
    console.log('Sending message:', msg)
    socket.send(msg)
  })

  socket.addEventListener('error', function(event) {
    console.log('Websocket error event:')
    console.dir(event)
  })

  socket.addEventListener('close', function(event) {
    console.log('Websocket closed.')
  })

  //   fetch('http://indicator.local/setled', {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     body: JSON.stringify({
  //       allRgb: colorInt
  //     })
  //   }).catch(err => {
  //     console.log('Error setting color:', err)
  //   })
}

const SetColorPage: React.FC<{}> = () => {
  const [color, setColor] = useState<HSLColor>({ h: 0, s: 0, l: 0 }) // Color as RGB hex string
  return (
    <div>
      <CirclePicker
        color={color}
        onChangeComplete={color => setColor(color.hsl)}
      />
      <Button type="primary" onClick={() => setLedColor(color)}>
        Submit
      </Button>
    </div>
  )
}

export default SetColorPage
