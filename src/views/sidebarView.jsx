import '../styles/navbar.css';


export function SidebarView(props) {
    const { user, onSignOut } = props;

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button onClick={handleUserMainClickACB}>Main Menu</button>
            </div>
            <div className="navbar-right">
                {user ? (
                    <>
                        <button onClick={handleUserProfileClickACB}>Profile</button>
                        <button onClick={onSignOut}>Sign Out</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleUserLoginClickACB}>Login</button>
                        <button onClick={handleUserRegisterClickACB}>Create Account</button>
                    </>
                )}
            </div>
        </nav>
    );


    function handleUserRegisterClickACB(evt) {
        window.location.hash = "#/register";
    }

    function handleUserLoginClickACB(evt) {
        window.location.hash = "#/login";
    }

    function handleUserMainClickACB(evt) {
        window.location.hash = "#/game";
    }

    function handleUserProfileClickACB(evt) {
        window.location.hash = "#/profile";
    }
}
