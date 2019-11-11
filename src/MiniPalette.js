import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal",
    "& h1": {
      color: "white",
      "& span": {
        color: "white",
        backgroundColor: "pink"
      }
    }
  }
};

function MiniPalette(props) {
  const { classes } = props;
  console.log(classes);

  return (
    <div className={classes.main}>
      <h1>
        Mini Palette<span>fgalaiyg</span>
      </h1>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
