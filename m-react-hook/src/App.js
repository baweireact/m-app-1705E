import React, { useRef, useEffect } from 'react'

const App = () => {
  const inputEl = useRef(null)

  const handleFocus = () => {
    inputEl.current.focus()
  }  

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputEl}></input>
      <div>
        <button onClick={handleFocus}>获取焦点</button>
      </div>
    </div>
  )
}

export default App