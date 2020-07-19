import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Navbar from "./FunctionalComponents/NavBar"
import ExercisesList from "./FunctionalComponents/ExerciseList";
import EditExercise from "./FunctionalComponents/EditExercise";
import CreateExercise from "./FunctionalComponents/CreateExercise";


function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    let isLogged = localStorage.getItem('user')
    if (isLogged)
      setUser(isLogged)
  }, [])
  const MyExerciseList=()=>{
    return <ExercisesList user={user}/>
  }
  const CreateNewExercise=()=>{
    return <CreateExercise user={user} />
  }
  return (
    <Router>
      <div className="container">
        <Navbar user={user} setUser={setUser} />
        <br />
        <Switch>
          <Route exact path="/" component={MyExerciseList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateNewExercise} />
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
