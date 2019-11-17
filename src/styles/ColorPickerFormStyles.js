import sizes from "./sizes";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
    [sizes.down("sm")]: {
      padding: "0.4rem",
      marginTop: "0.4rem"
    }
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
};

export default styles;
