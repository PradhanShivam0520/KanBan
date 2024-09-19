import React from "react";
import "../style/card.css";
import userImg from "../utils/icons_FEtask/user.png";
import { getImage } from "./getImage";
const Card = ({ data, priorityLabel, key, groupby }) => {
  let statusImage = getImage(data, groupby)[0];
  let priorityImage = getImage(data, groupby)[1];


  const getRandomDarkColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getStoredColor = (userId) => {
    const storedColor = localStorage.getItem(`profileColor_${userId}`);
    return storedColor || getRandomDarkColor();
  };

  const getAbbreviation = (name) => {
    if (!name) return "";
    const initials = name.split(" ").map((word) => word[0]);
    return initials.join("").toUpperCase();
  };
  
  console.log(data);

  const backgroundColor = getStoredColor(data.userId);

  return (
    <div className="card">
      <section className="card-details">
        <div>{data.id}</div>
        <div className="cardu">
          <div className="user-profile">
            <div className="user-profile-container">
              {data.userName && (
                <div
                  className="card-profile-icon"
                  style={{ backgroundColor }}
                >
                  <div className="card-initials">
                    {getAbbreviation(data.userName)}
                  </div>
                </div>
              )}
              <div
                className={`card-availability-indicator ${
                  data.availability ? "available" : "not-available"
                }`}
              ></div>
            </div>
          </div>
         
        </div>
      </section>

      <section className="card-mid-detail">
        <span>
          {groupby !== "status" && (
            <img src={statusImage} alt="card_image1" className="card_image1" />
          )}
        </span>

        <h3>{data.title}</h3>
      </section>
      <section className="card-end-detail">
        <span>
          {groupby !== "priority" && (
            <img
              src={priorityImage}
              alt="card_image1"
              className="card_image2"
            />
          )}
        </span>
        <span>
          <p>Feature Request</p>
        </span>
      </section>
    </div>
  );
};
export default Card;


// vailable
// : 
// false
// id
// : 
// "usr-1"
// name
// : 
// "Anoop sharma"




// id
// : 
// "CAM-1"
// priority
// : 
// 4
// status
// : 
// "Todo"
// tag
// : 
// ['Feature request']
// title
// : 
// "Update User Profile Page UI"
// userId
// : 
// "usr-1"