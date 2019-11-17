import sizes from "./sizes";

export default {
  "@global": {
    ".fade-exit": {
      opacity: 1
    },
    ".fade-exit-active": {
      opacity: 0,
      transition: "opacity 500ms ease-out"
    }
  },
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    scrollBehavior: "smooth",
    [sizes.down("sm")]: {
      height: "700px"
    }
  },
  PaletteColor: {
    height: "90%"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    opacity: 1,
    background: "#000",

    "& a": {
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      color: "white",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};
