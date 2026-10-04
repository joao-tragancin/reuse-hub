const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const items = [
  {
    title: "Bicicleta infantil",
    description: "Bicicleta aro 16 em bom estado. Precisa apenas calibrar os pneus.",
    category: "Esportes",
    condition: "Bom",
    city: "Joaçaba - SC",
    contact: "joao@email.com",
    imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Livros de literatura",
    description: "Coleção com seis livros usados e conservados, ideal para estudantes.",
    category: "Livros",
    condition: "Muito bom",
    city: "Herval d'Oeste - SC",
    contact: "(49) 99999-1234",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cadeira de escritório",
    description: "Cadeira simples com regulagem de altura. Possui marcas de uso.",
    category: "Móveis",
    condition: "Usado",
    city: "Luzerna - SC",
    contact: "maria@email.com",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80",
  },
];

async function main() {
  const count = await prisma.item.count();

  if (count === 0) {
    await prisma.item.createMany({ data: items });
    console.log("Itens de exemplo cadastrados.");
  } else {
    console.log("O banco já possui dados. Seed ignorado.");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
