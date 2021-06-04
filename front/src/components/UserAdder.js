import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

import { StandardButton } from '../styles/Buttons'
import { Input} from '../styles/styles'
import AuthService from '../services/AuthService'

const UserAdder = () => {

    const [userdata, setUserdata] = useState({
        username: '',
        password: '',
        bestSquat: '',
        bestBenchPress: '',
        bestBarbellRow: '',
        bestOverheadPress: '',
        bestDeadlift: ''
    })

    const [passwordConfirmation, setPasswordConfirmation] = useState(null)
    const [errors, setErrors] = useState({})

    const validateForErrors = () => {
        const {username, password, bestSquat, bestBenchPress, bestBarbellRow, bestOverheadPress, bestDeadlift} = userdata
        const newErrors = {}

        if (!username || username.length < 3) newErrors.username = 'Käyttäjätunnuksen pitää olla vähintään 3 merkkiä'
        if (username.length > 20) newErrors.username = 'Käyttäjätunnus saa olla enintään 20 merkkiä'
        if (!password || password.length < 5) newErrors.password = 'Salasanan pitää olla vähintään 5 merkkiä'
        if (password.length > 20) newErrors.password = 'Salasana saa olla enintään 20 merkkiä'
        if (password !== passwordConfirmation && password) newErrors.passwordConfirmation = 'Salasana ja sen varmistus eivät ole samat'
        if (bestSquat < 20) newErrors.bestSquat = 'Epärealistisen pieni'
        if (bestSquat > 300) newErrors.bestSquat = 'Epärealistisen suuri'

        return newErrors
    }
    
    const handleChange = (event) => {
        event.preventDefault()
        const field = event.target.name
        let value = null
        if(field === 'username' || field === 'password' || field === 'password2') {
            value = event.target.value
        } else {
            value = parseFloat(event.target.value)
        }

        if(field === 'password2') {
            setPasswordConfirmation(value)
        } else {
            setUserdata({
                ...userdata, [field]:value
            })
            if (!!errors[field]) {
                setErrors({
                    ...errors,
                    [field]: null
                })
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = validateForErrors()
        if(Object.keys(newErrors).length > 0) {
            console.log('Ei kelpaa!', newErrors)
            setErrors(newErrors)
        } else {
            console.log('Submitting...', userdata)
            AuthService
                .signup(userdata)
                .then(response => console.log(response))
                .catch(error => console.log('**Virhe: ', error))
            setUserdata({
                username: '',
                password: '',
                bestSquat: '',
                bestBenchPress: '',
                bestBarbellRow: '',
                bestOverheadPress: '',
                bestDeadlift: ''
            })
        }
    }

    return(
        <div>
            <h3>Lisää uusi käyttäjä</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Käyttäjätunnus</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='username' value={userdata.username} placeholder='3-20 merkkiä' onChange={handleChange} isInvalid={ !!errors.username }/>
                        <Form.Control.Feedback type='invalid'>{ errors.username }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Salasana</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='password' name='password' value={userdata.password} placeholder='5-20 merkkiä' onChange={handleChange} isInvalid={ !!errors.password }/>
                        <Form.Control.Feedback type='invalid'>{ errors.password }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}></Form.Label>
                    <Col sm={10}>
                        <Form.Control type='password' name='password2' value={passwordConfirmation} placeholder='salasana uudelleen' onChange={handleChange} isInvalid={ !!errors.passwordConfirmation }/>
                        <Form.Control.Feedback type='invalid'>{ errors.passwordConfirmation }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={10}>
                        <Form.Control plaintext readOnly defaultValue="Maksimitulos seuraavissa klassisissa voimailuliikkeissä" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Kyykky</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='bestSquat' value={userdata.bestSquat} placeholder='kg' onChange={handleChange} isInvalid={ !!errors.bestSquat }/>
                        <Form.Control.Feedback type='invalid'>{ errors.bestSquat }</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Penkkipunnerrus</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='bestBenchPress' value={userdata.bestBenchPress} placeholder='kg' onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Kulmasoutu</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='bestBarbellRow' value={userdata.bestBarbellRow} placeholder='kg' onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Pystypunnerrus</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='bestOverheadPress' value={userdata.bestOverheadPress} placeholder='kg' onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Maastaveto</Form.Label>
                    <Col sm={10}>
                        <Form.Control type='text' name='bestDeadlift' value={userdata.bestDeadlift} placeholder='kg' onChange={handleChange} />
                    </Col>
                </Form.Group>
                <Button type='submit'>Rekisteröidy</Button>
            </Form>
        </div>
    )
}

export default UserAdder