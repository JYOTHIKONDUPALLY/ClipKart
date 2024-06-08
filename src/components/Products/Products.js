import React from "react";
import ProductsCard from "../ProductCard/ProductCard";
import { Grid } from "@mui/material";

export default function Products({ products }) {
  return (
    <Grid container marginY="1rem" paddingX="1rem" spacing={2}>
      {products.map((product) => (
        <Grid item xs={8} md={3} key={product.id}>
          <ProductsCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
