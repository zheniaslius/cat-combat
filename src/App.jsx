import { useState, useEffect } from 'react';
import HeroSelect from './screens/HeroSelect';
import Versus from './screens/Versus';

function App() {
  const [isHeroSelected, setIsHeroSelected] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const handleHeroSelected = () => {
    setTimeout(() => setIsHeroSelected(true), 2000);
  };

  const renderScreen = () => {
    if (startGame) {
      return <h1>Game started</h1>;
    }
    if (!isHeroSelected) {
      return <HeroSelect onSelect={handleHeroSelected} />;
    }
    return <Versus />;
  };

  useEffect(() => {
    if (isHeroSelected) {
      setTimeout(() => setStartGame(true), 4000);
    }
  }, [isHeroSelected]);

  return <div>{renderScreen()}</div>;
}

export default App;
