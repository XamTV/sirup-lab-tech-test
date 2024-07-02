import { Link, useLocation } from "react-router-dom";
import "../styles/Book.css";

function Book() {
  const location = useLocation();
  const { book } = location.state;

  return (
    <section className="BookComponent">
      <h1>{book.displayTitle}</h1>
      <img src={book.url} alt={book.displayTitle} />
      <Link to="/list">Retourner à la liste</Link>
    </section>
  );
}

export default Book;
