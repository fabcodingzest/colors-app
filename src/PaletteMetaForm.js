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
  const [open, setOpen] = React.useState(true);
  const [newPaletteName, setNewName] = React.useState("");

  const handleClose = () => {
    setOpen(false);
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

  return (
    <Dialog
      open={open}
      onClose={props.hideForm}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={() => props.handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new beautiful palette. Make sure its
            unique.
          </DialogContentText>
          <Picker />
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
  );
}
export default PaletteMetaForm;
