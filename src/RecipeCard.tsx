import './RecipeCard.css';

type RecipeProps = {
  recipe: {
    id: number;
    name: string;
    difficulty: string;
    tags: string[];
    image: string;
  };
};

const RecipeCard = ({ recipe }: RecipeProps) => {
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-image"
      />
      <div className="recipe-info">
        <h2>{recipe.name}</h2>
        <span className="difficulty">{recipe.difficulty}</span>
        <div className="tags">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
