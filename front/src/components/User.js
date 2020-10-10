import React from 'react'
import { StandardButton } from '../styles/Buttons'

const User = ( {userdata, handleDelete} ) => {

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td><b>{userdata.name}</b></td>
                    <td> <StandardButton onClick={handleDelete}>poista</StandardButton></td>
                </tr>
                <tr>
                    <td>ylläpitäjän oikeudet</td>
                    <td>{userdata.admin? <div>kyllä</div> : <div>ei</div>}</td>
                </tr>
                <tr>
                    <td>ikä</td>
                    <td>{userdata.age}</td>
                </tr>
                <tr>
                    <td>paino</td>
                    <td>{userdata.weigth}</td>
                </tr>
                <tr>
                    <td>pituus</td>
                    <td>{userdata.heigth}</td>
                </tr>
                <tr>
                    <td>kyykyn lähtömaksimi</td>
                    <td>{userdata.bestSquat}</td>
                </tr>
                <tr>
                    <td>penkkipunnerruksen lähtömaksimi</td>
                    <td>{userdata.bestBenchPress}</td>
                </tr>
                <tr>
                    <td>kulmasoudun lähtömaksimi</td>
                    <td>{userdata.bestBarbellRow}</td>
                </tr>
                <tr>
                    <td>pystypunnerruksen lähtömaksimi</td>
                    <td>{userdata.bestOverheadPress}</td>
                </tr>
                <tr>
                    <td>maastavedon lähtömaksimi</td>
                    <td>{userdata.bestDeadlift}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default User
