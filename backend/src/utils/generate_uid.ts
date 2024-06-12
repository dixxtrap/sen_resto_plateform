export function generateUniqueId(): number {
  // Générer un nombre aléatoire à 9 chiffres
  return Math.floor(100000000 + Math.random() * 900000000);
}
