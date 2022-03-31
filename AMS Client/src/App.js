import { Router, Route, Switch, Redirect, Routes } from "react-router-dom";
import './App.css';
import Firstpage from './components/Firstpage';
import Login from "./components/Login";
import { history } from "./History";
import Main from "./components/Main";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import Assigned from "./components/student/Assigned";
import Submitted from "./components/student/Submitted";
import AssignmentTeacher from "./components/teacher/AssignmentTeacher";
import SubmittedAss from "./components/teacher/SubmittedAss";
import Addass from "./components/teacher/Addass";


export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Firstpage}/>
        <Route path="/admindashboard" component={AdminDashboard}/>
        <Route exact path="/studentdashboard/:id" component={StudentDashboard}/>
        <Route path="/teacherdashboard/:id" component={TeacherDashboard}/>
        <Route exact path="/:id/assigned" component={Assigned}/>
        <Route exact path="/:id/submitted" component={Submitted}/>
        <Route exact path="/:id/assignment" component={AssignmentTeacher}/>
        <Route exact path="/:id/submissionsteacher" component={SubmittedAss}/>
        <Route exact path="/:id/add" component={Addass}/>
      </Switch>
    </Router>
    
  );
}


