import React, {useState, useEffect} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput'
import { NavLink } from 'react-router-dom';
import { commerce } from '../../lib/commerce';


const AddressForm = ( { checkoutToken, next }) => {

    const [ShippingCountries, setShippingCountries] = useState([])  
    const [ShippingCountry, setShippingCountry] = useState('')
    const [ShippingSubdivisions, setShippingSubdivisions] = useState([])  
    const [ShippingSubdivision, setShippingSubdivision] = useState('')
    const [ShippingOptions, setShippingOptions] = useState([])
    const [ShippingOption, setShippingOption] = useState('')

    const  countries = Object.entries(ShippingCountries).map(([code, name]) => ({id: code, label: name}))
    const  subdivisions = Object.entries(ShippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
    const options = ShippingOptions.map((sO) => ({id : sO.id, label : `${sO.description} - (${sO.price.formatted_with_symbol})`}))





    const methods = useForm()

    const fetchShippingCountries = async (checkoutTokenId) => {

        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        

        console.log(countries);
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    } 

    const fetchsubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)

        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {

        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        console.log(checkoutToken.id)
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
       if(ShippingCountry) fetchsubdivisions(ShippingCountry)
    }, [ShippingCountry])

    useEffect(() => {
       if(ShippingSubdivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubdivision)
    }, [ShippingSubdivision])


    return (
        <>
        <Typography variant='h6' gutterBottom >
           Informations de livraison
        </Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => next({...data, ShippingCountry, ShippingSubdivision, ShippingOption}))}>

                <Grid container spacing={3}>
                    <FormInput name="Prenom" label="Prenom" required />
                    <FormInput name="Nom" label="Nom" required />
                    <FormInput name="Mail" label="Mail" required />
                    <FormInput name="Phone" label="Numero de Téléphone" required />
                    <FormInput name="Adresse1" label="Adresse 1" required />
                    <FormInput name="Ville" label="Ville" required />
                    <FormInput name="Code Postal" label="Code Postal" required />

                    <Grid item xs={12} sm={6}>
                        <InputLabel>
                        Pays
                        </InputLabel>
                        <Select value={ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id} >
                                    {country.label}
                                </MenuItem>

                            ))}

                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>
                        Region
                        </InputLabel>
                        <Select value={ShippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                <MenuItem key={subdivision.id} value={subdivision.id} >
                                    {subdivision.label}
                                </MenuItem>

                                ))}

                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>
                        Shipping Options
                        </InputLabel>
                        <Select value={ShippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id} >
                                    {option.label}
                                </MenuItem>

                            ))}

                        </Select>
                    </Grid>
                </Grid>
                <br />
                <br />
                <div style={{display : "flex", justifyContent: "space-between", textDecoration: 'none'}}>
                    <NavLink style={{textDecoration: 'none'}} to="/cart">
                    <Button variant='outlined'>Back to cart</Button>
                    </NavLink>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                </div>

            </form>
        </FormProvider>
        </>
    );
};

export default AddressForm;

