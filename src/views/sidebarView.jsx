

export function SidebarView(props){
    return (
        <div>
            <button onClick={handleUserLoginClickACB}>Login</button>
            <button onClick={handleUserMainClickACB}>Main Menu</button>



        </div>
    );

    function handleUserLoginClickACB(evt) {

        window.location.hash="#/login"  // TW3.3.2.5
    }

    function handleUserMainClickACB(evt) {

        window.location.hash="#/game"  // TW3.3.2.5
    }

}
