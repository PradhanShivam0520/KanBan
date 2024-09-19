import React, { useEffect, useRef, useState } from "react";
import "../style/header.css";
import displayImage from "../utils/icons_FEtask/Display.svg";
import down from "../utils/icons_FEtask/down.svg";


const Header = ({ onGroupChange, onOrderChange }) => {
  const [displayOpen, setdisplayOpen] = useState(false);
  const displayRef = useRef(null);

  const handleDisplayClick = () => {
    setdisplayOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (displayRef.current && !displayRef.current.contains(event.target)) {
      setdisplayOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header ref={displayRef}>
      <button onClick={handleDisplayClick} className="display__button">
        <img src={displayImage} alt="Display" />
        <span>Display</span>
        <img src={down} alt="Display" />
      </button>

      {displayOpen && (
        <div className="filter__container" ref={displayRef}>
          <div className="grouping__container">
            <div>Group: </div>
            <select onChange={onGroupChange}>
              <option value="status">Status</option>
              <option value="user">Group by User</option>
              <option value="priority">Group by Priority</option>
            </select>
          </div>
          <div className="grouping__container">
            <div>Order: </div>
            <select onChange={onOrderChange}>
              <option value="title">Order by title</option>
              <option value="priority">Order by priority</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
