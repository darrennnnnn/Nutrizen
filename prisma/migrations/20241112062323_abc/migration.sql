-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ownedAccessories" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ownedColors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "ownedPets" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "color" SET DEFAULT 'green';
