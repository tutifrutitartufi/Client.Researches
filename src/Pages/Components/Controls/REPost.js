import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'
import { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EditPost } from "../../../Actions";
import REButton from "./REButton";


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ EditPost }, dispatch);
}

function REPost(props){
    const [ Edit, SetEdit ] = useState(false);
    const [ PostContent, SetPostContent ] = useState(props.content);
    const [ IsLoading, SetLoading ] = useState(false);

    const RenderEditState = () => {
        if(Edit) {
            return <textarea autoFocus onChange={(e) => SetPostContent(e.target.value)}/>
        } else {
            return <div>{PostContent}</div>
        }
    };

    const EditOldPost = () => {
        SetLoading(true);
        props.EditPost(props.researchId, {content: PostContent, id: props.id, author: props.author.id}).then(res => {
            SetEdit(false);
            SetLoading(false);
        })
    };


    return (
        <Paper elevation={3} >
            <div className='re_trash_action'>
                <div onClick={() => SetEdit(!Edit)} ><img src="/pen.png" alt=""/></div>
                <div onClick={() => props.DeletePostItem(props.id)} ><img src="/trash_bin.svg" alt=""/></div>
            </div>
            <div>{props.author.firstName + " " + props.author.lastName}</div>
            {RenderEditState()}
            {Edit && <REButton style={{marginTop: 20}} value='Save' onClick={() => EditOldPost()}/>}
        </Paper>
    )
}

export default connect(null, mapDispatchToProps)(REPost);
