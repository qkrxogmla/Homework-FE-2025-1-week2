import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<RecipeList />}
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
