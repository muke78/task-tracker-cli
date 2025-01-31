//Controlador de fechas para los campos de Creacion y campos de actualizacion tener la logica por aparte
const controlDate = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  
  const complete =
    new Date().toISOString().split('T')[0] + ` ${hours}:${minutes} ${ampm}`;
  return complete;
};

module.exports = { controlDate };
