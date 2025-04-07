import "/src/style.css";

export function SearchMovieView(props) {



  function handleInputChangeACB(evt){
    console.log("something input changed", evt.target.value)
    props.onSearchChange(evt.target.value)
  }

  function handleButtonClickACB(evt){
    console.log("button clicked", evt.target.value)
    props.onSearchButtonClick(props.text)
  }
  

  return (
    <div>
        <input
            type="text"
            value={props.text || ""}
            placeholder="Enter movie name"
            onChange={handleInputChangeACB}
        />
        <button onClick = {handleButtonClickACB}>Search!</button>
    </div>

  );
}
