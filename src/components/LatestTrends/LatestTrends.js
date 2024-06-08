import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ListItemText,
  List,
} from "@mui/material";
import styles from "./LatestTrends.module.css";

const LatestTrends = ({
  latestTrends,
  handleCardClick,
  handleSuggestionClick,
}) => {
  const popularSuggestions = [
    "Slim Fit T-Shirts",
    "Fits 15 Laptops bag",
    "White Gold Plated Princess ring",
    "SanDisk SSD PLUS",
  ];

  return (
    <div className={styles.container}>
      <h2>Latest trends</h2>
      <div className={styles.cardContainer}>
        {latestTrends.map((product) => (
          <Card
            key={product.id}
            className={styles.card}
            onClick={() => handleCardClick(product)}
          >
            <CardMedia
              component="img"
              alt={product.title}
              image={product.image}
              style={{ height: "200px", objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2>Popular suggestions</h2>
      <List>
        {popularSuggestions.map((item) => (
          <ListItemText
            key={item}
            primary={item}
            onClick={() => handleSuggestionClick(item)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </List>
    </div>
  );
};

export default LatestTrends;
