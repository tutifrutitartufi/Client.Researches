import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Paper, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GetPosts, GetCanvasses, GetResearch } from "../../Actions";

import PostListing from '../Components/PostListing'
import CanvasListing from '../Components/CanvasListing'

import '../Assets/Styles/ShowResearch.scss';
import RELoader from "../Components/Controls/RELoader";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ GetPosts, GetCanvasses, GetResearch }, dispatch);
}
function Show( { GetPosts, GetCanvasses, GetResearch } ) {
    const classes = useStyles();
    const [ TabNum, SetTabNum ] = useState(0);
    const [ Research, SetResearch ] = useState({});
    const [ IsLoading, SetLoading ] = useState(true);

    let { id } = useParams();

    useEffect(() =>{
        GetResearch(id).then(res => {
            if(res && res.payload && res.payload.data) {
                SetResearch(res.payload.data);
            }
            SetLoading(false);
        })
    }, []);

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

    const RenderInfo = () =>
        (
            <div>
                <span>Name: { Research.name }</span>
                <span>Moderator: { Research.moderator }</span>
                <div>Members:
                    { Research.members.map((member) => <div>{member}</div>) }
                </div>
            </div>
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
