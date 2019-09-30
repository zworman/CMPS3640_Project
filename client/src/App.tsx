import React from "react";

// Styles
import classes from "./styles.scss";

export default function App(): JSX.Element {
  return (
    <div className={classes["wrapper"]}>
      <div className={classes["inner-wrapper"]}>
        <img
          className={classes["background"]}
          src="assets/images/bomberman-screenshot.png"
        />
      </div>
    </div>
  );
}
