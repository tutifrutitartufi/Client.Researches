import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { NewPost, GetPosts, DeletePost, GetUsers } from "../../Actions";
import '../Assets/Styles/PostListing.scss';
import '../Assets/Styles/Controls/REPost.scss'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import REButton from "./Controls/REButton";
import REPost from "./Controls/REPost";
import { Paper } from "@material-ui/core";
import RELoader from "./Controls/RELoader";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ NewPost, GetPosts, DeletePost, GetUsers }, dispatch);
}

function PostListing({NewPost, GetPosts, DeletePost, GetUsers}) {
    const [ Users, SetUsers ] = useState([]);
    const [ Posts, SetPosts ] = useState([]);
    const [ NewPostState, SetNewPostState ] = useState(false);
    const [ NewPostContent, SetNewPostContent ] = useState('');
    const [ IsLoading, SetLoading ] = useState(true);
    let { id } = useParams();


    useEffect(() => {
        GetUsers().then((res) => {
            if(res && res.payload && res.payload.data) {
                SetUsers(res.payload.data);
            }
            GetPostItems();
        });
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
        NewPost(id, {content: NewPostContent, author: JSON.parse(localStorage.getItem('user')).id}).then(res => {
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

    console.log(Posts);
    console.log(Users);


    return (
        <>
            { Posts.map((post, index) => <REPost key={"_" + index} DeletePostItem={DeletePostItem} {...post} researchId={id}  author={Users.find(x => x.id == post.author)}/>) }
            <div className='re_post-listing-action-wrapper'>
                { NewPostState && RenderNewPost() }
                <REButton value='Add post' onClick={() => SetNewPostState(true)}/>
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(PostListing);
