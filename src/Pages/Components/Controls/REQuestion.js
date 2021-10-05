import { Paper } from "@material-ui/core";
import '../../Assets/Styles/Controls/REPost.scss'
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EditQuestion } from "../../../Actions";
import RESelect from "./RESelect";
import REButton from "./REButton";
import RELoader from "./RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ EditQuestion }, dispatch);
}

function REQuestion( props ){
    const [ Edit, SetEdit ] = useState(false);
    const [ Title, SetTitle ] = useState(props.title);
    const [ QuestionType, SetQuestionType ] = useState(props.type);
    const [ IsLoading, SetLoading ] = useState(false);


    const renderUserType = () => {
      switch (QuestionType) {
          case 0:
              return 'Single';
          case 1:
              return 'Multiple';
          default:
              return 'Text';
      }
    };

    const EditOldQuestion = () => {
        SetLoading(true);
        props.EditQuestion(props.researchId, props.canvasId, {title: Title, type: QuestionType, id: props.id}).then(res => {
            SetLoading(false);
            SetEdit(false);
        })
    };

    if(IsLoading) {
        return <RELoader/>
    }


    if(Edit) {
        return (
            <Paper className='re_new-post-wrapper re_new-question-wrapper' elevation={3}>
                <div className='re_trash_action'>
                    <div onClick={() => SetEdit(!Edit)} ><img src="/pen.png" alt=""/></div>
                    <div onClick={() => props.DeleteQuestionItem(props.canvasId, props.id)}><img src="/trash_bin.svg" alt=""/></div>
                </div>
                <span>Title</span>
                <textarea autoFocus value={Title} onChange={(e) => SetTitle(e.target.value)}/>
                <RESelect
                    label='Question type'
                    value={ QuestionType }
                    onChange={(e) => {
                        SetQuestionType(e.target.value);
                    }}
                />
                <div className='re_new-post-action'>
                    <REButton style={{marginTop: 20, marginLeft: 0}} value='Save' onClick={() => EditOldQuestion()}/>
                </div>
            </Paper>
        )
    } else {
        return (
            <Paper elevation={3} >
                <div className='re_trash_action'>
                    <div onClick={() => SetEdit(!Edit)} ><img src="/pen.png" alt=""/></div>
                    <div onClick={() => props.DeleteQuestionItem(props.canvasId, props.id)}><img src="/trash_bin.svg" alt=""/></div>
                </div>
                <div>{Title}</div>
                <div>{renderUserType()}</div>
            </Paper>
        )
    }

}

export default connect(null, mapDispatchToProps)(REQuestion);

