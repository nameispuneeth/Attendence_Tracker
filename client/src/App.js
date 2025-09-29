import {Routes,Route,BrowserRouter} from 'react-router-dom'
import SemDetails from './Components/SemDetails';
import AiTimeTableInit from './Components/AITimeTableInit';
import Subjects from './Components/Subjects';
import TimeTable from "./Components/TimeTable";
import ReqAttendence from './Components/ReqAttendence';
import CurrAttendence from './Components/CurrAttendence';
import UserHome from './Components/UserHome';
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/aitimetable" element={<AiTimeTableInit/>}></Route>
        <Route path="/" element={<SemDetails/>}></Route>
         <Route path="/timetable" element={<TimeTable/>}></Route>
          <Route path="/manually" element={<Subjects/>}></Route>
          <Route path="/requirement" element={<ReqAttendence/>}></Route>
          <Route path="/currattendence" element={<CurrAttendence/>}></Route>
          <Route path="/userhome" element={<UserHome/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}