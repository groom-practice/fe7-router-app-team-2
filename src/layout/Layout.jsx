import { Outlet, Link, useNavigate } from "react-router-dom"
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate()

  return (
    <div className="main">
      <header className="layout">
        <h1>POST PROJECT</h1>
      </header>

      <div className="content">
        <nav className="side">
          <Link to="/">HOME</Link>
          <Link to="/posts">POSTS</Link>
          <button onClick={() => navigate(-1)}>BACK</button>
        </nav>
        <Outlet />
      </div> 
    </div>
  )
}
