import React, { useState } from 'react'
import { Button } from 'antd'
import { CirclePicker } from 'react-color'

// IP: 192.168.180.18

const setLedColor = (color: string) => {
  const colorInt = parseInt(color.slice(1), 16) // Strip leading '#', convert to int
  fetch('http://indicator.local/setled', {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({
      allRgb: colorInt
    })
  }).catch(err => {
    console.log('Error setting color:', err)
  })
}

const SetColorPage: React.FC<{}> = () => {
  const [color, setColor] = useState('0') // Color as RGB hex string
  return (
    <div>
      <CirclePicker
        color={color}
        onChangeComplete={color => setColor(color.hex)}
      />
      <Button type="primary" onClick={() => setLedColor(color)}>
        Submit
      </Button>
    </div>
  )
}

export default SetColorPage
