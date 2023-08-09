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

export default Stats;
