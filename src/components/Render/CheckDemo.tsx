import { Button, Checkbox, Input } from '@arco-design/web-react';
import React, { useMemo, useState } from 'react';
import { useSelections } from 'ahooks';


const fakeAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from({length:10}, (v,k) => ({
        id: `${k}-i` 
      })))
    }, 500)
  }) 
}



export default () => {
  const [hideOdd, setHideOdd] = useState(false);
  const [tag, setTag] = useState([
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    }
  ])
  const list = useMemo(() => {
    // if (hideOdd) {
    //   return [2, 4, 6, 8];
    // }
    // return [1, 2, 3, 4, 5, 6, 7, 8];
    return tag.map((item) => item.id)
  }, [tag]);

  const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
    list,
    [1],
  );

  return (
    <div>
      <Input onChange={(val) => {
        console.log('val', val)
        if (val) {
        fakeAsync().then((rs) => {
          console.log('rsjhjla', rs)
          setTag([...rs])
        })
        } else {
          setTag([{
            id: 1
          },
          {
            id: 2
          },
          {
            id: 3
          }])
        }
      }} />
      <div>Selected : {selected.join(',')}</div>
      <div style={{ borderBottom: '1px solid #E9E9E9', padding: '10px 0' }}>
        <Checkbox checked={allSelected} onClick={toggleAll} indeterminate={partiallySelected}>
          Check all
        </Checkbox>
        <Checkbox checked={hideOdd} onClick={() => setHideOdd((v) => !v)}>
          Hide Odd
        </Checkbox>
      </div>
        {list.map((o, idx) => (
            <Checkbox key={idx} checked={isSelected(o)} onClick={() => toggle(o)}>
              {o}
            </Checkbox>
        ))}
      <Button onClick={() => {
        setTag((pre) => {
          return [...pre, {id: Math.random()}]
        })
      }}>loading</Button>
    </div>
  );
};