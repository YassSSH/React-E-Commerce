import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import logo from "./logoo.png"
import useStyles from './styles';


const Navbar = () => {

    const classes = useStyles()
    return (
        <div>
            <AppBar position='fixed' className={classes.AppBar} color="inherit">
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color="inherit">
                        <img src={logo} alt="Pasdenom.js" height="35px" className={classes.image}/>
                        E-Commerce
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <IconButton aria-label='Voir le panier' color='inherit'>
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart></ShoppingCart>
                            </Badge>
                        </IconButton>
                    </div>

                </Toolbar>

            </AppBar>
        </div>
    );
};

export default Navbar;