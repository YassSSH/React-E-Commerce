import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLIC_KEY);

const PayementForm = ({ shippingData ,checkoutToken, backStep, onCaptureCheckout , nextStep}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type : 'card' , card : cardElement})

        if(error) {
            console.log(error);
        } else {
            const orderData = {
                line_items : checkoutToken.live.line_items,
                customer : {firstname : shippingData.prenom, lastname : shippingData.nom, email : shippingData.mail, phone : shippingData.phone},
                shipping : { name : 'Primary' , 
                street : shippingData.address1, 
                town_city : shippingData.ville,
                county_state : shippingData.ShippingSubdivision,
                postal_zip_code : shippingData.codepostal,
                country : shippingData.shippingCountry
             },
            fulfillment : { shipping_method : shippingData.shippingOption},
                payment : {
                    gateway : 'stripe',
                        stripe : {
                             payment_method_id : paymentMethod.id
                     }
                 }
            }

            console.log(shippingData)
            onCaptureCheckout(checkoutToken.id, orderData)
            nextStep(orderData)
            

        }
    }
    return (
        <>
        {console.log(shippingData)}
        <Review checkoutToken={checkoutToken} />
        <Divider />
        <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>
            Payement Method
        </Typography>
        <Elements stripe={stripePromise}>
            <ElementsConsumer>
                {({ elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /> <br />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='outlined' onClick={backStep} >Retour</Button>
                            <Button type='submit' variant='contained' disabled={!stripe} color="primary">
                                Payer {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>
                        </div>
                    </form>

                )}
            </ElementsConsumer>

        </Elements>
        </>
    );
};

export default PayementForm;