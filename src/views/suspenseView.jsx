
export function SuspenseView(props) {
  
    return (
    
      props.error  &&  <span>{props.error.toString()}</span> ||
      <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" /> 
    );
  }
  