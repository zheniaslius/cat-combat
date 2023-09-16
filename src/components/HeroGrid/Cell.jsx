const Cell = ({ isASelected, isBSelected }) => {
  return <div className={`cell ${isASelected ? 'selected-a' : ''} ${isBSelected ? 'selected-b' : ''}`}></div>;
};

export default Cell;
