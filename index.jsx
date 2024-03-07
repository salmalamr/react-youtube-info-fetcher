import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Formulaire from "./Formulaire";
import Affichage from "./Affichage";
import Integration from "./Integration";
const root = document.getElementById("root");
const rootElement = ReactDOM.createRoot(root);

rootElement.render(
  <BrowserRouter>
    {/* <Formulaire />
    <Affichage />  */}
    <Integration />
  </BrowserRouter>
);
