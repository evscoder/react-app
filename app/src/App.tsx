import './tailwind.css';
import './styles.scss';
import 'simplebar-react/dist/simplebar.min.css';
import Routing from './routing';

function App() {
  return (
    <div className={'page-wrapper'}>
      <Routing />
    </div>
  );
}

export default App;
