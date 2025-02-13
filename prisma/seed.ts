import { PrismaClient } from "@prisma/client";
import { registerBooks } from "@/services/openLibrary";
import { getRandomNumberInRange } from "@/services/randomNumber";

const prisma = new PrismaClient();

async function populateBooks(query: string) {
  try {
    const books = await registerBooks(query);

    for (const book of books.slice(0, 20)) {

      let category = await prisma.category.findFirst({
        where: { name: query },
      });
  
      if (!category) {
        category = await prisma.category.create({
          data: { name: query },
        });
      }

      let author = await prisma.author.findFirst({
        where: { name: book.author },
      });
  
      if (!author) {
        author = await prisma.author.create({
          data: { name: book.author },
        });
      }

      const bookCreate = await prisma.book.create({
        data: {
          title: book.title,
          description: `Livro sobre ${query}`,
          price: getRandomNumberInRange(10, 100).toFixed(2),
          publishedAt: book.publishedYear 
            ? new Date(`${book.publishedYear}-01-01`) 
            : new Date(),
          coverImageUrl: book.coverImageUrl,
          authorId: author.id,
          categoryId: category.id,
        },
      });

      let stock = await prisma.stock.findFirst({
        where: { bookId: bookCreate.id },
      });
  
      if (!stock) {
        stock = await prisma.stock.create({
          data: { 
            bookId: bookCreate.id,
            quantity: getRandomNumberInRange(0, 500)
           },
        });

        await prisma.stockMovement.create({
          data: { 
            stockId: stock.id,
            type: "INCOMING",
            quantity: stock.quantity
           },
        });
      }

      console.log(`✅ Livro inserido: ${book.title}`);
    }

    console.log("📚 Importação finalizada!");
  } catch (error) {
    console.error("❌ Erro ao popular livros:", error);
  } finally {
    await prisma.$disconnect();
  }
}

const query = process.argv[2] || "programming";
populateBooks(query);
