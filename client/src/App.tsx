import React, { useEffect } from "react";
import PixiApp from "./pixi";

// Styles
import classes from "./styles.scss";
import e from "express";

export default function App(): JSX.Element {
  useEffect(() => {}, []);
  return (
    <div className={classes["wrapper"]}>
      <div className={classes["inner-wrapper"]}>
        <PixiApp />
      </div>
    </div>
  );
}
