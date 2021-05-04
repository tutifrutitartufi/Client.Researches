import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewPost, GetPosts, DeletePost } from "../../Actions";
import '../Assets/Styles/PostListing.scss';
import '../Assets/Styles/Controls/REPost.scss'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import REPost from "./Controls/REPost";
import { Paper } from "@material-ui/core";
import RELoader from "./Controls/RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewPost, GetPosts, DeletePost }, dispatch);
}

function PostListing({NewPost, GetPosts, DeletePost}) {
    const [ Posts, SetPosts ] = useState([]);
    const [ NewPostState, SetNewPostState ] = useState(false);
    const [ NewPostContent, SetNewPostContent ] = useState('');
    let { id } = useParams();
    const [ IsLoading, SetLoading ] = useState(true);


    useEffect(() => {
        GetPostItems();
    },[]);

    const GetPostItems = () => {
        GetPosts(id).then(res => {
            if (res && res.payload && res.payload.data) {
                SetPosts(res.payload.data);
            }
            SetLoading(false);
        })
    };

    const DeletePostItem = (postId) => {
        DeletePost(id, postId).then(res => {
            if(res && res.payload && res.payload.data) {
                GetPostItems();
            }
        })
    };

    const SaveNewPost = () => {
        NewPost(id, {content: NewPostContent, likes: ['607df0cc8e71f8008f158413'], dislikes: ['607df0cc8e71f8008f158413']}).then(res => {
            if (res && res.payload && res.payload.data) {
                GetPostItems();
                SetNewPostContent('');
                SetNewPostState(false);
            }
        })
    };

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
    };

    const RemoveNewPost = () => {
        SetNewPostContent('');
        SetNewPostState(false);
    };

    if ( IsLoading ) {
        return <RELoader/>
    }

    return (
        <>
            { Posts.map((post, index) => <REPost key={"_" + index} DeletePostItem={DeletePostItem} {...post}/>) }
            <div className='re_post-listing-action-wrapper'>
                { NewPostState && RenderNewPost() }
                <REButton value='Add post' onClick={() => SetNewPostState(true)}/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(PostListing);
