import React from "react";
import HorizontalBarplot from "./HorizontalBarplot";

const data = [
  { country: "United States", students: 68, flag: "US" },
  { country: "France", students: 21, flag: "FR" },
  { country: "United Kingdom", students: 21, flag: "UK" },
  { country: "Germany", students: 20, flag: "DE" },
  { country: "Switzerland", students: 13, flag: "CH" },
  { country: "Spain", students: 10, flag: "ES" },
  { country: "Netherlands", students: 9, flag: "NL" },
  { country: "India", students: 9, flag: "IN" },
  { country: "Singapore", students: 8, flag: "SG" },
  { country: "Ireland", students: 8, flag: "IE" },
  { country: "Sweden", students: 7, flag: "SE" },
  { country: "Australia", students: 7, flag: "AU" },
  { country: "Canada", students: 6, flag: "CA" },
  { country: "Finland", students: 5, flag: "FI" },
  { country: "Mexico", students: 4, flag: "MX" },
  { country: "Brazil", students: 4, flag: "BR" },
  { country: "Saudi Arabia", students: 3, flag: "SA" },
  { country: "Romania", students: 3, flag: "RO" },
  { country: "Philippines", students: 3, flag: "PH" },
  { country: "New Zealand", students: 3, flag: "NZ" },
];

function App() {
  return (
    <div>
      <h2>Horizontal Bar Chart</h2>
      <HorizontalBarplot data={data} />
    </div>
  );
}

export default App;
