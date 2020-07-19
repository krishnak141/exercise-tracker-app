import React, { useState } from 'react'
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { replacevalueforkey } from '../../Constants';

const Register = ({ data, onRegister }) => {
  return <div>
    <form onSubmit={onRegister}>
      <div className="form-group">
        <label>Username: </label>
        <input type="text"
          required
          className="form-control"
          defaultValue={data.username}
          onChange={e => replacevalueforkey(data, 'username', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password: </label>
        <input type="password"
          required
          className="form-control"
          defaultValue={data.password}
          onChange={e => replacevalueforkey(data, 'password', e.target.value)}
        />
      </div>
      <div className="form-group">
        <input type="submit" value="Create User" className="btn btn-primary" />
      </div>
    </form>
  </div>
}
const Login = ({ data, onLogin}) => {
return <div>
<form onSubmit={onLogin}>
  <div className="form-group">
    <label>Username: </label>
    <input type="text"
      required
      className="form-control"
      defaultValue={data.username}
      onChange={e => replacevalueforkey(data, 'username', e.target.value)}
    />
  </div>
  <div className="form-group">
    <label>Password: </label>
    <input type="password"
      required
      className="form-control"
      defaultValue={data.password}
      onChange={e => replacevalueforkey(data, 'password', e.target.value)}
    />
  </div>
  <div className="form-group">
    <input type="submit" value="Login" className="btn btn-primary" />
  </div>
</form>
</div>
}
const CreateUser = ({ user, setUser,setShowModal }) => {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const [logininfo, setLogininfo] = useState({
    username: '',
    password: ''
  })
  
  const onRegister = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/add', data)
      .then(res =>{ console.log(res.data)
        onSucess(data.username)
      })
  }
  const onLogin=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/users/login', logininfo)
      .then(res =>{ console.log(res.data)
        onSucess(logininfo.username)
      })
  }
  const onSucess=(username)=>{
    localStorage.setItem('user',username)
    setUser(username)
    setShowModal(false)
  }
  return (
    <Tabs defaultActiveKey="register" id="uncontrolled-tab-example">
      <Tab eventKey="register" title="Register">
        <Register data={data}  onRegister={onRegister} />
      </Tab>
      <Tab eventKey="login" title="Login">
        <Login data={logininfo}  onLogin={onLogin}/>
      </Tab>
    </Tabs>
  )
}



export default CreateUser
