import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory, useParams } from "react-router-dom";


import { GetUser } from "../../Actions";
import RECardMedia from "../Components/Controls/RECardMedia";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetUser }, dispatch);
}
function Show({GetUser}) {
    const [User, SetUser] = useState({});
    let { id } = useParams();
    const history = useHistory();

    useEffect(() =>{
        GetUser(id).then(res => {
            if(res && res.payload && res.payload.data){
                SetUser(res.payload.data);
            }
        })
    }, [])
    return (
        <>
            <RECardMedia User={User}/>
        </>
    );
}

export default connect(null, mapDispatchToProps)(Show);
