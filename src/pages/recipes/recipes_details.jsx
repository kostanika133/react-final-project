import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import tastyApi, { isTastyApiConfigured } from "../../api/tastyApi";
import { useAppContext } from "../../context/appProvider";
import {
  favoritesFunction,
  recipesFunction,
} from "../../context/actionCreators";
import paths from "../../constants/path";
import "./recipes_details.css";

function Recipes_Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAppContext();

  const recipeId = Number(id);

  const savedRecipe =
    location.state?.recipe ||
    state.recipes.find((item) => item.id === recipeId);

  const [recipe, setRecipe] = useState(savedRecipe || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFavorite = state.favorites.includes(recipeId);

  useEffect(() => {
    let isActive = true;

    async function getRecipe() {
      if (savedRecipe?.sections?.length && savedRecipe?.instructions?.length) {
        setRecipe(savedRecipe);
        setLoading(false);
        setError("");
        return;
      }

      if (!isTastyApiConfigured) {
        setRecipe(savedRecipe || null);
        setError("Tasty API is not configured.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await tastyApi("/recipes/get-more-info", {
          id: recipeId,
        });

        if (!isActive) {
          return;
        }

        setRecipe(data);

        const updatedRecipes = [
          ...state.recipes.filter((item) => item.id !== recipeId),
          data,
        ];

        dispatch(recipesFunction(updatedRecipes));
      } catch (err) {
        if (isActive) {
          setError(err.message || "Could not load this recipe.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    getRecipe();

    return () => {
      isActive = false;
    };
  }, [recipeId, savedRecipe, state.recipes, dispatch]);

  function toggleFavorite() {
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = state.favorites.filter(
        (favorite) => favorite !== recipeId,
      );
    } else {
      updatedFavorites = [...state.favorites, recipeId];
    }

    dispatch(favoritesFunction(updatedFavorites));
  }

  if (loading && !recipe) {
    return <h1 className="recipe_not_found">Loading recipe...</h1>;
  }

  if (!recipe) {
    return (
      <div className="recipe_not_found">
        <h1>Recipe not found</h1>
        {error && <p>{error}</p>}
        <button onClick={() => navigate(paths.Recipes)}>Back to recipes</button>
      </div>
    );
  }

  return (
    <div className="recipe_details">
      <button
        className="details_back_button"
        onClick={() => navigate(paths.Recipes)}
      >
        Back to recipes
      </button>

      {error && <p className="nutrition_unavailable">{error}</p>}

      <h1 className="details_title">{recipe.name}</h1>

      <div className="details_image_container">
        {recipe.thumbnail_url ? (
          <img
            className="details_image"
            src={recipe.thumbnail_url}
            alt={recipe.name}
          />
        ) : (
          <div className="recipe_image_placeholder">No image available</div>
        )}
      </div>

      <p className="details_description">
        {recipe.description || "No description available."}
      </p>

      <button className="details_favorite_button" onClick={toggleFavorite}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </button>

      <div className="details_info">
        <p className="details_info_item">
          Preparation: {recipe.prep_time_minutes ?? "Unknown"} minutes
        </p>

        <p className="details_info_item">
          Cooking: {recipe.cook_time_minutes ?? "Unknown"} minutes
        </p>

        <p className="details_info_item">
          Total time: {recipe.total_time_minutes ?? "Unknown"} minutes
        </p>

        <p className="details_info_item">
          Servings: {recipe.num_servings ?? "Unknown"}
        </p>
      </div>

      <section className="details_ingredients">
        <h2 className="details_section_title">Ingredients</h2>

        {recipe.sections?.length ? (
          recipe.sections.map((section, index) => (
            <div
              className="details_ingredient_section"
              key={section.position ?? index}
            >
              {section.name && (
                <h3 className="details_subtitle">{section.name}</h3>
              )}

              <ul className="details_ingredient_list">
                {section.components?.map((ingredient, index) => (
                  <li
                    className="details_ingredient"
                    key={ingredient.id ?? index}
                  >
                    {ingredient.raw_text}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="nutrition_unavailable">
            Ingredient information unavailable.
          </p>
        )}
      </section>

      <section className="details_instructions">
        <h2 className="details_section_title">Instructions</h2>

        {recipe.instructions?.length ? (
          <ol className="details_instruction_list">
            {recipe.instructions.map((instruction, index) => (
              <li className="details_instruction" key={instruction.id ?? index}>
                {instruction.display_text}
              </li>
            ))}
          </ol>
        ) : (
          <p className="nutrition_unavailable">Instructions unavailable.</p>
        )}
      </section>

      <section className="details_nutrition">
        <h2 className="details_section_title">Nutrition</h2>

        {recipe.nutrition ? (
          <div className="recipe_nutrition">
            <p className="nutrition_item">
              Calories: {recipe.nutrition.calories ?? "Unknown"}
            </p>

            <p className="nutrition_item">
              Protein: {recipe.nutrition.protein ?? "Unknown"} g
            </p>

            <p className="nutrition_item">
              Fat: {recipe.nutrition.fat ?? "Unknown"} g
            </p>

            <p className="nutrition_item">
              Carbohydrates: {recipe.nutrition.carbohydrates ?? "Unknown"} g
            </p>

            <p className="nutrition_item">
              Fiber: {recipe.nutrition.fiber ?? "Unknown"} g
            </p>

            <p className="nutrition_item">
              Sugar: {recipe.nutrition.sugar ?? "Unknown"} g
            </p>
          </div>
        ) : (
          <p className="nutrition_unavailable">
            Nutrition information unavailable.
          </p>
        )}
      </section>
    </div>
  );
}

export default Recipes_Details;
