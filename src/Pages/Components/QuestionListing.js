import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewQuestion, GetQuestions, DeleteQuestion } from "../../Actions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import REQuestion from "./Controls/REQuestion";
import { Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import RESelect from "./Controls/RESelect";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewQuestion, GetQuestions, DeleteQuestion }, dispatch);
}

function QuestionListing({ NewQuestion, GetQuestions, DeleteQuestion, canvasId } ) {
    const [ Questions, SetQuestions ] = useState([]);
    const [ NewQuestionState, SetNewQuestionState ] = useState(false);
    const [ NewQuestionContent, SetNewQuestionContent ] = useState('');
    const [ QuestionType, SetQuestionType ] = useState('');
    let { id } = useParams();


    useEffect(() => {
        GetQuestionItems();
    },[])


    const GetQuestionItems = () => {
        GetQuestions(id, canvasId).then(res => {
            if (res && res.payload && res.payload.data) {
                SetQuestions(res.payload.data);
            }
        })
    }

    const DeleteQuestionItem = (canvasId, questionId) => {
        DeleteQuestion(id, canvasId, questionId).then(res => {
            if(res && res.payload && res.payload.data) {
                GetQuestionItems();
                toast.success('Success');
            }
        })
    }

    const SaveNewQuestion = () => {
        NewQuestion(id, canvasId, {title: NewQuestionContent, type: QuestionType}).then(res => {
            if (res && res.payload && res.payload.data) {
                toast.success('Success');
                GetQuestionItems();
                SetNewQuestionContent('');
                SetNewQuestionState(false);
            }
        })
    }

    const RenderNewPost = () => {
        return (
            <Paper className='re_new-post-wrapper re_new-question-wrapper' elevation={3}>
                <span>Title</span>
                <textarea autoFocus onChange={(e) => SetNewQuestionContent(e.target.value)}/>
                <RESelect
                    label='Question type'
                    value={ QuestionType }
                    onChange={(e) => {
                        SetQuestionType(e.target.value);
                    }}
                />
                <div className='re_new-post-action'>
                    <REButton value='Save' onClick={() => SaveNewQuestion()}/>
                    <REButton value='Delete' onClick={() => RemoveNewQuestion()}/>
                </div>
            </Paper>
        )
    }

    const RemoveNewQuestion = () => {
        SetNewQuestionContent('');
        SetNewQuestionState(false);
    }

    return (
        <>
            { Questions.map((question, index) => <REQuestion key={"_" + index} canvasId={canvasId} DeleteQuestionItem={DeleteQuestionItem} {...question}/>) }
            <div className='re_post-listing-action-wrapper'>
                { NewQuestionState && RenderNewPost() }
                <REButton value='Add question' onClick={() => SetNewQuestionState(true)}/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(QuestionListing);
