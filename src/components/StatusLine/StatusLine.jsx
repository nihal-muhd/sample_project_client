import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import "./StatusLine.css";
import AddTask from "../AddTask/AddTask";
import axios from '../../config/axios'

const StatusLine = (props) => {
  const { status,moveTask } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  let taskList, taskForStatus;
  let stepStatus = status;

  useEffect(() => {
    async function getTask() {
      const res = await axios.get("/get-task", {
        withCredentials: true,
      });
      // console.log(res);
      setTasks(res.data);
    }
    getTask();
  }, [stepStatus]);

  function handleAddEmpty() {
    setModalOpen(true);
  }

  async function handleSubmit(val) {
    let newTask = {
      id: Date.now(),
      title: val.name,
      status: status,
    };
    console.log(newTask);
    await axios.post(
      "/add-task",
      { newTask, status },
      { withCredentials: true }
    );
    let filteredTask = tasks.filter((task) => task.id !== newTask.id);
    let newTaskList = [...filteredTask, newTask];
    setTasks(newTaskList);
    setModalOpen(false);
  }

//  async function moveTask(id, newStatus) {
//     stepStatus = newStatus;
//     let task = tasks?.filter((task) => task.id === id);
//     let filteredTask = tasks?.filter((task) => task.id !== id);
//     task[0].status = newStatus;
//     let changedStatus=filteredTask.concat(task)
//     setTasks(changedStatus);
//     await axios.post('/move-task',{id,newStatus},{withCredentials:true})
//   }

 async function deleteTask(taskId) {
   let filteredTask = tasks.filter((task) => task.id !== taskId);
   setTasks(filteredTask);
   await axios.post('/delete-task',{taskId},{withCredentials:true})
  }

  if (tasks) {
    taskForStatus = tasks?.filter((task) => task.status === stepStatus);
  }

  if (taskForStatus) {
    taskList = taskForStatus.map((task) => {
      return (
        <Task
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status) => moveTask(id, status)}
          key={task.id}
          task={task}
        />
      );
    });
  }
  return (
    
    <div className="statusLine">
      <h3>{stepStatus}</h3>
      {taskList}
      <button onClick={handleAddEmpty} className="button addTask">
        +
      </button>
      <AddTask
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default StatusLine;
