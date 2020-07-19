import React,{useState} from 'react'
import { replacevalueforkey } from '../../Constants'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const CreateExercise = ({ user }) => {
    const [exerciseData, setExerciseData] = useState({
        description: '',
        duration: 0,
        date: new Date(),
    })
    const onDateChange=(value)=>{
        setExerciseData({...exerciseData,'date':value})
    }
    const onSubmit=(e)=>{
        e.preventDefault();

    const exercise = {
      username: user,
      description: exerciseData.description,
      duration: exerciseData.duration,
      date: exerciseData.date
    }


    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';

    }
    return user ? (
        <div>
            
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:    {user} </label>

                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        defaultValue={exerciseData.description}
                        onChange={e=>replacevalueforkey(exerciseData,'description',e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={exerciseData.duration}
                        onChange={e=>replacevalueforkey(exerciseData,'duration',e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exerciseData.date}
                            onChange={e=>onDateChange(e)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    ) :
        <div>
            <h3>Create New Exercise Log</h3>
            <center>
                <button className="btn btn-primary" onClick={e => document.getElementById("LoginButton").click()}>Login to Create</button>
            </center>
        </div>
}



export default CreateExercise
