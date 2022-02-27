import './App.css';
import Tags from './components/Tags/Tags';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import TitleBar from './components/TitleBar/TitleBar';
import Timeline from './components/Timeline/Timeline';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className='main'>
      <TitleBar/>
      <BrowserRouter basename='/'>
        <Routes>

          <Route key='signin' path='/' element= {
            <SignIn />
          }></Route>

          <Route key='signup' path='/signup' element= {
            <SignUp />
          }></Route>

          <Route key='tags' path='/tags' element= {
            <Tags />
          }></Route>

          <Route key='timeline' path='/timeline' element= {
            <Timeline />
          }></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
