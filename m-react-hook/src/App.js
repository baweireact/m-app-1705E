import React, { useState, useRef, useEffect } from 'react'

//自定义hook，获取上一轮的state
const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const App = () => {
  const [ count, setCount ] = useState(0)

  const prevCount = usePrevious(count)

  return (
    <div>
      {count}, {prevCount}
      <div>
        <button onClick={() => setCount(count + 1)}>加</button>
      </div>
    </div>
  )
}

export default App