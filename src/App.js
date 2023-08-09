import {useState} from 'react';

import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

// const initialItems = [
//   {id: 1, description: 'Passports', quantity: 2, packed: false},
//   {id: 2, description: 'Socks', quantity: 12, packed: true},
// ];

const App = () => {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => setItems((items) => [...items, item]);
  const handleDelItems = (id) => setItems((items) => items.filter((item) => item.id !== id));
  const handleToggleItems = (id) =>
    setItems((items) =>
      items.map((item) => (item.id === id ? {...item, packed: !item.packed} : item))
    );
  const handleClearItems = () => {
    const confirmed = window.confirm('Are you sure you want to delete all items?');

    if (confirmed) setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      {/* Convention to use name: onAdd... */}
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDelItems={handleDelItems}
        onToggleItems={handleToggleItems}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
