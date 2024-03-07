import { useState } from "react";
import axios from "axios";
import "./gestion.css";
function Formulaire() {
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [file, setfile] = useState("");

  const handleInsertion = (e) => {
    e.preventDefault();

    const formDataString =
      "nom=" + nom + "&prenom=" + prenom + "&image=" + file;
    console.log(formDataString);
    axios.post("http://localhost:3000/api/stagiaires", formDataString, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  return (
    <form onSubmit={handleInsertion}>
      <label htmlFor="name">entrer votre nom : </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setnom(e.target.value)}
      />
      <br />
      <label htmlFor="prenom"> entrer votre prenom : </label>
      <input
        type="text"
        name="prenom"
        id="prenom"
        onChange={(e) => setprenom(e.target.value)}
      />
      <br />
      <label htmlFor="file"> entrer votre Image : </label>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => setfile(e.target.files[0].name)}
      />
      <button type="submit">Envoyer</button>

      <br />
    </form>
  );
}
export default Formulaire;
