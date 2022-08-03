import { Routes, Route } from 'react-router-dom';

import Intro from './view/intro/intro';
import Quiz from './view/quiz/quiz';
import Results from './view/results/results';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Intro/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/results/:score" element={<Results/>}/>
      </Routes>
    </div>
  );
}

export default App;
