import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";


import { GetResearches, DeleteResearch } from "../../Actions";
import RETable from "../Components/Controls/RETable";
import REModal from "../Components/Controls/REModal";
import toast from '../../Utils/Toast';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetResearches, DeleteResearch }, dispatch);
}

function List({GetResearches, DeleteResearch}) {
    const [Research, SetResearch] = useState([]);
    const [DeleteModal, SetDeleteModal] = useState(false);
    const history = useHistory();

    useEffect(() =>{
        GetResearches().then(res => {
            if(res && res.payload && res.payload.data){
                SetResearch(res.payload.data);
            }
        })
    }, [])

    const ActionModal = () =>{
        DeleteResearch(Research).then(res => {
            toast.success(res.payload.statusText);
            SetDeleteModal(false);
            GetResearches().then(res => {
                if(res && res.payload && res.payload.data){
                    SetResearch(res.payload.data);
                }
            })
        });
    }

    return (
        <>
            { DeleteModal ? <REModal Action={ActionModal} Research={Research} Close={SetDeleteModal}/> : <></> }
            <RETable
                data={ Research }
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Moderator', field: 'moderator' },
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
