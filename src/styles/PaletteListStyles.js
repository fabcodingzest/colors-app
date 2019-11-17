import sizes from "./sizes";
import background from "./background.svg";

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
  root: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#1a18aa",
    backgroundImage: `url(${background})`,
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll"
  },
  heading: {
    fontSize: "1.8rem"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    [sizes.down("xl")]: {
      width: "7 0%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "75%"
    }
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white"
    }
  },
  palettes: {
    boxSizing: "border-box",

    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [sizes.down("md")]: {
      gridTemplateColumns: "repeat(2, 50%)"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 100%)",
      gridGap: "1.4rem",
      marginBottom: "70px"
    }
  }
};
