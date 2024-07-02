import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BooksList.css";

function BooksList() {
  const [booksData, setBooksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
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
  const subjects = booksData?.map((book) =>
    book.subjects?.map((subject) => subject.name)
  );

  console.log(subjects);

  const filteredBooks = booksData.filter((book) => {
    return selectedSubject
      ? book.subjects.some((subject) => subject.name === selectedSubject)
      : true;
  });

  return (
    <>
      <section className="BookListFilter">
        <label>
          Subject:
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
      </section>
      <section className="BooksListComponent">
        <h1> Liste des livres</h1>
        <ul>
          {filteredBooks?.map((book) => (
            <li
              key={book.id}
              className={book.valid ? "valid" : "invalid"}
              onClick={() => handleBookClick(book)}
            >
              <span>{book.displayTitle}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default BooksList;
