import React from 'react';
import useStyles from "./styles";

const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.err}>
            <br />
            <br />
            <h1 className={classes.error}>ERREUR 404</h1>
        </div>
    );
};

export default NotFound;