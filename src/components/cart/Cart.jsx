import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from "./styles"
import CartItem from './CartItem/CartItem';

const Cart = ( { cart }) => {

    const classes = useStyles(); 

    const EmptyCart = () => (
        <Typography variant='subtitle1'> Votre panier est vide... Pour l'instant !</Typography>
    );

    const FilledCart = () => (
        <>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id} >
                    <CartItem item={item} />
                </Grid>

            ))}

        </Grid>
        <div className={classes.cartDetails}>
            <Typography variant='h4'>
                Prix Total : { cart.subtotal.formatted_with_symbol}
                <div>
                    <Button className={classes.emptyButton} size="large" type="Button" variant="contained" color='secondary'>
                        Vider le panier
                    </Button>
                    <Button className={classes.checkoutButton} size="large" type="Button" variant="contained" color='primary'>
                        Payer !
                    </Button>
                </div>
            </Typography>
        </div>
        </>
    )

    if(!cart.line_items) return 'Loading...'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom> Votre Panier</Typography>

            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;