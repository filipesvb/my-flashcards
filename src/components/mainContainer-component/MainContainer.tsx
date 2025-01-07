import GrupoCard from "../grupoCard-component/GrupoCard";
import "./MainContainer.css";

const MainContainer = () => {
  return (
    <>
      <main>
        <div className="container shelf">
          <div className={`shelf-background`}>
            <h2>
              Clique duas vezes para adicionar <br /> <span>+</span>
            </h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainContainer;
