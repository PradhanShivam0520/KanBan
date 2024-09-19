import React from 'react'
import '../style/profileIcon.css'

const ProfileIcon = ({data}) => {
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
    <div className="profile">
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
    </div>
  </div>
  )
}

export default ProfileIcon
