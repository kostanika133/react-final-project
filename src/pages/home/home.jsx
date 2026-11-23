import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tastyApi, { isTastyApiConfigured } from "../../api/tastyApi";
import { useAppContext } from "../../context/appProvider";
import { recipesFunction } from "../../context/actionCreators";
import paths from "../../constants/path";

function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const [featuredRecipes, setFeaturedRecipes] = useState(
    state.recipes.slice(0, 3),
  );
  const [loading, setLoading] = useState(!state.recipes.length);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.recipes.length) {
      setFeaturedRecipes(state.recipes.slice(0, 3));
      setLoading(false);
      return;
    }

    if (!isTastyApiConfigured) {
      setError("Tasty API is not configured.");
      setLoading(false);
      return;
    }

    let isActive = true;

    async function getFeaturedRecipes() {
      try {
        const data = await tastyApi("/recipes/list", {
          from: 0,
          size: 20,
        });

        if (!Array.isArray(data.results)) {
          throw new Error("Could not load featured recipes.");
        }

        if (!isActive) {
          return;
        }

        setFeaturedRecipes(data.results.slice(0, 3));
        dispatch(recipesFunction(data.results));
      } catch (err) {
        if (isActive) {
          setError(err.message || "Could not load featured recipes.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    getFeaturedRecipes();

    return () => {
      isActive = false;
    };
  }, [state.recipes, dispatch]);

  return (
    <div className="home">
      <header className="hero">
        <h1 className="hero_title">Welcome to Grand Recipes</h1>

        <ul className="hero_list">
          <li>Discover new recipes</li>
          <li>Find meals for every day</li>
          <li>Save the recipes you love</li>
        </ul>

        <button className="hero_button" onClick={() => navigate(paths.Recipes)}>
          Explore recipes
        </button>
      </header>

      <main className="featured">
        <h2 className="featured_title">Featured recipes</h2>

        {loading && <p>Loading featured recipes...</p>}

        {error && <p>{error}</p>}

        {!loading &&
          featuredRecipes.map((recipe) => (
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
            </div>
          ))}
      </main>
    </div>
  );
}

export default Home;
