import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import seedColors from "./seedColors";
import NewPaletteForms from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palette"));
    this.state = { palette: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palette.find(function(palette) {
      return palette.id === id;
    });
  }
  deletePalette(id) {
    this.setState(
      st => ({ palette: st.palette.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    );
  }
  savePalette(newPalette) {
    this.setState(
      { palette: [...this.state.palette, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem("palette", JSON.stringify(this.state.palette));
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForms
                        savePalette={this.savePalette}
                        palettes={this.state.palette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />

                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PaletteList
                        palettes={this.state.palette}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
