import React, { useState, useEffect } from 'react'

const App = () => {
  const [ count, setCount ] = useState(0)
  const [ obj, setObj ] = useState({
    name: 'xu',
    job: 'web'
  })

  //初始化state可以使用函数
  const [ name, setName ] = useState(() => {
    return 'xu'
  })
  
  //每次更新完都会执行
  useEffect(() => {
    console.log(count)
    return () => {
      console.log('执行当前effect之前对上一个effect进行清除！' + count)
    }
  })

  //只执行一次
  useEffect(() => {
    console.log('只执行一次！')
  }, [])

  useEffect(() => {
    console.log('count更新时执行' + count)
  }, ['count'])

  return (
    <div>
      { count }
      <div>
        <button onClick={() => { setCount(count - 1) }}>减</button>
        <button onClick={() => { setCount(count + 1) }}>加</button>
        <button onClick={() => { setCount(prevCount =>  {
          return prevCount + 1
        }) }}>加</button>
        <button onClick={() => setCount(0)}>重置</button>
      </div>
      { obj.name }, { obj.job }
      <div>
        <button onClick={() => setObj({ name: '徐' })}>改名(删除了job字段)</button>
        <button onClick={() => setObj( prevObj => {
          return {...prevObj,  name: '星河'}
        })}>改名(不会删除job字段)</button>
      </div>
      <div>
        {name}
      </div>
    </div>
  )
}

export default App