import { connect } from "react-redux";
import {useEffect, useState} from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetUsers, DeleteUser } from "../../Actions";

import RETable from "../Components/Controls/RETable";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetUsers, DeleteUser }, dispatch);
}
function List({GetUsers, DeleteUser}) {
    const [Users, SetUsers] = useState([]);
    const history = useHistory();

    useEffect(() =>{
        GetUsers().then(res => {
            if(res && res.payload && res.payload.data){
                SetUsers(res.payload.data);
            }
        })
    }, [])

    return (
        <RETable
            data={Users}
            columns={[
            { title: 'First name', field: 'firstName' },
            { title: 'Last name', field: 'lastName' },
            { title: 'Date of birth', field: 'dateOfBirth' },
            { title: 'Role', field: 'role' }
        ]}
            title='Users'
            actions={[
                {
                    icon: 'visibility',
                    tooltip: 'Show user',
                    onClick: (event, rowData) => history.push(`users/${rowData.id}`)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete user',
                    onClick: (event, rowData) => DeleteUser(rowData.id)
                }
            ]}
        />
    );
}

export default connect(null, mapDispatchToProps)(List);
