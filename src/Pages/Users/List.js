import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetUsers, DeleteUser } from "../../Actions";
import { formatDateTimeList, formatRole } from "../../Utils"
import RETable from "../Components/Controls/RETable";
import REModal from "../Components/Controls/REModal";
import toast from '../../Utils/Toast';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetUsers, DeleteUser }, dispatch);
}

function List({ GetUsers, DeleteUser }) {
    const [Users, SetUsers] = useState([]);
    const [DeleteModal, SetDeleteModal] = useState(false);
    const [User, SetUser] = useState(null);
    const history = useHistory();

    useEffect(() =>{
        GetUsers().then(res => {
            if(res && res.payload && res.payload.data){
                SetUsers(res.payload.data);
            }
        })
    }, [])

    const ActionModal = () =>{
        DeleteUser(User).then(res => {
            toast.success(res.payload.statusText);
            SetDeleteModal(false);
            GetUsers().then(res => {
                if(res && res.payload && res.payload.data){
                    SetUsers(res.payload.data);
                }
            })
        });
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
