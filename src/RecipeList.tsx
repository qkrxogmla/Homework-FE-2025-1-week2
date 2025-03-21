import './RecipeList.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import RecipeCard from './RecipeCard.tsx';

type Recipe = {
  id: number;
  name: string;
  difficulty: string;
  tags: string[];
  image: string;
};

const ITEMS_PER_PAGE = 6;

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    type RecipeResponse = {
      recipes: Recipe[];
      total: number;
      skip: number;
      limit: number;
    };

    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json() as Promise<RecipeResponse>)
      .then((data) => setRecipes(data.recipes))
      .catch(() => setError('오류'));
  }, []);

  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = recipes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="recipe-list">
      <h1 className="title">천개의 레시피</h1>
      <div className="grid">
        {paginatedRecipes.map((recipe) => (
          <Link
            to={`/recipe/${recipe.id}`}
            key={recipe.id}
            className="recipe-link"
          >
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>

      <div>
        <button
          className="pagination"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className="pagination"
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            style={{ fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="pagination"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
