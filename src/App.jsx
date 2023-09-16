import { useState } from 'react';
import HeroSelect from './screens/HeroSelect';
import Versus from './screens/Versus';

function App() {
  const [isHeroSelected, setIsHeroSelected] = useState(false);

  return <div>{!isHeroSelected ? <HeroSelect onSelect={() => setIsHeroSelected(true)} /> : <Versus />}</div>;
}

export default App;
