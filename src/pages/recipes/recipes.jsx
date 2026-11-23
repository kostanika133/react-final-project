import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import recipesData from "../../data/recipesData";
import tastyApi, { isTastyApiConfigured } from "../../api/tastyApi";
import { useAppContext } from "../../context/appProvider";
import {
  favoritesFunction,
  recipesFunction,
} from "../../context/actionCreators";
import "./recipes.css";

const pageSize = 20;

function Recipes() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const initialRecipes = state.recipes.length
    ? state.recipes
    : recipesData.results;

  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [maxCookTime, setMaxCookTime] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [recipes, setRecipes] = useState(initialRecipes);
  const [totalCount, setTotalCount] = useState(initialRecipes.length);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const favorites = state.favorites;

  useEffect(() => {
    if (!isTastyApiConfigured) {
      return;
    }

    let isActive = true;

    async function getRecipes() {
      setLoading(true);
      setError("");

      try {
        const params = {
          from: 0,
          size: pageSize,
        };

        if (submittedSearch) {
          params.q = submittedSearch;
        }

        const data = await tastyApi("/recipes/list", params);

        if (!Array.isArray(data.results)) {
          throw new Error(
            "The recipe response was not in the expected format.",
          );
        }

        if (!isActive) {
          return;
        }

        setRecipes(data.results);
        setTotalCount(data.count ?? data.results.length);
        dispatch(recipesFunction(data.results));
      } catch (err) {
        if (isActive) {
          setError(err.message || "Could not load recipes.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    getRecipes();

    return () => {
      isActive = false;
    };
  }, [submittedSearch, dispatch]);

  function toggleFavorite(id) {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favorite) => favorite !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }

    dispatch(favoritesFunction(updatedFavorites));
  }

  function handleSearch(e) {
    e.preventDefault();
    setSubmittedSearch(search.trim());
  }

  async function loadMoreRecipes() {
    if (!isTastyApiConfigured || loadingMore) {
      return;
    }

    setLoadingMore(true);
    setError("");

    try {
      const params = {
        from: recipes.length,
        size: pageSize,
      };

      if (submittedSearch) {
        params.q = submittedSearch;
      }

      const data = await tastyApi("/recipes/list", params);

      if (!Array.isArray(data.results)) {
        throw new Error("Could not load more recipes.");
      }

      const updatedRecipes = [...recipes, ...data.results];

      setRecipes(updatedRecipes);
      setTotalCount(data.count ?? totalCount);

      const savedRecipes = [...state.recipes, ...data.results].filter(
        (recipe, index, allRecipes) =>
          allRecipes.findIndex((item) => item.id === recipe.id) === index,
      );

      dispatch(recipesFunction(savedRecipes));
    } catch (err) {
      setError(err.message || "Could not load more recipes.");
    } finally {
      setLoadingMore(false);
    }
  }

  let filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = (recipe.name || "")
      .toLowerCase()
      .includes(submittedSearch.toLowerCase());

    const matchesTime =
      maxCookTime === "all" ||
      (recipe.cook_time_minutes != null &&
        recipe.cook_time_minutes <= Number(maxCookTime));

    return matchesSearch && matchesTime;
  });

  if (sortBy === "shortest") {
    filteredRecipes = [...filteredRecipes].sort((a, b) => {
      if (a.cook_time_minutes == null) return 1;
      if (b.cook_time_minutes == null) return -1;
      return a.cook_time_minutes - b.cook_time_minutes;
    });
  } else if (sortBy === "longest") {
    filteredRecipes = [...filteredRecipes].sort((a, b) => {
      if (a.cook_time_minutes == null) return 1;
      if (b.cook_time_minutes == null) return -1;
      return b.cook_time_minutes - a.cook_time_minutes;
    });
  } else if (sortBy === "alphabetical") {
    filteredRecipes = [...filteredRecipes].sort((a, b) =>
      (a.name || "").localeCompare(b.name || ""),
    );
  }

  const canLoadMore = isTastyApiConfigured && recipes.length < totalCount;

  return (
    <div className="recipes_wrapper">
      <div className="recipes_page">
        <form className="recipes_filters" onSubmit={handleSearch}>
          <input
            className="recipes_search"
            type="text"
            placeholder="Search for a recipe"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="recipes_search_button" type="submit">
            Search
          </button>

          <select
            className="recipes_time_filter"
            value={maxCookTime}
            onChange={(e) => setMaxCookTime(e.target.value)}
          >
            <option value="all">All cooking times</option>
            <option value="15">Up to 15 minutes</option>
            <option value="30">Up to 30 minutes</option>
            <option value="60">Up to 60 minutes</option>
          </select>

          <select
            className="recipes_sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default order</option>
            <option value="shortest">Shortest cooking time</option>
            <option value="longest">Longest cooking time</option>
            <option value="alphabetical">Name (A–Z)</option>
          </select>
        </form>

        <header className="recipes_header">
          <h1>Search and explore all the recipes</h1>
          <p>{totalCount.toLocaleString()} recipes available</p>
        </header>

        <main className="recipes_list">
          {filteredRecipes.length === 0 && !loading ? (
            <h2 className="no_results">No recipes found</h2>
          ) : (
            filteredRecipes.map((recipe) => (
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
                    toggleFavorite(recipe.id);
                  }}
                >
                  {favorites.includes(recipe.id)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>
              </div>
            ))
          )}
        </main>

        {loading && <p className="recipes_message">Loading recipes...</p>}

        {error && <p className="recipes_message">{error}</p>}

        {canLoadMore && (
          <button
            className="load_more_button"
            onClick={loadMoreRecipes}
            disabled={loadingMore || loading}
          >
            {loadingMore ? "Loading..." : "Load more recipes"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Recipes;
