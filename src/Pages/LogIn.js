import  { useState } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Authenticate } from "../Actions";
import { Context } from "../Contexts/Auth";

import './Assets/Styles/LogIn.scss'
import REButton from "./Components/Controls/REButton";
import RETextfield from "./Components/Controls/RETextfield";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ Authenticate }, dispatch);
}

function LogIn({Authenticate}) {
    const { setAuth } = Context();
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');

    const AuthenticateUser = () => {
        Authenticate(Username, Password).then((state) =>{
            if(state && state.payload && state.payload.data){
                setAuth(state.payload.data);
            }
        })
    }

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
                        onClick={() => AuthenticateUser(Username,Password)}
                    />
                </div>
            </div>
        </div>

    );
}

export default connect(null, mapDispatchToProps)(LogIn);
