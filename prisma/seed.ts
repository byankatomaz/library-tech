import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

async function main() {
  const query = "programming"; // Tema de busca
  const maxResults = 5;

  const response = await fetch(
    `www.google.com`
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  // const data: any = await response.json();

  // for (const item of data.items) {
  //   const volume = item.volumeInfo;

  //   // Autor
  //   const authorName = volume.authors?.[0] || "Autor Desconhecido";
  //   let author = await prisma.author.findFirst({
  //     where: { name: authorName },
  //   });
  //   if (!author) {
  //     author = await prisma.author.create({ data: { name: authorName } });
  //   }

  //   // Categoria
  //   const categoryName = volume.categories?.[0] || "Categoria Desconhecida";
  //   let category = await prisma.category.findFirst({
  //     where: { name: categoryName },
  //   });
  //   if (!category) {
  //     category = await prisma.category.create({ data: { name: categoryName } });
  //   }

  //   // Criar livro
  //   await prisma.book.create({
  //     data: {
  //       title: volume.title || "Título Desconhecido",
  //       description: volume.description || null,
  //       price: (Math.random() * 100).toFixed(2) as unknown as any, // valor fictício
  //       publishedAt: volume.publishedDate
  //         ? new Date(volume.publishedDate)
  //         : new Date(),
  //       authorId: author.id,
  //       categoryId: category.id,
  //       coverImageUrl: volume.imageLinks?.thumbnail || null,
  //     },
  //   });
  // }

  console.log("✅ Seed concluído com livros da Google Books API!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
