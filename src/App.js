import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Update from './components/Update';
function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/update/:id' element={<Update/>} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
