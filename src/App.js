import './App.css';
import Tags from './components/Tags/Tags';
import TitleBar from './components/TitleBar/TitleBar';

const App = () => {
  return (
    <div className='main'>
      <TitleBar/>
      <Tags/>
    </div>
  );
}

export default App;
