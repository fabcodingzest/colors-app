import React, { useState } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { Button } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function NewPaletteForm(props) {
  const { maxColors = 20 } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setColor] = React.useState("teal");
  const [colors, setNewColor] = React.useState(props.palettes[0].colors);
  const [newColorName, setNewName] = React.useState("");
  const [newPaletteName, setPaletteName] = React.useState("");

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return colors.every(({ color }) => color !== currentColor);
    });
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      const palette = props.palettes;
      return palette.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = newColor => {
    setColor(newColor.hex);
  };
  const addNewColor = () => {
    const newColor = { color: currentColor, name: newColorName };
    setNewColor(oldColors => [...oldColors, newColor]);
    setNewName("");
  };
  const handleChange = evt => {
    setNewName(evt.target.value);
  };
  const handlePaletteChange = evt => {
    setPaletteName(evt.target.value);
  };

  const handleSubmit = () => {
    let newName = newPaletteName;

    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    };
    props.savePalette(newPalette);
    props.history.push("/");
  };

  const deleteColor = colorName => {
    setNewColor(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setNewColor(arrayMove(colors, oldIndex, newIndex));
  };
  const clearColors = () => {
    setNewColor([]);
  };
  const addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setNewColor([...colors, randomColor]);
    console.log(allColors);
  };
  const paletteIsFull = colors.length >= maxColors;

  return (
    <div className={classes.root}>
      <CssBaseline />
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
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handlePaletteChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addRandomColor}
            disabled={paletteIsFull}
          >
            Random color
          </Button>
        </div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This can't be empty",
              "Color name must be unique",
              "Color already used"
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            style={{ backgroundColor: paletteIsFull ? "gray" : currentColor }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          deleteColor={deleteColor}
          axis="xy"
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

// NewPaletteForm.defaultProps = {
//   maxColors: 20
// };

export default NewPaletteForm;
