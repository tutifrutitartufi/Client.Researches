import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useHistory, useParams } from "react-router-dom";
import { Tabs, Paper, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {GetPosts, GetCanvasses, GetResearch} from "../../Actions";
import REPost from "../Components/Controls/REPost";
import RECanvas from "../Components/Controls/RECanvas";

import '../Assets/Styles/ShowResearch.scss';

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

    const [ TabNum, SetTabNum ] = useState(0)
    const [ Posts, SetPosts ] = useState([]);
    const [ Canvasses, SetCanvasses ] = useState([]);

    let { id } = useParams();
    const history = useHistory();

    useEffect(() =>{
        GetPosts(id).then(res => {
            if(res && res.payload && res.payload.data) {
                SetPosts(res.payload.data);
            }
        })
        GetCanvasses(id).then(res => {
            if(res && res.payload && res.payload.data) {
                SetCanvasses(res.payload.data);
            }
        })
        GetResearch(id).then(res => {
            if(res && res.payload && res.payload.data) {
                console.log(res.payload.data)
            }
        })
    }, [])

    const Content = () => {
        switch (TabNum) {
            case 0:
                return Posts.map((post, index) => <REPost key={"_" + index} {...post}/>)
            case 1:
                return Canvasses.map((canvas, index) => <RECanvas key={"_" + index} {...canvas}/>)
            case 2:
                return renderInfo();

        }
    }

    const renderInfo = () => {
        return <div>test123</div>
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
                {Content()}
            </div>
        </>
    );
}

export default connect(null, mapDispatchToProps)(Show);
