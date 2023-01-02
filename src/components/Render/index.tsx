import { Button } from '@arco-design/web-react'
import {useMap, useMemoizedFn, useReactive, useResetState} from 'ahooks'
import React, {useDeferredValue, useCallback, useState } from 'react'
import CheckDemo from './CheckDemo'
import Son from './Son'

let count = 0
const fakeAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(count++)
    }, 2000)
  }) 
}

interface Item {
  id: string
  name: string
}
interface State {
  hello: string;
  count: number;
}

const Render = () => {
  // const [a, setA] = useState(false)
  const [b, setB] = useState(0)

  // const state = useReactive({
  //   count: 1,
  //   ob: {
  //     name: 1
  //   }
  // })

  // const [state, setState, resetState] = useResetState<State>({
  //   hello: '',
  //   count: 0,
  // });

  // const [map, { set, setAll, remove, reset, get }] = useMap<string, Item>([ 
  //   [
  //   'aa', 
  //   {
  //     id:'aaa',
  //     name: 'sbsf'
  //   }
  //   ]
  //  ])

  // const newB = useDeferredValue(b)


  const fn = useMemoizedFn(() => {console.log('fn', b)})

  const render = () => {
    // state.count++
    // state.ob.name++
    // // console.log('render----')
    // const id = `${Math.random()}`
    // set(id, {
    //   id,
    //   name: id 
    // })
    // setA(true)
    // const ret = await fakeAsync()   
    // setA(false)
    // console.log('ret', ret)
    // setB(ret)
    setB(pr => pr+1)
    // Promise.resolve().then(() => {
    // })
    setTimeout(() => {
      fn()
    })
  }




  return (
    <div>
      {b}
      <div>
        {/* {state.ob.name} */}
      </div>
       {/* <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
      <div>
        {a && <span>loading</span>}
      </div>
      ----{b}
      hello  */}

      {/* <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>
        <button
          type="button"
          style={{ marginRight: '8px' }}
          onClick={() => setState({ hello: 'world', count: 1 })}
        >
          set hello and count
        </button>

        <button type="button" onClick={resetState}>
          resetState
        </button>
      </p> */}

      {/* <Son fn={fn} /> */}

      {/* <Button onClick={render}>click</Button> */}
      <CheckDemo />
    </div>
  )
}

export default Render
