/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core"
import useStyles from "./styles" 
import AddressForm from '../AddressForm';
import PayementForm from '../PayementForm';
import { commerce } from '../../../lib/commerce';
import { NavLink } from 'react-router-dom';



const steps = ['Informations Livraison', 'Payement']


const Checkout = ( { cart, order, onCaptureCheckout, error }) => {
    
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

                console.log(token);
                setcheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
        console.log(checkoutToken);
    }, [cart])


    useEffect(() => {
        console.log(shippingData);
    }, [shippingData])

    const nextStep= () => {
        setActiveStep((previousActiveStep) => previousActiveStep +1)
    }
    const backStep= () => setActiveStep((previousActiveStep) => previousActiveStep -1)

    const test = (data) => {
        setShippingData(data);
        console.log(data);
        nextStep();
      };


    let Confirmation = () => order.customer ? (
        <>
        <div>
            <Typography variant='h5'> Merci pour votre commande, {order.customer.prenom} {order.customer.nom} </Typography>
            <Divider className={classes.divider} />
            <Typography variant='subtitle2'>Commande n° {order.customer_reference}</Typography>
        </div>
        <br />
        <NavLink to="/" style={{textDecoration : "none"}}>
        <Button variant='outlined' type='button'>Retour</Button>
        </NavLink>
        </>
    ) : (
        <div className={classes.spinner}>
        <CircularProgress />
      </div>

    );

    if(error) {
        <>
        <Typography variant='h5'>
            Error : {error}
        </Typography>
        <br />
        <NavLink to="/" style={{textDecoration : "none"}}>
        <Button variant='outlined' type='button'>Retour</Button>
        </NavLink>
        </>
    }

    const Form = () => activeStep === 0 
    ? <AddressForm  checkoutToken={checkoutToken} test={test}  /> 
    : <PayementForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />
    console.log(checkoutToken);


    return (
        <>
        <div className={classes.toolbar} />
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>Payement</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>

                {steps.map((step) => (
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}

                </Stepper>
                {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

            </Paper>
        </main>
            
        </>
    );
};

export default Checkout;