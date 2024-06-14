-- CreateEnum
CREATE TYPE "enum_TemporalTokens_type" AS ENUM ('reset_password', 'email_confirm');

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "street_1" VARCHAR(255),
    "street_2" VARCHAR(255),
    "description" TEXT,
    "city" VARCHAR(255),
    "coordinateLatitude" VARCHAR(255),
    "coordinateLongitude" VARCHAR(255),
    "postalCode" VARCHAR(255),
    "municipalityId" INTEGER,
    "provinceId" INTEGER,
    "countryId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "code" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralConfigs" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "isSensitive" BOOLEAN DEFAULT true,
    "isPublic" BOOLEAN DEFAULT false,
    "origin" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "GeneralConfigs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(255),
    "src" VARCHAR(255),
    "thumbnail" VARCHAR(255),
    "blurhash" VARCHAR(255),
    "userId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListUserAddresses" (
    "addressId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ListUserAddresses_pkey" PRIMARY KEY ("addressId","userId")
);

-- CreateTable
CREATE TABLE "Municipalities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "code" VARCHAR(255) NOT NULL,
    "provinceId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provinces" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "code" VARCHAR(255) NOT NULL,
    "countryId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporalTokens" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "type" "enum_TemporalTokens_type",
    "expireAt" TIMESTAMPTZ(6),
    "userId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "TemporalTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrustedDevices" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "macAddress" VARCHAR(255),
    "ipAddress" VARCHAR(255),
    "registeredAt" TIMESTAMPTZ(6),
    "userId" INTEGER,
    "tokenId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "TrustedDevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "pinPassword" VARCHAR(255),
    "isActive" BOOLEAN DEFAULT false,
    "isSuperAdmin" BOOLEAN DEFAULT false,
    "isLogued" BOOLEAN DEFAULT false,
    "isEmailConfirmed" BOOLEAN DEFAULT false,
    "lastLogin" TIMESTAMPTZ(6),
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "phone" VARCHAR(255),
    "sex" VARCHAR(255),
    "birthdate" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deletedAt" TIMESTAMPTZ(6),
    "displayName" VARCHAR,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_code_key" ON "Countries"("code");

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipalities"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListUserAddresses" ADD CONSTRAINT "ListUserAddresses_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListUserAddresses" ADD CONSTRAINT "ListUserAddresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Municipalities" ADD CONSTRAINT "Municipalities_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Provinces"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provinces" ADD CONSTRAINT "Provinces_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemporalTokens" ADD CONSTRAINT "TemporalTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrustedDevices" ADD CONSTRAINT "TrustedDevices_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Tokens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrustedDevices" ADD CONSTRAINT "TrustedDevices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
