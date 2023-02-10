import StatusLine from "./components/StatusLine/StatusLine";
import './App.css'
import { BsSearch } from 'react-icons/bs'
import { useEffect, useState } from "react";
import SearchModal from "./components/SearchModal/SearchModal";
import axios from "axios";



function App() {
  const [searchModal, setSearchModal] = useState(false)
  const [taskData,setTaskData]=useState([])
  const [searchWord,setSearchWord]=useState('')
  // const  [findWord,setFindWord]=useState([])
  var findWord


  useEffect(()=>{
    async function searchTask(){
      const res = await axios.get("https://perfumeshop.club/get-task", {
        withCredentials: true,
      });
      setTaskData(res.data)
    }
    searchTask()
  },[])

  const handleSearch=async()=>{
    findWord=taskData.filter((v)=>v.title===searchWord)
    setSearchModal(true)
    // console.log(arr,'hey')
    // setFindWord(arr)
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <div className="search-bar">
        <input type='text' placeholder="search" className="search-input" onChange={(e)=>setSearchWord(e.target.value)}/>
        <span><BsSearch onClick={handleSearch}/></span>
      </div>
      <main>
        <section>
          <StatusLine
            status='Step 1'  />

          <StatusLine
            status='Step 2'  />

          <StatusLine
            status='Step 3'  />

          <StatusLine
            status='Step 4'  />
        </section>
      </main>
      {findWord ==''?'':<>
      <SearchModal searchModal={searchModal}
        setSearchModal={setSearchModal}
        findWord={findWord}
         />
      </>}
     
    </div>
  );
}

export default App;
