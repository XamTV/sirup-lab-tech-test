import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Chapter.css";

function Chapter() {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapterName, chapterUrl } = location.state;
  return (
    <section className="ChapterComponent">
      <button onClick={() => navigate(-1)}>
        {" "}
        Retour à la page précédente{" "}
      </button>
      <h1>{chapterName}</h1>
      {chapterUrl !== null ? (
        <img src={chapterUrl} alt={chapterName} />
      ) : (
        <p>L&apos;image n&apos;est pas disponible pour le moment</p>
      )}
    </section>
  );
}

export default Chapter;
