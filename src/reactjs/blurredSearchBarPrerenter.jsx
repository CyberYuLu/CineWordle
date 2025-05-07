
import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { BlurredSearchbarView } from "../views/blurredSearchBarView";
import { getMovieDetails } from "../fetchData";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export const BlurredSearchbar = observer(function BlurredSearchbar({ model, posterSrc, onGuess }) {
  const debounced = useMemo(
    () => debounce((q) => model.doSearch(q), 200),
    [model]
  );

  const handleQueryChange = (e) => {
    const q = e.target.value;
    model.setSearchQuery(q);
    if (q.length >= 2) debounced(q);
  };

  const handleSelect = (movie) => {
    model.setSearchQuery(movie.title);
    model.setCurrentGuess(movie.id);
  };

  const handleSubmit = () => {
    const id = model.currentGuess;
    if (!id) return;
    getMovieDetails(id)
      .then((details) => onGuess(details))
      .catch(console.error);
  };

  const suggestions = model.searchResultsPromiseState.data?.results || [];
  const query = model.searchStr || "";

  return (
    <BlurredSearchbarView
      posterSrc={posterSrc}
      query={query}
      suggestions={suggestions}
      onQueryChange={handleQueryChange}
      onSuggestionSelect={handleSelect}
      onSubmitButtonClick={handleSubmit}
    />
  );
});