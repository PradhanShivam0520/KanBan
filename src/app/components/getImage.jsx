import Done from "../utils/icons_FEtask/Done.svg";
import Cancelled from "../utils/icons_FEtask/Cancelled.svg";
import Progress from "../utils/icons_FEtask/in-progress.svg";
import Backlog from "../utils/icons_FEtask/Backlog.svg";
import TODO from "../utils/icons_FEtask/To-do.svg";
import high_priority from "../utils/icons_FEtask/Img - High Priority.svg";
import medium_priority from "../utils/icons_FEtask/Img - Medium Priority.svg";
import low_priority from "../utils/icons_FEtask/Img - Low Priority.svg";
import urgent_priority from "../utils/icons_FEtask/SVG - Urgent Priority colour.svg";
import no_priority from "../utils/icons_FEtask/No-priority.svg";

export const getImage = (data, groupby) => {
  let statusImage = null;
  let priorityImage = null;
  if (groupby !== "status") {
    switch (data.status) {
      case "Done":
        statusImage = Done;
        break;
      case "Cancelled":
        statusImage = Cancelled;
        break;
      case "In progress":
        statusImage = Progress;
        break;

      case "Backlog":
        statusImage = Backlog;
        break;
      case "Todo":
        statusImage = TODO;
        break;
      default:
        statusImage = null;
    }
  }

  if (groupby !== "priority") {
    switch (data.priority) {
      case 3:
        priorityImage = high_priority;
        break;
      case 2:
        priorityImage = medium_priority;
        break;
      case 1:
        priorityImage = low_priority;
        break;
      case 4:
        priorityImage = urgent_priority;
        break;
      case 0:
        priorityImage = no_priority;
        break;
      default:
        priorityImage = null;
    }
  }
  return [statusImage, priorityImage];
};

export const getImageBykey = (key, groupby) => {


  let Image = null;
  if (groupby === "status") {
    switch (key) {
      case "Done":
        Image = Done;
        break;
      case "Cancelled":
        Image = Cancelled;
        break;
      case "In progress":
        Image = Progress;
        break;

      case "Backlog":
        Image = Backlog;
        break;
      case "Todo":
        Image = TODO;
        break;
      default:
        Image = null;
    }
  }

  if (groupby === "priority") {
    switch (key) {
      case "High":
        Image = high_priority;
        break;
      case "Medium":
        Image = medium_priority;
        break;
      case "Low":
        Image = low_priority;
        break;
      case "Urgent":
        Image = urgent_priority;
        break;
      case "No priority":
        Image = no_priority;
        break;
      default:
        Image = null;
    }
  }
  return Image;
};
