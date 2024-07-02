import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BooksList.css";

function BooksList() {
  const [booksData, setBooksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getListOfBooks = async () => {
      try {
        const res = await axios.post(
          "https://api-preprod.lelivrescolaire.fr/graph",
          {
            query:
              "query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}",
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        return res.data;
      } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);

        return null;
      }
    };

    const fetchData = async () => {
      const booksList = await getListOfBooks();
      if (booksList) {
        setBooksData(booksList.data.viewer.books.hits);
      } else {
        console.info("Erreur lors de la récupération des données.");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleBookClick = (book) => {
    if (book.valid) {
      navigate(`/list/${book.id}`, { state: { book } });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const subjects = [
    ...new Set(
      booksData.flatMap((book) => book.subjects.map((subject) => subject.name))
    ),
  ];

  const levels = [
    ...new Set(
      booksData.flatMap((book) => book.levels.map((level) => level.name))
    ),
  ];

  const filteredBooks = booksData.filter((book) => {
    const matchesSubject = selectedSubject
      ? book.subjects.some((subject) => subject.name === selectedSubject)
      : true;
    const matchesLevel = selectedLevel
      ? book.levels.some((level) => level.name === selectedLevel)
      : true;
    return matchesSubject && matchesLevel;
  });

  return (
    <>
      <section className="BookListFilter">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Tout les Sujets</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Tout les niveaux</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </section>
      <section className="BooksListComponent">
        <h1> Liste des livres</h1>
        <ul>
          {filteredBooks.map((book) =>
            book.displayTitle !== null ? (
              <li
                key={book.id}
                className={book.valid ? "valid" : "invalid"}
                onClick={() => handleBookClick(book)}
              >
                <span>{book.displayTitle}</span>
              </li>
            ) : (
              ""
            )
          )}
        </ul>
      </section>
    </>
  );
}

export default BooksList;
