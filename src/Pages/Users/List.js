import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetUsers, DeleteUser, SearchUsers } from "../../Actions";
import { formatDateTimeList, formatRole } from "../../Utils"
import RETable from "../Components/Controls/RETable";
import REModal from "../Components/Controls/REModal";
import RELoader from "../Components/Controls/RELoader";

import '../Assets/Styles/ListUsers.scss';
import RETextfield from "../Components/Controls/RETextfield";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetUsers, DeleteUser, SearchUsers }, dispatch);
}

function List({ GetUsers, DeleteUser, SearchUsers }) {
    const [ Users, SetUsers ] = useState([]);
    const [ DeleteModal, SetDeleteModal ] = useState(false);
    const [ User, SetUser ] = useState(null);
    const [ Search, SetSearch ] = useState(null);
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

    const handleSearch = (search) => {
        if(search) {
            SearchUsers(search).then(res => {
                if(res && res.payload && res.payload.data){
                    SetUsers(res.payload.data);
                }
                SetLoading(false);
            })
        } else {
            GetUsers().then(res => {
                if(res && res.payload && res.payload.data){
                    SetUsers(res.payload.data);
                }
                SetLoading(false);
            })
        }
    };


    if( IsLoading ) {
        return <RELoader/>
    }

    return (
        <div className='re_user_listing'>
            { DeleteModal ? <REModal Action={ActionModal} User={User} Close={SetDeleteModal}/> : <></> }
            <div className='re_user_listing_search'>
                <RETextfield
                    label='Search'
                    value={ Search }
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <RETable
                data={ Users }
                columns={[
                { title: 'First name', field: 'firstName', searchable: false },
                { title: 'Last name', field: 'lastName', searchable: false },
                { title: 'Date of birth', field: 'dateOfBirth', render: rowData => <>{formatDateTimeList(rowData.dateOfBirth)}</>,  searchable: false},
                { title: 'Role', field: 'role', render: rowData => <>{formatRole(rowData.role)}</>,  searchable: false }
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
                options={{
                    debounceInterval: 500,
                    paging: false,
                    search: false
                }}
            />
        </div>
    );
}
export default connect(null, mapDispatchToProps)(List);
