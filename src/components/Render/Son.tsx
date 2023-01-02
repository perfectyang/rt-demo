import React from 'react'

interface IPros {
  fn?: () => void
}

const Son: React.FC<IPros> = (pros) => {
  return (
    <div>
      son
    </div>
  )
}

export default React.memo(Son)

