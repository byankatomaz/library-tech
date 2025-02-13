const BASE_URL = "https://openlibrary.org";

export const registerBooks = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search.json?q=${query}`);
  if (!res.ok) throw new Error("Erro ao buscar livros");

  const data = await res.json();
  return data.docs.map((book: any) => ({
    title: book.title,
    author: book.author_name?.join(", ") || "Desconhecido",
    publishedYear: book.first_publish_year || null,
    coverImageUrl: book.cover_i 
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
      : null,
  }));
};