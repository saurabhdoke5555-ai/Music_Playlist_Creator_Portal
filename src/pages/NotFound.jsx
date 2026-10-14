import { Link } from "react-router-dom";
export default function NotFound(){return <main className="page inner-page"><div className="error-state"><div className="empty-icon">404</div><h2>Page not found</h2><p>The route you entered does not exist.</p><Link className="primary-button" to="/">Back to Discover</Link></div></main>;}
