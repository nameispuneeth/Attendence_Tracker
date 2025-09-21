import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from "./Components/Home";
import Subjects from './Components/Subjects';
import TimeTable from "./Components/TimeTable";
import ReqAttendence from './Components/ReqAttendence';
import CurrAttendence from './Components/CurrAttendence';
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
         <Route path="/timetable" element={<TimeTable/>}></Route>
          <Route path="/manually" element={<Subjects/>}></Route>
          <Route path="/requirement" element={<ReqAttendence/>}></Route>
          <Route path="/currattendence" element={<CurrAttendence/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}