import React, { useState, useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

const NavigationBar = ( {logoutFunction} ) => {
    return(
        <Navbar bg="primary" variant="dark" expand="md">
            <Navbar.Brand as={Link} to="/">Lift-o-Meter</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/next" variant="transparent" >
                        Seuraava
                    </Nav.Link>
                    <Nav.Link as={Link} to="/completed" >
                        Edelliset
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile" >
                        Profiili
                    </Nav.Link>
                    <Nav.Link as={Link} onClick={logoutFunction}>
                        Kirjaudu ulos
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}

export default NavigationBar