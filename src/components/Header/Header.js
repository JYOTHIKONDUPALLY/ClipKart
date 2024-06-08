import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <div>
      <div className={styles.banner}>
        Flat 30% on all electronics, winter wears and skin care products
      </div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <ShoppingCartIcon sx={{ fontSize: "35px" }} />
          Clip<span>Kart</span>
        </div>
        <div className={styles.nav}>
          <div className={styles.account}>
            <span>
              <AccountCircleIcon sx={{ fontSize: "35px" }} />
            </span>
            User
          </div>

          <FavoriteIcon sx={{ fontSize: "35px", color: "red" }} />
        </div>
      </div>
    </div>
  );
};

export default Header;
