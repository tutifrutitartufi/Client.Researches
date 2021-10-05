import { connect } from "react-redux";
import {useEffect, useState} from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetUsers, NewResearch } from "../../Actions";
import RETextfield from "../Components/Controls/RETextfield";
import RESelect from "../Components/Controls/RESelect";

import '../Assets/Styles/EditUser.scss';
import REButton from "../Components/Controls/REButton";
import RELoader from "../Components/Controls/RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewResearch, GetUsers }, dispatch);
}
function New( { NewResearch, GetUsers } ) {
    const [ Name, SetName ] = useState('');
    const [ Moderator, SetModerator ] = useState('');
    const [ Members, SetMembers ] = useState([]);
    const [ Users, SetUsers ] = useState([]);
    const [ IsLoading, SetLoading ] = useState(true);

    let history = useHistory();

    useEffect(() => {
            GetUsers().then((res) => {
                SetUsers(res.payload.data);
                SetLoading(false);
            })
    }, []);

    const SaveResearch = () => {
        NewResearch({
            name: Name,
            moderator: Moderator,
            members: Members,
            canvasess: [],
            posts: []
        }).then(() => {
            history.push(`/researches`)
        })
    };

    const HandleChangeMembers = (event) => {
        SetMembers(event.target.value);
    };

    if( IsLoading ) {
        return <RELoader/>
    }

    return (
        <>
            <div className='re_action_wrapper'>
                <REButton
                    value='Back'
                    onClick={() => history.push(`/researches`)}
                />
                <REButton
                    value='Save'
                    onClick={() => SaveResearch()}
                />
            </div>
            <div className='re_user_edit_container'>
                <RETextfield
                    label='Name'
                    value={ Name }
                    onChange={(e) => SetName(e.target.value)}
                />
                <RESelect
                    label='Moderator'
                    options={ Users }
                    value={ Moderator }
                    onChange={(e) => {
                        SetModerator(e.target.value)
                    }}
                />
                <RESelect
                    multiple
                    label='Members'
                    options={ Users }
                    value={ Members }
                    onChange={HandleChangeMembers}
                />
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(New);
