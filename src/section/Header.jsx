import { NavLink, Link } from 'react-router-dom'


export const Header = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken")

  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userId")
    window.location.reload()
  }

  return (
    <header className="bg-pink-800 text-white p-4">
      <h1 className="text-2xl font-bold">
        <Link
          to="/" className="hover:underline">Happy Thoughts
        </Link>
      </h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/signup" className="hover:underline">Sign up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login" className="hover:underline">Log in
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogOut} className="hover:underline text-white">
                Log out
              </button>
            </li>
          )}


        </ul>
      </nav>
    </header>
  );
}