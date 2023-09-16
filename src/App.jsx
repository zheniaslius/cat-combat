import { useState } from 'react';
import HeroSelect from './screens/HeroSelect';
import Versus from './screens/Versus';

function App() {
  const [isHeroSelected, setIsHeroSelected] = useState(false);

  const handleHeroSelected = () => {
    setTimeout(() => setIsHeroSelected(true), 2000);
  };

  return <div>{!isHeroSelected ? <HeroSelect onSelect={handleHeroSelected} /> : <Versus />}</div>;
}

export default App;
