-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlumnoCurso" (
    "id" SERIAL NOT NULL,
    "idCurso" INTEGER NOT NULL,
    "idAlumno" INTEGER NOT NULL,

    CONSTRAINT "AlumnoCurso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alumno" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "certificado" BOOLEAN,
    "ci" TEXT NOT NULL,
    "fechaNaci" TIMESTAMP(3) NOT NULL,
    "IdPadre" INTEGER NOT NULL,

    CONSTRAINT "Alumno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padre" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "ci" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Padre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnoCurso" ADD CONSTRAINT "AlumnoCurso_idCurso_fkey" FOREIGN KEY ("idCurso") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumnoCurso" ADD CONSTRAINT "AlumnoCurso_idAlumno_fkey" FOREIGN KEY ("idAlumno") REFERENCES "Alumno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumno" ADD CONSTRAINT "Alumno_IdPadre_fkey" FOREIGN KEY ("IdPadre") REFERENCES "Padre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
