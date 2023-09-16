import { useEffect, useState, useCallback } from 'react';
import Cell from './Cell';
import './styles.css';

const COLS_COUNT = 3;
const ROWS_COUNT = 3;
const initialHero = [0, 0];
const initialSelections = { playerA: null, playerB: null };

const isSelected = (player, i, j) => {
  if (!player) return false;
  return i === player[0] && j === player[1];
};

const renderGrid = (playerA, playerB) => {
  const grid = [];
  for (let i = 0; i < ROWS_COUNT; i++) {
    for (let j = 0; j < COLS_COUNT; j++) {
      const isPlayerASelected = isSelected(playerA, i, j);
      const isPlayerBSelected = isSelected(playerB, i, j);
      const cell = <Cell key={`${i}-${j}`} isASelected={isPlayerASelected} isBSelected={isPlayerBSelected} />;
      grid.push(cell);
    }
  }

  return grid;
};

const HeroGrid = ({ onSelect }) => {
  const [selectedPlayerA, setSelectedPlayerA] = useState(initialHero);
  const [selectedPlayerB, setSelectedPlayerB] = useState();
  const [selections, setSelections] = useState(initialSelections);

  const handleKeyDown = useCallback(
    (event) => {
      const selected = !selections.playerA ? selectedPlayerA : selectedPlayerB;
      const selectFn = !selections.playerA ? setSelectedPlayerA : setSelectedPlayerB;
      if (event.key === 'Enter') {
        setSelections({
          playerA: true,
          playerB: selections.playerA && true,
        });
        setSelectedPlayerB(initialHero);
      }
      if (event.key === 'ArrowUp' && selected[0] > 0) {
        selectFn([selected[0] - 1, selected[1]]);
      } else if (event.key === 'ArrowDown' && selected[0] < ROWS_COUNT - 1) {
        selectFn([selected[0] + 1, selected[1]]);
      } else if (event.key === 'ArrowLeft' && selected[1] > 0) {
        selectFn([selected[0], selected[1] - 1]);
      } else if (event.key === 'ArrowRight' && selected[1] < COLS_COUNT - 1) {
        selectFn([selected[0], selected[1] + 1]);
      }
    },
    [selections, selectedPlayerA, selectedPlayerB, setSelections]
  );

  useEffect(() => {
    Object.values(selections).every((s) => !!s) && onSelect();
  }, [selections, onSelect]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return <div className="grid">{renderGrid(selectedPlayerA, selectedPlayerB)}</div>;
};

export default HeroGrid;
