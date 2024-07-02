import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Book.css";
import { useEffect, useState } from "react";

function Book() {
  const { id } = useParams();
  const location = useLocation();
  const { book } = location.state;
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getListOfChapters = async () => {
      try {
        const res = await axios.post(
          "https://api-preprod.lelivrescolaire.fr/graph",
          {
            query:
              "query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}",
            variables: {
              bookId: parseInt(id),
            },
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
      const chapterslist = await getListOfChapters();
      if (chapterslist) {
        setChapters(chapterslist.data.viewer.chapters.hits);
      } else {
        console.log("Erreur lors de la récupération des données.");
      }
    };

    fetchData();
  }, [id]);

  const handleChapterChange = (event) => {
    const chapterId = event.target.value;

    navigate(`/chapter/${chapterId}`, {
      state: { chapter: chapterId },
    });
  };

  return (
    <section className="BookComponent">
      <Link to="/list">Retourner à la liste</Link>
      <h1>{book.displayTitle}</h1>
      <img src={book.url} alt={book.displayTitle} />
      <h2>Selectionne ton chapitre</h2>
      {chapters.length > 0 ? (
        <select onChange={handleChapterChange} defaultValue="">
          <option value="" disabled>
            ---
          </option>
          {chapters.map((chapter) => (
            <option
              key={chapter.id}
              value={chapter.id}
              disabled={!chapter.valid}
              className={chapter.valid ? "valid" : "invalid"}
            >
              {chapter.title}
            </option>
          ))}
        </select>
      ) : (
        <p>Pas de chapitre disponible</p>
      )}
    </section>
  );
}

export default Book;
