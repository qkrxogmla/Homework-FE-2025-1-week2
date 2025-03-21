import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './RecipeDetail.module.css';
type Recipe = {
  id: number;
  name: string;
  difficulty: string;
  tags: string[];
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  cuisine: string;
  mealType: string[];
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  servings: number;
  userId: number;
};

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data as Recipe))
      .catch(() => setError('레시피 정보를 불러오는데 실패했습니다.'));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!recipe) return;

  return (
    <div className="recipe-detail">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-image"
      />
      <h1>{recipe.name}</h1>
      <span className="difficulty">{recipe.difficulty}</span>
      <p className={styles.total_time}>
        총 요리시간 {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
      </p>
      <p>준비시간 {recipe.prepTimeMinutes}분</p>
      <p>조리시간 {recipe.cookTimeMinutes}분</p>

      <div className="tags">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="tag"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.ingredients}>
        <h2>재료</h2>
        <p>{recipe.ingredients.join(', ')}</p>
      </div>

      <h2>레시피</h2>
      <ol>
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
      <h2>요리 정보</h2>
      <ul>
        <li>유형: {recipe.cuisine}</li>
        <li>음식특징: {recipe.mealType}</li>
        <li>칼로리: {recipe.caloriesPerServing}</li>
        <li>별점: {recipe.rating}</li>
      </ul>
    </div>
  );
};

export default RecipeDetail;
