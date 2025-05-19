// src/reactjs/searchbarPresenter.jsx
import { observer } from "mobx-react-lite";
import { useState, useRef, useEffect, useMemo } from "react";
import { SearchBarView } from "../views/searchbarView";
import { getMovieDetails } from "../fetchData";
import { recordGuess } from "../firebase";

// basic debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const SearchBar = observer(function SearchBar(props) {
  const { model, setNotification, setIsCorrect } = props;

  // component state:
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showOptions, setShowOptions]     = useState(false);
  const [isSubmitting, setIsSubmitting]   = useState(false);

  const containerRef = useRef(null);
  const inputRef     = useRef(null);

  const debouncedSearch = useMemo(
    () => debounce((q) => model.doSearch(q), 1000),
    [model]
  );

  function handleQueryChange(e) {
    const q = e.target.value;
    model.setSearchQuery(q);
    setSelectedIndex(-1);

    if (q.length >= 2) {
      debouncedSearch(q);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }

  function handleKeyDown(e) {
    const list = model.searchResultsPromiseState.data?.results || [];
    setShowOptions(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (isSubmitting) return;
      if (selectedIndex >= 0 && list[selectedIndex]) {
        selectSuggestion(list[selectedIndex]);
      } else {
        submitGuess();
      }
    }
  }

  function selectSuggestion(movie) {
    model.setSearchQuery(movie.title);
    model.setCurrentGuess(movie.id);
    setSelectedIndex(-1);
    setShowOptions(false);
    inputRef.current?.focus();
  }

  function submitGuess() {
    if (isSubmitting) return;

    if (model.guesses.some((g) => g.id === model.currentGuess)) {
      setNotification("You’ve already guessed that movie!");
      setIsCorrect(false);
      return setTimeout(() => setNotification(""), 3000);
    }
    if (!model.currentGuess) {
      setNotification("No movie selected.");
      setIsCorrect(false);
      return;
    }

    setIsSubmitting(true);
    getMovieDetails(model.currentGuess)
      .then((details) => {
        recordGuess(model.currentUser.uid, details);
        model.addGuessForUser(details);

        const correct = details.title === model.correctMovie.title;
        setIsCorrect(correct);
        setNotification(correct ? "Correct guess!" : `"${details.title}" added!"`);
        setTimeout(() => setNotification(""), 3000);

        model.setSearchQuery("");
        model.setCurrentGuess(null);
      })
      .catch(() => {
        setNotification("Failed to fetch movie details.");
        setIsCorrect(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  // Hide dropdown on outside click (but keep text)
  useEffect(() => {
    function onClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isLoading   = !model.searchResultsPromiseState.data;
  const suggestions = model.searchResultsPromiseState.data?.results || [];
  const query       = model.searchStr || "";

  return (
    <div ref={containerRef}>
      <SearchBarView
        inputRef={inputRef}
        showOptions={showOptions}
        isSubmitting={isSubmitting}
        query={query}
        isLoading={isLoading}
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onQueryChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        onSuggestionSelect={selectSuggestion}
        onSubmitButtonClick={submitGuess}
      />
    </div>
  );
});

export { SearchBar };
