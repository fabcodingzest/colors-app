import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import PaletteMetaFrom from "./PaletteMetaForm";
import { Link } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import AddToPhotos from "@material-ui/icons/AddToPhotos";

import { Button } from "@material-ui/core";
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);

    this.state = { newPaletteName: "", formShowing: false };
    this.handleChange = this.handleChange.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  showForm() {
    this.setState({ formShowing: true });
  }
  hideForm() {
    this.setState({ formShowing: false });
  }
  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, { [classes.hide]: open })}
            >
              <AddToPhotos />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBts}>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.Button}
              >
                GO BACK
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showForm}
              className={classes.Button}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteMetaFrom
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
