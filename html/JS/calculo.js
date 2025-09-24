const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

const numeroDNI = parseInt(prompt("Introduce el número de tu DNI (8 dígitos):"));

const letraDNI = prompt("Introduce la letra de tu DNI:").toUpperCase();

if (numeroDNI < 0 || numeroDNI > 99999999 || isNaN(numeroDNI)) {
  alert("El número de DNI proporcionado no es válido.");
} else {
  const resto = numeroDNI % 23;
  
  const letraCalculada = letras[resto];
  
  if (letraCalculada === letraDNI) {
    alert("¡El número y la letra del DNI son correctos!");
  } else {
    alert(`La letra que has introducido no es correcta. La letra correcta para el número ${numeroDNI} es: ${letraCalculada}.`);
  }
}