import {useState} from 'react';

import Item from './Item';

const PackingList = ({items, onDelItems, onToggleItems, onClearItems}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;
  // Derived state
  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDelItems={onDelItems} onToggleItems={onToggleItems} key={item.id} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
};

export default PackingList;
