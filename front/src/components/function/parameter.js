// import React, { useState } from "react";

// function ParameterInputs({ parameterName, onParameterChange }) {
//   const [parameterData, setParameterData] = useState({
//     period: "",
//     ma: false,
//     ema: false,
//     stochastic: { n: "", m: "", t: "" }
//   });

//   const handleParameterChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
//     const newData = { ...parameterData, [name]: value };
//     setParameterData(newData);
//     onParameterChange(parameterName, newData);
//   };

//   return (
//     <div>
//       <label>Period:</label>
//         <input type="number" name="period" value={parameterData.period} onChange={handleParameterChange} />
//       <label>MA:</label>
//         <input type="checkbox" name="ma" checked={parameterData.ma} onChange={handleParameterChange} />
//       <label>EMA:</label>
//         <input type="checkbox" name="ema" checked={parameterData.ema} onChange={handleParameterChange} />
//       <label>Stochastic N:</label>
//         <input type="number" name="n" value={parameterData.stochastic.n} onChange={(e) => handleParameterChange({ ...e, target: { ...e.target, name: "stochastic", value: { ...parameterData.stochastic, n: e.target.value } } })} />
//       <label>Stochastic M:</label>
//         <input type="number" name="m" value={parameterData.stochastic.m} onChange={(e) => handleParameterChange({ ...e, target: { ...e.target, name: "stochastic", value: { ...parameterData.stochastic, m: e.target.value } } })} />
//       <label>Stochastic T:</label>
//         <input type="number" name="t" value={parameterData.stochastic.t} onChange={(e) => handleParameterChange({ ...e, target: { ...e.target, name: "stochastic", value: { ...parameterData.stochastic, t: e.target.value } } })} />
//     </div>
//   );
// }

// export default ParameterInputs;