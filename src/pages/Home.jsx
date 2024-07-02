import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="HomeComponent">
      <h1> Bienvenue sur mon test technique !</h1>
      <Link to={"/list"}>Cliquez ici pour acceder à la liste des livres </Link>
    </section>
  );
}

export default Home;
