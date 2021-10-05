import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Paper, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GetPosts, GetCanvasses, GetResearch, GetUsers, EditResearch } from "../../Actions";

import PostListing from '../Components/PostListing'
import CanvasListing from '../Components/CanvasListing'

import '../Assets/Styles/ShowResearch.scss';
import RELoader from "../Components/Controls/RELoader";
import REButton from "../Components/Controls/REButton";
import RETextfield from "../Components/Controls/RETextfield";
import RESelect from "../Components/Controls/RESelect";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetPosts, GetCanvasses, GetResearch, GetUsers, EditResearch }, dispatch);
}
function Show( { GetPosts, GetCanvasses, GetResearch, GetUsers, EditResearch } ) {
    const classes = useStyles();
    const [ Users, SetUsers ] = useState([]);
    const [ TabNum, SetTabNum ] = useState(2);
    const [ Research, SetResearch ] = useState({});
    const [ IsLoading, SetLoading ] = useState(true);
    const [ Name, SetName ] = useState('');
    const [ Moderator, SetModerator ] = useState();
    const [ Members, SetMembers ] = useState([]);

    let history = useHistory();



    let { id } = useParams();

    useEffect(() =>{
        GetResearch(id).then(res => {
            if(res && res.payload && res.payload.data) {
                SetResearch(res.payload.data);
                GetUsers().then((users) => {
                    SetUsers(users.payload.data);
                    SetName(res.payload.data.name);
                    SetModerator(res.payload.data.moderator);
                    SetMembers(res.payload.data.members);
                    SetLoading(false);
                });
            }
        });
    }, []);

    const HandleChangeMembers = (event) => {
        SetMembers(event.target.value);
    };

    const SaveResearch = () => {
        EditResearch({
            id: Research.id,
            name: Name,
            moderator: Moderator,
            members: Members,
            canvasses: Research.canvasses,
            posts: Research.posts
        }).then((_,__) => {
            history.push(`/researches`)
        })
    };

    const Content = () => {
        switch (TabNum) {
            case 0:
                return <PostListing/>;
            case 1:
                return <CanvasListing/>;
            default:
                return RenderInfo();

        }
    };
    
    
    const RenderInfo = () => (
        <>
            <div className='re_action_wrapper'>
                <REButton
                    value='Back'
                    onClick={() => history.push(`/researches`)}
                />
                <REButton
                    value='Save'
                    onClick={() => SaveResearch()}
                />
            </div>
            <div className='re_user_edit_container'>
                <RETextfield
                    label='Name'
                    value={ Name }
                    onChange={(e) => SetName(e.target.value)}
                />
                <RESelect
                    label='Moderator'
                    options={ Users }
                    value={ Moderator }
                    onChange={(e) => {
                        SetModerator(e.target.value)
                    }}
                />
                <RESelect
                    multiple
                    label='Members'
                    options={ Users }
                    value={ Members }
                    onChange={ HandleChangeMembers }
                />
            </div>
        </>
    );

    if( IsLoading ) {
        return <RELoader/>
    }

    return (
        <>
            <Paper className={classes.root}>
                <Tabs
                    value={ TabNum }
                    onChange={(_,val) => {
                        SetTabNum(val)
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Posts" />
                    <Tab label="Canvasses" />
                    <Tab label="Info" />
                </Tabs>
            </Paper>
            <div className='re_research_content'>
                { Content() }
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(Show);
