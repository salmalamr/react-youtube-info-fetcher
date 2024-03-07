import { useEffect, useState } from "react";

function Affichage() {
  const [stagiaires, setStagiaires] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/stagiaires")
      .then((res) => res.json())
      .then((data) => setStagiaires(data));
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <>
      <h1>la liste des stagiaires : </h1>
      <hr />
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Nom</th>
            <th style={thTdStyle}>Prenom</th>
            <th style={thTdStyle}>Image</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.length > 0
            ? stagiaires.map((l, index) => (
                <tr key={index}>
                  <td style={thTdStyle}>{l.nom}</td>
                  <td style={thTdStyle}>{l.prenom}</td>
                  <td style={thTdStyle}>
                    <img
                      src={`illustration/${l.image}`}
                      width="20%"
                      height="10%"
                      alt={l.image}
                    />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
export default Affichage;
