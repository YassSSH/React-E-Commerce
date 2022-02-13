import React from "react";
import Grid from "@material-ui/core"
import Product from "./Product/Product";

const products = [
    {id: 1, name : "Shoes", description: "Running Shoes.", price: "60,00€"},
    {id: 1, name : "MacBook", description: "Apple MacBook", price: "1050,00€"},
]

const Products = () => {
    <main>
        <Grid container justify="center" spacing={4}>

            {Products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))}

        </Grid>
    </main>
}

export default Products;