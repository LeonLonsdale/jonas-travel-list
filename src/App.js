import {useState} from 'react';

// const initialItems = [
//   {id: 1, description: 'Passports', quantity: 2, packed: false},
//   {id: 2, description: 'Socks', quantity: 12, packed: true},
// ];

const App = () => {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => setItems((items) => [...items, item]);
  const handleDelItems = (id) => setItems((items) => items.filter((item) => item.id !== id));
  return (
    <div className="app">
      <Logo />
      {/* Convention to use name: onAdd... */}
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDelItems={handleDelItems} />
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

const PackingList = ({items, onDelItems}) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDelItems={onDelItems} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({item, onDelItems}) => {
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDelItems(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({items}) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const packedPerc = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        You have {numItems} items in your list. You've already packed {packedPerc}% of those items.
      </em>
    </footer>
  );
};

export default App;
