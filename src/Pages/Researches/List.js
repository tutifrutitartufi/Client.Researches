import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import {GetResearches, DeleteResearch, GetUsers} from "../../Actions";
import RETable from "../Components/Controls/RETable";
import REModal from "../Components/Controls/REModal";
import RELoader from "../Components/Controls/RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetResearches, DeleteResearch, GetUsers }, dispatch);
}

function List({GetResearches, DeleteResearch, GetUsers}) {
    const [Research, SetResearch] = useState([]);
    const [DeleteModal, SetDeleteModal] = useState(false);
    const [Users, SetUsers] = useState([]);
    const history = useHistory();
    const [ IsLoading, SetLoading ] = useState(true);

    useEffect(() =>{
        GetResearches().then(res => {
            if(res && res.payload && res.payload.data){
                SetResearch(res.payload.data);
                GetUsers().then(users => {
                    if(users && users.payload && users.payload.data) {
                        SetUsers(users.payload.data);
                        SetLoading(false);
                    }
                })
            }
        })
    }, []);

    const ActionModal = () =>{
        DeleteResearch(Research).then(res => {
            SetDeleteModal(false);
            GetResearches().then(res => {
                if(res && res.payload && res.payload.data){
                    SetResearch(res.payload.data);
                }
            })
        });
    };

    if(IsLoading) {
        return <RELoader/>
    }


    return (
        <>
            { DeleteModal ? <REModal Action={ActionModal} Research={Research} Close={SetDeleteModal}/> : <></> }
            <RETable
                data={ Research }
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Moderator', field: 'moderator', render: rowData => <span>{Users.find(x => x.id === rowData.moderator).firstName + " " + Users.find(x => x.id === rowData.moderator).lastName}</span>}
                ]}
                title='Researches'
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'Show research',
                        onClick: (_, rowData) => history.push(`researches/${rowData.id}`)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete research',
                        onClick: (_, rowData) => {
                            SetResearch(rowData.id);
                            SetDeleteModal(true)
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Research',
                        isFreeAction: true,
                        onClick: () => history.push(`/researches/new`)
                    }
                ]}
            />
        </>
    );
}
export default connect(null, mapDispatchToProps)(List);
