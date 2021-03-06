import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { formatRole, formatDateTimeList } from "../../../Utils";
const useStyles = makeStyles({
    media: {
        height: 400,
        backgroundSize: 'contain'
    },
});

export default function RECardMedia({User}) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    src={User.profilePicture}
                    image={User.profilePicture}
                    title={`${User.firstName} ${User.lastName}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {`${User.firstName} ${User.lastName}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Username: {`${User.username}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Date of birth: {`${formatDateTimeList(User.dateOfBirth)}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Role:  {`${formatRole(User.role)}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
