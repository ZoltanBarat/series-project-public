import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [aboutVisible, setAboutVisible] = useState(false);

  return (
    <div className="headConatiner">
      <div className="navBar">
        <div className="navbar__logo">Random Series</div>
        <div className="navBar__menu">
          <div
            onClick={() => {
              setAboutVisible(true);
            }}
            className="navBar__menuText"
          >
            About this project
          </div>
          <a href="#seriesList" className="navBar__menuText">
            More random series
          </a>
        </div>
      </div>
      {aboutVisible ? (
        <div className="aboutContainer">
          <p>
            👨🏻‍💻 This is a learning project, made with React and TypeScript.<br></br>{" "}
            📺 The site gives information (general information / cast / episodes)
            about a random series.<br></br>
            🤷🏻‍♂️ Some functions are still missing.<br></br>
            💾 The data came from{" "}
            <a href="https://www.tvmaze.com/api">TVMaze</a> API.
          </p>
          <p
            className="aboutCloseButton"
            onClick={() => {
              setAboutVisible(false);
            }}
          >
            Close
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default Navbar;