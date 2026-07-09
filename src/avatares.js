export const AVATARES = [
  { emoji: "🐼", bg: "bg-green-100" },
  { emoji: "🦊", bg: "bg-orange-100" },
  { emoji: "🐱", bg: "bg-pink-100" },
  { emoji: "🐶", bg: "bg-yellow-100" },
  { emoji: "🦁", bg: "bg-amber-100" },
  { emoji: "🐯", bg: "bg-orange-100" },
  { emoji: "🐨", bg: "bg-gray-100" },
  { emoji: "🐰", bg: "bg-purple-100" },
  { emoji: "🐸", bg: "bg-green-100" },
  { emoji: "🐵", bg: "bg-amber-100" },
  { emoji: "🦄", bg: "bg-pink-100" },
  { emoji: "🐺", bg: "bg-blue-100" },
  { emoji: "🐧", bg: "bg-sky-100" },
  { emoji: "🦉", bg: "bg-yellow-100" },
  { emoji: "🐢", bg: "bg-teal-100" },
  { emoji: "🐝", bg: "bg-yellow-100" },
];

// Dado un photoURL guardado (ej. "emoji:🐼"), devuelve el emoji o null
export const getEmojiPorFoto = (foto) => {
  if (!foto?.startsWith("emoji:")) return null;
  return foto.replace("emoji:", "");
};