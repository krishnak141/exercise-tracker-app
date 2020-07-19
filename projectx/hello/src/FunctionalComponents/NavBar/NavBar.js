import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap';
import ModalDialogue from '../Modal/Modal';
import CreateUser from '../CreateUser/CreateUser';

const styleClass = {
  'dialog-width': {
    width: '30%'
  }
}
const NavBar = ({ user, setUser }) => {
  const Logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/"><Navbar.Brand>ExcerTracker</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Exercises</Link>
            <Link to="/create" className="nav-link">Create Exercise Log</Link>
            {
              !user?
              <Link id="LoginButton" onClick={e=>setShowModal(true)} className="nav-link">Login</Link>
              :
              <Link onClick={Logout} className="nav-link">Logout</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ModalDialogue
        show={showModal}
        closeDialogue={() => setShowModal(false)}
        title={'My Account'}
        showCancelButton={true}
        showSuccessButton={false}
        successCallback={() => { }}
        widthClass={styleClass['dialog-width']}
      >
        <CreateUser user={user} setUser={setUser} setShowModal={setShowModal} />

      </ModalDialogue>
    </>
  )
}



export default NavBar
