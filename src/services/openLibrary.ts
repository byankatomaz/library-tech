import fetch from "node-fetch";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function fetchBooks(query: string, maxResults = 10) {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_BOOKS_API_KEY não configurada no .env");
  }

  const url = `${GOOGLE_BOOKS_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao buscar livros: ${response.statusText}`);
  }

  const data: any = await response.json();

  return (
    data.items?.map((item: any) => {
      const info = item.volumeInfo || {};
      return {
        title: info.title || "",
        authors: info.authors || [],
        description: info.description || "",
        publishedAt: info.publishedDate || "",
        categories: info.categories || [],
        language: info.language || "",
        coverImageUrl: info.imageLinks?.thumbnail || "",
      };
    }) || []
  );
}
