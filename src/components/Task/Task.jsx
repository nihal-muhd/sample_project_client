import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import "./Task.css";

const Task = (props) => {
  const { deleteTask, moveTask, task } = props;

  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "Step 2") {
      newStatus = "Step 1";
    } else if (task.status === "Step 3") {
      newStatus = "Step 2";
    } else if (task.status === "Step 4") {
      newStatus = "Step 3";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleMoveRight() {
    let newStatus = "";

    if (task.status === "Step 1") {
      newStatus = "Step 2";
    } else if (task.status === "Step 2") {
      newStatus = "Step 3";
    } else if (task.status === "Step 3") {
      newStatus = "Step 4";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus);
    }
  }

  function handleDelete() {
    deleteTask(task.id);
  }

  return (
    <div className="TaskMain">
      <div className="task">
        <button onClick={handleMoveLeft} className="button moveTask">
          <BsFillArrowLeftCircleFill />
        </button>
        <p className="title">{task.title}</p>

        <button onClick={handleMoveRight} className="button moveTask">
          <BsFillArrowRightCircleFill />
        </button>
      </div>
      <div className="taskDelete">
        <button className="button delete" onClick={handleDelete}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
};

export default Task;
