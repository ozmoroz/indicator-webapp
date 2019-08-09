import React, { useState } from 'react'
import { Button } from 'antd'
import { CirclePicker } from 'react-color'
import axios from 'axios'

const setLedColor = (color: string) => {
  const colorInt = parseInt(color, 16)
  axios
    .post('http://indicator.local/setLeds', {
      allRgb: colorInt
    })
    .catch(err => {
      console.log('Error setting color:', err)
    })
}

const SetColorPage: React.FC<{}> = () => {
  const [color, setColor] = useState('0') // Color as RGB hex string
  return (
    <div>
      <CirclePicker onChangeComplete={color => setColor(color.hex)} />
      <Button type="primary" onClick={() => setLedColor(color)}>
        Submit
      </Button>
    </div>
  )
}

export default SetColorPage
