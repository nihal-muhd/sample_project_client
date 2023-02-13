import StatusLine from "./components/StatusLine/StatusLine";
import './App.css'
import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react";
import SearchModal from "./components/SearchModal/SearchModal";
import axios from './config/axios'



function App() {
  const [searchModal, setSearchModal] = useState(false)
  const [taskData,setTaskData]=useState([])
  const [searchWord,setSearchWord]=useState('')
  const [findWord,setFindWord]=useState([])
  console.log(findWord,'hey')

  useEffect(()=>{
    async function searchTask(){
      const res = await axios.get("/get-task", {
        withCredentials: true,
      });
      if(res.data){
        setTaskData(res.data)

      }
    }
    searchTask()
  },[searchWord])

   function moveTask(id, newStatus) {
    let task = taskData?.filter((task) => task.id === id)[0];
    let filteredTask = taskData?.filter((task) => task.id !== id);
    task.status = newStatus;
    let newTaskList = [...filteredTask, task];
    setTaskData(newTaskList);
    axios.post('/move-task',{id,newStatus},{withCredentials:true})
  }

  const handleSearch=()=>{
    let arr=taskData.filter((v)=>v.title===searchWord)
    setSearchModal(true)
    setFindWord(arr)
    setSearchWord('')
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <div className="search-bar">
        <input type='text' placeholder="search" className="search-input" value={searchWord} onChange={(e)=>setSearchWord(e.target.value)}/>
        <span><BsSearch onClick={handleSearch}/></span>
      </div>
      <main>
        <section>
          <StatusLine
            status='Step 1' 
            moveTask={moveTask} />

          <StatusLine
            status='Step 2' 
            moveTask={moveTask} />

          <StatusLine
            status='Step 3' 
            moveTask={moveTask} />

          <StatusLine
            status='Step 4' 
            moveTask={moveTask} />
        </section>
      </main>
      {findWord.length===0? <SearchModal searchModal={searchModal}
        setSearchModal={setSearchModal}
        msg='No data found'
         />:<>
      <SearchModal searchModal={searchModal}
        setSearchModal={setSearchModal}
        findWord={findWord}
         />
      </>}
     
    </div>
  );
}

export default App;
