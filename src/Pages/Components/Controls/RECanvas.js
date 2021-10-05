import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'

import QuestionListing from '../QuestionListing';
import { useState } from "react";
import REButton from "./REButton";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EditCanvas } from "../../../Actions";
import RELoader from "./RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ EditCanvas }, dispatch);
}

function RECanvas(props){
    const [ Edit, SetEdit ] = useState(false);
    const [ CanvasTitle, SetCanvasTitle ] = useState(props.title);
    const [ IsLoading, SetLoading ] = useState(false);

    const RenderEditState = () => {
      if(Edit) {
          return <textarea autoFocus onChange={(e) => SetCanvasTitle(e.target.value)}/>
      } else {
          return <div>{CanvasTitle}</div>
      }
    };

    const EditOldCanvas = () => {
        SetLoading(true);
        props.EditCanvas(props.researchId, {title: CanvasTitle, questions: props.questions, id: props.id}).then(res => {
            SetEdit(false);
            SetLoading(false);
        })
    };

    if( IsLoading ) {
        return <RELoader/>
    }

    return (
        <Paper elevation={3} >
            <div className='re_trash_action'>
                <div onClick={() => SetEdit(!Edit)} ><img src="/pen.png" alt=""/></div>
                <div onClick={() => props.DeleteCanvasItem(props.id)} ><img src="/trash_bin.svg" alt=""/></div>
            </div>

            {RenderEditState()}
            <QuestionListing researchId={props.researchId} canvasId={props.id}/>
            {Edit && <REButton style={{marginTop: 20}} value='Save' onClick={() => EditOldCanvas()}/>}
        </Paper>
    )
}

export default connect(null, mapDispatchToProps)(RECanvas);
