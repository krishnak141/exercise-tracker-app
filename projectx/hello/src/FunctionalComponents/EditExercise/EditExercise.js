import React,{useState,useEffect} from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { replacevalueforkey } from '../../Constants';


const EditExercise = props => {
    const [exerciseData, setExerciseData] = useState({
        username:'',
        description: '',
        duration: '',
        date: new Date(),
    })
    const onDateChange=(value)=>{
        setExerciseData({...exerciseData,'date':value})
    }
    useEffect(() => {
        axios.get('http://localhost:5000/exercises/'+props.match.params.id)
      .then(response => {
        setExerciseData({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration.toString(),
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
    }, [])
    const onSubmit=(e)=>{
        e.preventDefault();

        const exercise = {
            username: exerciseData.username,
            description: exerciseData.description,
            duration: exerciseData.duration,
            date: exerciseData.date
          }
      
      
          axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
            .then(res => {console.log(res.data)
            props.history.push('/')
            })
            .catch(err=>{})
          
    }
    return (
        <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username:    {exerciseData.username} </label>
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
                    <input type="submit" value="Update Exercise" className="btn btn-primary" />
                </div>
            </form>
        
   </div>
    )
}


export default EditExercise
