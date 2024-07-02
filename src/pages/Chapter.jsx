import { Link, useLocation } from "react-router-dom";
import "../styles/Chapter.css";

function Chapter() {
  const location = useLocation();
  const { chapterName, chapterUrl } = location.state;
  return (
    <section className="ChapterComponent">
      <Link to="/list">Retourner à la liste</Link>
      <h1>{chapterName}</h1>
      <img src={chapterUrl} alt={chapterName} />
    </section>
  );
}

export default Chapter;
