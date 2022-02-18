import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from "./styles"
import { NavLink } from 'react-router-dom';
import CartItem from './CartItem/CartItem';



const Cart = ( { cart, onUpdateCartQty, onRemoveFromCart, handleEmptyCart, }) => {

    const classes = useStyles(); 

    const EmptyCart = () => (
        <Typography variant='subtitle1'> Votre panier est vide... Pour l'instant !
        <NavLink to="/" className={classes.link} > Ajoutez des produits dés maintenant !</NavLink>
        </Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id} >
                    <CartItem item={item} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
                </Grid>

            ))}

        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant='h4' className={classes.prix}>
                Prix Total : { cart.subtotal.formatted_with_symbol}
            </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="Button" variant="contained" color='secondary' onClick={handleEmptyCart} >
                        Annuler
                    </Button>
                    <NavLink style={{textDecoration: 'none'}} to="/checkout">
                    <Button className={classes.checkoutButton} size="large" type="Button" variant="contained" color='primary'>
                        Payer !
                    </Button>
                    </NavLink>
                </div>
        </div>
        </>
    )

    if(!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom> Votre Panier </Typography>

            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;