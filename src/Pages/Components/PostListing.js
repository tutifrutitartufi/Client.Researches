import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewPost, GetPosts } from "../../Actions";
import '../Assets/Styles/PostListing.scss';
import '../Assets/Styles/Controls/REPost.scss'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import REPost from "./Controls/REPost";
import { Paper } from "@material-ui/core";
import {toast} from "react-toastify";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewPost, GetPosts }, dispatch);
}
function PostListing({NewPost, GetPosts}) {
    const [ Posts, SetPosts ] = useState([]);
    const [ NewPostState, SetNewPostState ] = useState(false);
    const [ NewPostContent, SetNewPostContent ] = useState('');
    let { id } = useParams();


    useEffect(() => {
        GetPosts(id).then(res => {
            if (res && res.payload && res.payload.data) {
                SetPosts(res.payload.data);
            }
        })
    })

    const SaveNewPost = () => {
        NewPost(id, {content: NewPostContent}).then(res => {
            if (res && res.payload && res.payload.data) {
                toast.success('Success');
                SetNewPostContent('');
                SetNewPostState(false);
            }
        })
    }



    const RenderNewPost = () => {
        return (
            <Paper className='re_new-post-wrapper' elevation={3}>
                <textarea autoFocus onChange={(e) => SetNewPostContent(e.target.value)}/>
                <div className='re_new-post-action'>
                    <REButton value='Save' onClick={() => SaveNewPost()}/>
                    <REButton value='Delete' onClick={() => RemoveNewPost()}/>
                </div>
            </Paper>
        )
    }

    const RemoveNewPost = () => {
        SetNewPostContent('');
        SetNewPostState(false);
    }

    return (
        <>
            { Posts.map((post, index) => <REPost key={"_" + index} {...post}/>) }
            <div className='re_post-listing-action-wrapper'>
                { NewPostState && RenderNewPost() }
                <REButton value='Add post' onClick={() => SetNewPostState(true)}/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(PostListing);
