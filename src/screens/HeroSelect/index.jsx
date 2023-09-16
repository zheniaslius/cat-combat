import './styles.css';
import HeroGrid from '../../components/HeroGrid';

const HeroSelect = ({onSelect}) => {
  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Select your fighter</h2>
      <HeroGrid onSelect={onSelect}/>
    </div>
  );
};

export default HeroSelect;
