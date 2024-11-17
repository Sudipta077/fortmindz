import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';
function App() {
  return (
   <Router>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/update/:id' element={<Update/>} />
      </Routes>
   </Router>
  );
}

export default App;
