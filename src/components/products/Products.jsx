import React from "react";
import { Grid } from "@material-ui/core"
import Product from "./Product/Product";

const products = [
    {id: 1, name : "Shoes", description: "Running Shoes.", price: "60,00€", image : "https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?b=1&k=20&m=1303978937&s=170667a&w=0&h=az5Y96agxAdHt3XAv7PP9pThdiDpcQ3otWWn9YuJQRc="},
    {id: 1, name : "MacBook", description: "Apple MacBook", price: "1050,00€", image : "https://media.ldlc.com/r1600/ld/products/00/05/82/02/LD0005820224_1.jpg"},
];

const Products = () => {
    return (

        <main>
        <Grid container justify="center" spacing={4}>

            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))}

        </Grid>
    </main>
    );
}

export default Products;