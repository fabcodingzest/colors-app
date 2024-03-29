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
import arrayMove from "array-move";
import styles from "./styles/NewPaletteFormStyle";
import seedColors from "./seedColors";

function NewPaletteForm(props) {
  const { maxColors = 20 } = props;
  const classes = styles();
  const [open, setOpen] = React.useState(false);
  const [colors, setNewColor] = React.useState(seedColors[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = newColor => {
    setNewColor(oldColors => [...oldColors, newColor]);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setNewColor(arrayMove(colors, oldIndex, newIndex));
  };

  const deleteColor = colorName => {
    setNewColor(colors.filter(color => color.name !== colorName));
  };

  const clearColors = () => {
    setNewColor([]);
  };
  const addRandomColor = () => {
    const allColors =
      props.palettes.length === 0
        ? seedColors.map(p => p.colors).flat()
        : props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[rand];
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      isDuplicateColor = colors.some(color => color.name === randomColor.name);
    }
    setNewColor([...colors, randomColor]);
  };
  const paletteIsFull = colors.length >= maxColors;
  const handleSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    props.history.push("/");
  };

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
          distance={20}
        />
      </main>
    </div>
  );
}

export default NewPaletteForm;
