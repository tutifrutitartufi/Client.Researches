import { connect } from "react-redux";
import {  useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { NewUser } from "../../Actions";
import RETextfield from "../Components/Controls/RETextfield";
import REDatepicker from "../Components/Controls/REDatepicker";
import RESelect from "../Components/Controls/RESelect";

import '../Assets/Styles/EditUser.scss';
import REButton from "../Components/Controls/REButton";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewUser }, dispatch);
}
function New( { NewUser } ) {
    const [ FirstName, SetFirstName ] = useState('');
    const [ LastName, SetLastName ] = useState('');
    const [ Username, SetUsername ] = useState('');
    const [ Password, SetPassword ] = useState('');
    const [ Role, SetRole ] = useState(0);
    const [ DateOfBirth, SetDateOfBirth ] = useState('2021-04-11');
    const [ ProfilePicture, SetProfilePicture ] = useState('');

    let history = useHistory();

    const SaveUser = () => {
        NewUser({
            firstName: FirstName,
            lastName: LastName,
            username: Username,
            role: Role,
            password: Password,
            dateOfBirth: DateOfBirth,
            profilePicture: ProfilePicture
        }).then(() => {
            history.push(`/users`);
        })
    }

    const FileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('profile_picture').src = e.target.result;
                SetProfilePicture(e.target.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // In case you want to resize picture
    const UploadProfilePicture = () => {
        var formdata = new FormData();

        formdata.append("file", ProfilePicture);
        formdata.append("cloud_name", "tutifrutitartufi");
        formdata.append("upload_preset", "ml_default");

        fetch("https://api.cloudinary.com/v1_1/tutifrutitartufi/auto/upload",
            {
                method: "post",
                mode: "cors",
                body: formdata
            })
            .then((res) => res.json())
    };

    return (
        <>
            <div className='re_action_wrapper'>
                <REButton
                    value='Back'
                    onClick={() => history.push(`/users`)}
                />
                <REButton
                    value='Save'
                    onClick={() => SaveUser()}
                />
            </div>
            <div className='re_user_edit_container'>
                <div className='re_user_profile_picture'>
                    <img id='profile_picture' src={ ProfilePicture } alt={ Username }/>
                    <label className="re_custom_file_upload">
                        <input id='file_upload' onChange={ FileChange } type="file"/>
                        <img src="/upload.png" alt=""/>
                    </label>
                </div>
                <RETextfield
                    label='First name'
                    value={FirstName}
                    onChange={(e) => SetFirstName(e.target.value)}
                />
                <RETextfield
                    label='Last name'
                    value={LastName}
                    onChange={(e) => SetLastName(e.target.value)}
                />
                <RETextfield
                    label='Username'
                    value={ Username }
                    onChange={(e) => SetUsername(e.target.value)}
                />
                <RETextfield
                    label='Password'
                    value={ Password }
                    onChange={(e) => SetPassword(e.target.value)}
                />
                <RESelect
                    label='Role'
                    value={Role}
                    onChange={(e) => {
                        SetRole(e.target.value);
                    }}
                />
                <REDatepicker
                    label='Date of birth'
                    value={DateOfBirth}
                    onChange={(e) => {
                        SetDateOfBirth(e.target.value);
                    }}
                />
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(New);
