import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./ProductCart.module.css";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishList, setWishList] = useState([]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setWishList((prev) => {
      if (!isFavorite) {
        return [...prev, product];
      } else {
        return prev.filter((item) => item.id !== product.id);
      }
    });
  };

  return (
    <Card key={product.id} className={styles.card}>
      <div className={styles.favoriteIconContainer}>
        {isFavorite ? (
          <FavoriteIcon
            onClick={handleFavoriteClick}
            style={{ color: "red" }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={handleFavoriteClick}
            style={{ color: "blue" }}
          />
        )}
      </div>

      <CardMedia
        component="img"
        alt={product.title}
        image={product.image}
        style={{ maxHeight: "200px", objectFit: "contain" }}
      />

      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body1" paddingY="0.5rem" fontWeight="700">
          Rs {product.price.toFixed(2)}
        </Typography>
        <Rating
          name="read-only"
          value={product.rating}
          precision={0.5}
          readOnly
        />
      </CardContent>

      <CardActions className={styles.cardActions}>
        <button className={styles.cardActionButton}>Vier Product</button>
      </CardActions>
    </Card>
  );
}
