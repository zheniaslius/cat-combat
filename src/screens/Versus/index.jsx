import { useEffect, useState, useCallback } from 'react';
import Box from './Box';
import './styles.css';

const qwertyKeys = ['q', 'w', 'e', 'r', 't', 'y'];
const CODES = [null, '👽', '👾', '🤖'];

const initialState = qwertyKeys.reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {});

const Versus = () => {
  const [codesState, setCodesStates] = useState(initialState);

  const handleKeyDown = useCallback(
    ({ key }) => {
      setCodesStates((prevState) => ({
        ...prevState,
        [key]: codesState[key] === CODES.length - 1 ? 0 : prevState[key] + 1,
      }));
    },
    [codesState]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const renderCodes = () => {
    const list = [];
    Object.keys(codesState).forEach((key) => {
      list.push(<Box key={key} code={CODES[codesState[key]]} />);
    });
    return list;
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Versus</h2>
      <div className="codes-container">{renderCodes()}</div>
    </div>
  );
};

export default Versus;
