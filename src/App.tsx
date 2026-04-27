
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { QuestionsPage } from './pages/QuestionsPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { HighlightsPage } from './pages/HighlightsPage';

function App() {
  return (
    <Router basename="/resume-optimizer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:sessionId" element={<QuestionsPage />} />
        <Route path="/analysis/:sessionId" element={<AnalysisPage />} />
        <Route path="/highlights/:sessionId" element={<HighlightsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

