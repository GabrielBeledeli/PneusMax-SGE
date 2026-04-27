-- CreateTable
CREATE TABLE "Pneu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "largura" TEXT NOT NULL,
    "perfil" TEXT NOT NULL,
    "aro" INTEGER NOT NULL,
    "indicePeso" TEXT NOT NULL,
    "indiceVelocidade" TEXT NOT NULL,
    "tipoConstrucao" TEXT NOT NULL,
    "tipoTerreno" TEXT NOT NULL,
    "desenho" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
