import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetUsers, DeleteUser } from "../../Actions";
import { formatDateTimeList, formatRole } from "../../Utils"
import RETable from "../Components/Controls/RETable";
import REModal from "../Components/Controls/REModal";
import RELoader from "../Components/Controls/RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetUsers, DeleteUser }, dispatch);
}

function List({ GetUsers, DeleteUser }) {
    const [ Users, SetUsers ] = useState([]);
    const [ DeleteModal, SetDeleteModal ] = useState(false);
    const [ User, SetUser ] = useState(null);
    const [ IsLoading, SetLoading ] = useState(true);
    const history = useHistory();

    useEffect(() =>{
        GetUsers().then(res => {
            if(res && res.payload && res.payload.data){
                SetUsers(res.payload.data);
            }
            SetLoading(false);
        })
    }, []);

    const ActionModal = () =>{
        DeleteUser(User).then(res => {
            SetDeleteModal(false);
            GetUsers().then(res => {
                if(res && res.payload && res.payload.data){
                    SetUsers(res.payload.data);
                }
            })
        });
    };

    if( IsLoading ) {
        return <RELoader/>
    }

    return (
        <>
            { DeleteModal ? <REModal Action={ActionModal} User={User} Close={SetDeleteModal}/> : <></> }
        <RETable
            data={ Users }
            columns={[
            { title: 'First name', field: 'firstName' },
            { title: 'Last name', field: 'lastName' },
            { title: 'Date of birth', field: 'dateOfBirth', render: rowData => <>{formatDateTimeList(rowData.dateOfBirth)}</>},
            { title: 'Role', field: 'role', render: rowData => <>{formatRole(rowData.role)}</> }
        ]}
            title='Users'
            actions={[
                {
                    icon: 'visibility',
                    tooltip: 'Show user',
                    onClick: (_, rowData) => history.push(`users/${rowData.id}`)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete user',
                    onClick: (_, rowData) => {
                        SetUser(rowData.id);
                        SetDeleteModal(true)
                    }
                },
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: () => history.push(`/users/new`)
                }
            ]}
        />
        </>
    );
}
export default connect(null, mapDispatchToProps)(List);
