import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tastyApi, { isTastyApiConfigured } from "../../api/tastyApi";
import { useAppContext } from "../../context/appProvider";
import {
  favoritesFunction,
  recipesFunction,
} from "../../context/actionCreators";
import "../recipes/recipes.css";
import "./favorites.css";

function Favorites() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const favoriteRecipes = state.favorites
    .map((id) => state.recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  useEffect(() => {
    let isActive = true;

    async function getMissingRecipes() {
      const missingIds = state.favorites.filter(
        (id) => !state.recipes.some((recipe) => recipe.id === id),
      );

      if (missingIds.length === 0) {
        setLoading(false);
        setError("");
        return;
      }

      if (!isTastyApiConfigured) {
        setError("Tasty API is not configured.");
        return;
      }

      setLoading(true);
      setError("");

      const updatedRecipes = [...state.recipes];

      try {
        for (const id of missingIds) {
          const data = await tastyApi("/recipes/get-more-info", { id });

          if (!isActive) {
            return;
          }

          updatedRecipes.push(data);
        }

        if (isActive) {
          dispatch(recipesFunction(updatedRecipes));
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Could not load your favorite recipes.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    getMissingRecipes();

    return () => {
      isActive = false;
    };
  }, [state.favorites, state.recipes, dispatch]);

  function removeFavorite(id) {
    const updatedFavorites = state.favorites.filter(
      (favorite) => favorite !== id,
    );

    dispatch(favoritesFunction(updatedFavorites));
  }

  return (
    <div className="recipes_wrapper">
      <div className="recipes_page">
        <header className="recipes_header">
          <h1>Your favorite recipes</h1>
        </header>

        {loading && <p>Loading your favorite recipes...</p>}

        {error && <p>{error}</p>}

        {!loading && favoriteRecipes.length === 0 ? (
          <div className="favorites_empty">
            <p>You haven't saved any recipes yet.</p>

            <button onClick={() => navigate("/recipes")}>
              Explore recipes
            </button>
          </div>
        ) : (
          <main className="recipes_list">
            {favoriteRecipes.map((recipe) => (
              <div
                className="recipe_card"
                key={recipe.id}
                onClick={() =>
                  navigate(`/recipes/${recipe.id}`, { state: { recipe } })
                }
              >
                {recipe.thumbnail_url ? (
                  <img
                    className="recipe_image"
                    src={recipe.thumbnail_url}
                    alt={recipe.name}
                  />
                ) : (
                  <div className="recipe_image_placeholder">
                    No image available
                  </div>
                )}

                <p className="recipe_description">
                  {recipe.description || "No description available."}
                </p>

                <p className="recipe_cooktime">
                  {recipe.cook_time_minutes ?? "Unknown"} minutes
                </p>

                <h2 className="recipe_name">{recipe.name}</h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(recipe.id);
                  }}
                >
                  Remove from favorites
                </button>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
}

export default Favorites;
