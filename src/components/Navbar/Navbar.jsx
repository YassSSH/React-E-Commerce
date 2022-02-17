import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import logo from "./logoo.png"
import useStyles from './styles';
import { NavLink } from 'react-router-dom';


const Navbar = ({ totalItems }) => {

    const classes = useStyles()
    return (
        <div>
            <AppBar position='fixed' className={classes.AppBar} color="inherit">
                <Toolbar>
                    <NavLink to="/" style={{ textDecoration: 'none', color: "black" }}>
                    <Typography variant='h6' className={classes.title} color="inherit">
                        <img src={logo} alt="Pasdenom.js" height="35px" className={classes.image}/>
                        EUPHORIA
                    </Typography>
                    </NavLink>
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                        <NavLink to="/cart">
                        <IconButton aria-label='Voir le panier' color='inherit'>
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart></ShoppingCart>
                            </Badge>
                        </IconButton>
                        </NavLink>
                    </div>

                </Toolbar>

            </AppBar>
        </div>
    );
};

export default Navbar;