import { Rating } from "@mui/material";
import styles from "./CheckBoxFilter.module.css";

const priceRangeOptions = ["0-250", "250-500", "500-1000"];
const categoriesOptions = ["men's clothing", "electronics", "jewelery"];
const ratingOptions = [5, 4, 3, 2, 1];

export default function CheckBoxFilter({
  handleCategoriesFilterChange,
  handleRatingFilterChange,
  handlePriceRangeFilterChange,
  categoriesFilter,
  priceRangeFilter,
  ratingRangeFilter,
}) {
  return (
    <div className={styles.checkBoxFilterContainer}>
      <div>
        <h2 className={styles.title}>Categories</h2>
        {categoriesOptions.map((item, index) => (
          <div key={index} className={styles.filterSection}>
            <label>
              <input
                type="checkbox"
                value={item}
                onChange={handleCategoriesFilterChange}
                style={{ marginRight: "8px" }}
                checked={categoriesFilter.includes(item)}
              />
              {item}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h2 className={styles.title}>PriceRange</h2>
        {priceRangeOptions.map((price, index) => (
          <div key={index} className={styles.filterSection}>
            <label>
              <input
                type="checkbox"
                value={price}
                onChange={handlePriceRangeFilterChange}
                style={{ marginRight: "8px" }}
                checked={priceRangeFilter.includes(price)}
              />
              {price}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h2 className={styles.title}>Rating</h2>
        {ratingOptions.map((item, index) => (
          <div key={index} className={styles.filterSection}>
            <label>
              <input
                type="checkbox"
                value={String(item)}
                onChange={handleRatingFilterChange}
                style={{ marginRight: "3px" }}
                checked={ratingRangeFilter.includes(String(item))}
              />
              <Rating name="read-only" value={item} readOnly />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
