import {useState} from 'react';

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

const Logo = () => {
  return <h1>🛫🌴 Far Away 🧳🌞</h1>;
};

const Form = ({onAddItems}) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select name="" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({items, onDelItems, onToggleItems, onClearItems}) => {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

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

const Item = ({item, onDelItems, onToggleItems}) => {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelItems(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({items}) => {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const packedPerc = Math.round((numPacked / numItems) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {packedPerc === 100
          ? `You've got everything  🛫`
          : `You have ${numItems} items in your list. You've already packed ${numPacked} (${packedPerc}%) of
        those items.`}
      </em>
    </footer>
  );
};

export default App;
