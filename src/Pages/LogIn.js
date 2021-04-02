import  { useState } from 'react';
import { Authenticate } from "../Actions";

import './Assets/Styles/LogIn.scss'
import REButton from "./Components/Controls/REButton";
import RETextfield from "./Components/Controls/RETextfield";

function LogIn() {
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');

    return (
        <div className="re_login_container">
            <div className="re_login_wrapper">
                <div className="re_login_card">
                    <RETextfield
                        label='Username'
                        onChange={(e) => SetUsername(e.target.value)}
                    />
                    <RETextfield
                        label='Password'
                        onChange={(e) => SetPassword(e.target.value)}
                    />
                    <REButton
                        value='Log in'
                        onClick={() => Authenticate(Username,Password)}
                    />
                </div>
            </div>
        </div>

    );
}

export default LogIn;
