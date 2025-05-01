
export function SuspenseView(props) {
  
    return (
      !props.promise && <span>no data</span> ||
      props.error  &&  <span>{props.error.toString()}</span> ||
      <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" /> 
    );
  }
  