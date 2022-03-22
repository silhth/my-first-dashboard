import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';

import {Graph} from './components/Graph'
import {fetchAllDataJson } from './store/action';


function App() {
  const dispatch = useDispatch();

    useEffect(() => dispatch(fetchAllDataJson()), [dispatch]);
    
  return (
    <div className="App">
    
      <h1>Precision Agriculture</h1>
       <Graph/>
    </div>
  );
}

export default App;
