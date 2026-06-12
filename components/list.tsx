import React from 'react'

interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  )
}

export default List