export function validateNIF(nif: string): boolean {
  // Basic NIF/NIE validation regex and logic
  // This is a simplified version. For production, use a robust library or full algorithm.
  const nifRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  if (!nifRegex.test(nif)) return false;

  const niePrefix = nif.charAt(0);
  let numberPart = nif.slice(0, -1);

  if (niePrefix === 'X') numberPart = '0' + numberPart.slice(1);
  else if (niePrefix === 'Y') numberPart = '1' + numberPart.slice(1);
  else if (niePrefix === 'Z') numberPart = '2' + numberPart.slice(1);

  const letter = nif.slice(-1);
  const number = parseInt(numberPart, 10);
  const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  
  return letters[number % 23] === letter;
}

export function validateCIF(cif: string): boolean {
  // Basic CIF validation
  const cifRegex = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[0-9A-J]$/;
  if (!cifRegex.test(cif)) return false;
  // Full algorithm omitted for brevity, but regex catches format
  return true;
}
