// import React, { useState } from 'react';

// const Acciones = ({ onStateChange, onNameClientChange, onSubmit }) => {
//   const [state, setState] = useState('');
//   const [nameClient, setNameClient] = useState('');

//   const handleStateChange = (e) => {
//     const value = e.target.value;
//     setState(value);
//     onStateChange(value);
//   };

//   const handleNameClientChange = (e) => {
//     const value = e.target.value;
//     setNameClient(value);
//     onNameClientChange(value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(state, nameClient);
//   };

//   return (
//     <div>
//       <center>
//         <h2>Describa el estado del usuario</h2>
//       </center>
//       <div className='flex gap-1'>
//         <input
//           type="text"
//           placeholder="Estado"
//           className="input input-bordered w-full max-w-xs"
//           value={state}
//           onChange={handleStateChange}
//         />
//         <input
//           type="text"
//           placeholder="Su nombre"
//           className="input input-bordered w-full max-w-xs"
//           value={nameClient}
//           onChange={handleNameClientChange}
//         />
//       </div>
//       <center className='pt-2'>
//         <button
//           type="submit"
//           className="btn btn-outline btn-wide btn-accent h-5"
//           onClick={handleSubmit}
//         >
//           Enviar
//         </button>
//       </center>
//       <br />
//     </div>
//   );
// };

// export default Acciones;
