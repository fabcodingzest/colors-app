import React from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { Button } from "@material-ui/core";
import { arrayMove } from "array-move";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/NewPaletteFormStyle";

function NewPaletteForm(props) {
  const { maxColors = 20 } = props;
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const [colors, setNewColor] = React.useState(props.palettes[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = newColor => {
    setNewColor(oldColors => [...oldColors, newColor]);
  };

  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
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
      <PaletteFormNav
        open={open}
        palettes={props.palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
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
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
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

export default withStyles(styles)(NewPaletteForm);
