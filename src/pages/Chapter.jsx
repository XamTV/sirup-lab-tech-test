import { Link, useLocation } from "react-router-dom";
import "../styles/Chapter.css";

function Chapter() {
  const location = useLocation();
  const { chapterName, chapterUrl } = location.state;
  return (
    <section className="ChapterComponent">
      <Link to="/">Retourner à la liste</Link>
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
