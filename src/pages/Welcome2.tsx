import { useState } from 'react'
import styled from 'styled-components'

const BlueBox = styled.div`
  background-color: blue;
  color: red;
  // 支持 scss
  &:hover {
    background-color: aliceblue;
  }
`
// 复用组件样式
const BlueBoxWithWhiteText = styled(BlueBox)`
  color: white;
`
// 接收参数
const Button = styled.button`
  color: ${props => props.color};
`
export const Welcome2 = () => {
  const [color, setColor] = useState<'red' | 'green'>('red')
  const onClick = () => {
    setColor(color === 'red' ? 'green' : 'red')
  }
  return (
    <div>
      <BlueBox style={{ border: '10px solid red' }}>2</BlueBox>
      <BlueBoxWithWhiteText>22</BlueBoxWithWhiteText>
      <Button onClick={onClick} color={color}>change my color</Button>
    </div>
  )
}
