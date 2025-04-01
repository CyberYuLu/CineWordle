export function SidebarView(props) {
    const { user, onSignOut } = props;

    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user.email}</p>
                    <button onClick={onSignOut}>Sign Out</button>
                    <button onClick={handleUserMainClickACB}>Main Menu</button>
                </>
            ) : (
                <>
                    <button onClick={handleUserLoginClickACB}>Login</button>
                    <button onClick={handleUserRegisterClickACB}>Create Account</button>
                    <button onClick={handleUserMainClickACB}>Main Menu</button>

                </>
            )}
        </div>
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
}
