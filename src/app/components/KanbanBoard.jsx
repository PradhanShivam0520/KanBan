import React, { useEffect, useState } from "react";
import Card from "./cards";
import { fetchApiData } from "../../services/fetchdata";
import { getImageBykey } from "./getImage";
import userImg from "../utils/icons_FEtask/user.png";

import dot from "../utils/icons_FEtask/3 dot menu.svg";
import add from "../utils/icons_FEtask/add.svg";

import "../style/kanBanBoard.css";
import Header from "./Header";
import ProfileIcon from "./profileIcon";


const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem("groupBy") || "status");
  const [orderBy, setorderBy] = useState(localStorage.getItem("title") ||"title");

  const priorityLabels = {

    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApiData();
      setTickets(data.tickets);
      setUsers(data.users);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedView = localStorage.getItem("stored_tickets");
    if (savedView) {
      const { groupBy, orderBy } = JSON.parse(savedView);
      setGroupBy(groupBy);
      setorderBy(orderBy);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stored_tickets", JSON.stringify({ groupBy, orderBy }));
  }, [groupBy, orderBy]);

  const handleGroupChange = (e) => setGroupBy(e.target.value);
  const handleOrderChange = (e) => setorderBy(e.target.value);

  const sortedTickets = [...tickets].sort((a, b) => {
    if (orderBy === "title") return a.title.localeCompare(b.title);
    return b.priority - a.priority;
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const user = users.find((user) => user.id === ticket.userId);
    const userName = user ? user.name : "Unknown";
    const availability = user? user.available : false;

    const key =
      groupBy === "user"
        ? userName
        : groupBy === "priority"
        ? priorityLabels[ticket.priority] || "No priority"
        : ticket.status;

    acc[key] = acc[key] || [];
    acc[key].push({ ...ticket, userName,availability });
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      <Header
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
      />
      <div className="board">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div className="column" key={key}>
            <section className="section-header">
              <h4 className="Image-header">
                { console.log() ||
                  groupBy === "user" && (
                    <ProfileIcon data={{userName : tickets[0].userName,
                      availability : tickets[0].availability
                    }} />
                  )
                }
               {" "}
                <span>{key}</span> <span>{tickets.length}</span>
              </h4>
              <div>
                <img src={add} alt="add_icon" />
                <img src={dot} alt="dot_icon" />
              </div>
            </section>
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                data={ticket}
                priorityLabel={priorityLabels[ticket.priority]}
                groupby={groupBy}
                userData={users}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
