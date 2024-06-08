import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import { Grid, Button, Drawer, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Products from "../../components/Products/Products";
import SearchBar from "../../components/SearchBar/SearchBar";
import CheckBoxFilter from "../../components/CheckBoxFilter/CheckboxFilter";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [ratingRangeFilter, setRatingRangeFilter] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchdata = async () => {
    const response = await axios.get(
      "https://mocki.io/v1/bdd5825b-1963-4146-9d65-e8e76e08bd96"
    );
    const data = response.data;
    setProducts(data);
    setFilteredProducts(data);
  };

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
    setShowTryAgain(false);
    filterProducts(
      query,
      categoriesFilter,
      priceRangeFilter,
      ratingRangeFilter
    );
  };

  const handleSearchIconClick = () => {
    filterProducts(
      searchQuery,
      categoriesFilter,
      priceRangeFilter,
      ratingRangeFilter
    );
  };

  const handleCategoriesFilterChange = (event) => {
    const value = event.target.value;
    const updatedCategories = event.target.checked
      ? [...categoriesFilter, value]
      : categoriesFilter.filter((category) => category !== value);

    setCategoriesFilter(updatedCategories);
    filterProducts(
      searchQuery,
      updatedCategories,
      priceRangeFilter,
      ratingRangeFilter
    );
  };

  const handlePriceRangeFilterChange = (event) => {
    const value = event.target.value;
    const updatedPriceRanges = event.target.checked
      ? [...priceRangeFilter, value]
      : priceRangeFilter.filter((priceRange) => priceRange !== value);

    setPriceRangeFilter(updatedPriceRanges);
    filterProducts(
      searchQuery,
      categoriesFilter,
      updatedPriceRanges,
      ratingRangeFilter
    );
  };

  const handleRatingFilterChange = (event) => {
    const value = event.target.value;
    const updatedRatings = event.target.checked
      ? [...ratingRangeFilter, value]
      : ratingRangeFilter.filter((rating) => rating !== value);
    setRatingRangeFilter(updatedRatings);
    const numericRatings = updatedRatings.map((rating) => parseInt(rating));
    filterProducts(
      searchQuery,
      categoriesFilter,
      priceRangeFilter,
      numericRatings
    );
  };

  const filterProductsByTrend = (trend) => {
    const filtered = products.filter((product) => product.trend === trend);
    setFilteredProducts(filtered);
  };

  const filterProducts = (query, categories, priceRanges, ratings) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = products.filter((product) => {
      const titleMatches = product.title.toLowerCase().includes(lowercaseQuery);
      const categoryMatches =
        categories.length === 0 ||
        categories.includes(product.category.toLowerCase());
      const priceRangeMatches =
        priceRanges.length === 0 ||
        priceRanges.some((range) => {
          const [rangeLow, rangeHigh] = range.split("-").map(Number);
          return rangeLow <= product.price && product.price <= rangeHigh;
        });
      const ratingMatches =
        ratings.length === 0 ||
        !!ratings.find((rating) => rating === Math.round(product.rating));

      return (
        titleMatches && categoryMatches && priceRangeMatches && ratingMatches
      );
    });

    if (filtered.length === 0) {
      setShowTryAgain(true);
    } else {
      setShowTryAgain(false);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className={styles.homepage}>
      <Header />
      <SearchBar
        handleSearchInputChange={handleSearchInputChange}
        handleSearchIconClick={handleSearchIconClick}
        filterProductsByTrend={filterProductsByTrend}
      />
      <div className={styles.filterButtonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDrawerToggle}
        >
          <FilterListIcon /> Filter
        </Button>
      </div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <div className={styles.drawerContent}>
          <CheckBoxFilter
            categoriesFilter={categoriesFilter}
            priceRangeFilter={priceRangeFilter}
            ratingRangeFilter={ratingRangeFilter}
            handleCategoriesFilterChange={handleCategoriesFilterChange}
            handlePriceRangeFilterChange={handlePriceRangeFilterChange}
            handleRatingFilterChange={handleRatingFilterChange}
          />
        </div>
      </Drawer>
      <Grid container spacing={2} className={styles.container}>
        <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={2}>
          <div className={styles.filterContainer}>
            <CheckBoxFilter
              categoriesFilter={categoriesFilter}
              priceRangeFilter={priceRangeFilter}
              ratingRangeFilter={ratingRangeFilter}
              handleCategoriesFilterChange={handleCategoriesFilterChange}
              handlePriceRangeFilterChange={handlePriceRangeFilterChange}
              handleRatingFilterChange={handleRatingFilterChange}
            />
          </div>
        </Grid>

        {showTryAgain ? (
          <h6 className={styles.text}>No products found. Please try again.</h6>
        ) : (
          <Grid item xs={12} sm={10}>
            <Products products={filteredProducts} />
          </Grid>
        )}
      </Grid>
    </div>
  );
}
