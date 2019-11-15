import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function PaletteMetaForm(props) {
  const [stage, setStage] = React.useState("form");
  const [newPaletteName, setNewName] = React.useState("");

  const handleClose = () => {
    setStage(false);
  };

  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
      const palette = props.palettes;
      return palette.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleChange = evt => {
    setNewName(evt.target.value);
  };
  const showEmojiPicker = () => {
    setStage("emoji");
  };
  const savePalette = emoji => {
    const newPalette = { paletteName: newPaletteName, emoji: emoji.native };
    props.handleSubmit(newPalette);
  };
  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={props.hideForm}>
        <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={props.hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure its
              unique.
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              fullWidth
              margin="normal"
              name="newPaletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
export default PaletteMetaForm;
