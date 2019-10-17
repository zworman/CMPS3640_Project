import React, { useEffect } from "react";
import PixiApp from "./pixi";

// Styles
import classes from "./styles.scss";

export default function App(): JSX.Element {
  useEffect(() => {}, []);
  return (
    <div className={classes["wrapper"]}>
      <div className={classes["inner-wrapper"]}>
        <PixiApp />
        {/* <img
          className={classes["background"]}
          src="assets/images/bomberman-screenshot.png"
        /> */}
      </div>
    </div>
  );
}
