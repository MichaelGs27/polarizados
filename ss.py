-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema polarized
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema polarized
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `polarized` DEFAULT CHARACTER SET utf8mb4 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`documenttypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`documenttypes` (
  `idDocumentType` VARCHAR(20) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDocumentType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

USE `polarized` ;

-- -----------------------------------------------------
-- Table `polarized`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`services` (
  `idService` INT(11) NOT NULL AUTO_INCREMENT,
  `nameService` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idService`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `polarized`.`serviceTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`serviceTypes` (
  `idServiceType` INT(11) NOT NULL AUTO_INCREMENT,
  `idService` INT(11) NOT NULL,
  `serviceTypeName` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idServiceType`),
  CONSTRAINT `serviceType_ibfk_1`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idService` ON `polarized`.`serviceTypes` (`idService` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`documentTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`documentTypes` (
  `idDocumentType` VARCHAR(20) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idDocumentType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `polarized`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`users` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(100) NOT NULL,
  `lastName` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `address` VARCHAR(200) NULL DEFAULT NULL,
  `idDocumentType` VARCHAR(20) NULL DEFAULT NULL,
  `documentNumber` VARCHAR(20) NULL DEFAULT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`idDocumentType`)
    REFERENCES `polarized`.`documentTypes` (`idDocumentType`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idDocumentType` ON `polarized`.`users` (`idDocumentType` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`vehicleTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`vehicleTypes` (
  `idVehicleType` INT(11) NOT NULL AUTO_INCREMENT,
  `vehicleType` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idVehicleType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `polarized`.`vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`vehicles` (
  `idVehicle` INT(11) NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(100) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `year` INT(11) NULL DEFAULT NULL,
  `color` VARCHAR(50) NULL DEFAULT NULL,
  `idVehicleType` INT(11) NULL DEFAULT NULL,
  `idUser` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idVehicle`),
  CONSTRAINT `vehicles_ibfk_1`
    FOREIGN KEY (`idVehicleType`)
    REFERENCES `polarized`.`vehicleTypes` (`idVehicleType`),
  CONSTRAINT `vehicles_ibfk_2`
    FOREIGN KEY (`idUser`)
    REFERENCES `polarized`.`users` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idVehicleType` ON `polarized`.`vehicles` (`idVehicleType` ASC) ;

CREATE INDEX `idUser` ON `polarized`.`vehicles` (`idUser` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`appointments` (
  `idAppointments` INT(11) NOT NULL AUTO_INCREMENT,
  `idServiceType` INT(11) NULL DEFAULT NULL,
  `nDate` DATE NULL DEFAULT NULL,
  `status` VARCHAR(50) NULL DEFAULT NULL,
  `descriptioType` VARCHAR(100) NULL DEFAULT NULL,
  `idUser` INT(11) NULL DEFAULT NULL,
  `idService` INT(11) NULL DEFAULT NULL,
  `notes` VARCHAR(255) NULL DEFAULT NULL,
  `idVehicleType` INT(11) NULL DEFAULT NULL,
  `idVehicle` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idAppointments`),
  CONSTRAINT `appointments_ibfk_1`
    FOREIGN KEY (`idServiceType`)
    REFERENCES `polarized`.`serviceTypes` (`idServiceType`),
  CONSTRAINT `appointments_ibfk_2`
    FOREIGN KEY (`idUser`)
    REFERENCES `polarized`.`users` (`idUser`),
  CONSTRAINT `appointments_ibfk_3`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`),
  CONSTRAINT `appointments_ibfk_4`
    FOREIGN KEY (`idVehicleType`)
    REFERENCES `polarized`.`vehicleTypes` (`idVehicleType`),
  CONSTRAINT `appointments_ibfk_5`
    FOREIGN KEY (`idVehicle`)
    REFERENCES `polarized`.`vehicles` (`idVehicle`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idServiceType` ON `polarized`.`appointments` (`idServiceType` ASC) ;

CREATE INDEX `idUser` ON `polarized`.`appointments` (`idUser` ASC) ;

CREATE INDEX `idService` ON `polarized`.`appointments` (`idService` ASC) ;

CREATE INDEX `idVehicleType` ON `polarized`.`appointments` (`idVehicleType` ASC) ;

CREATE INDEX `idVehicle` ON `polarized`.`appointments` (`idVehicle` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`faq`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`faq` (
  `idFAQ` INT(11) NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(255) NOT NULL,
  `answer` VARCHAR(255) NOT NULL,
  `idService` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idFAQ`),
  CONSTRAINT `faq_ibfk_1`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idService` ON `polarized`.`faq` (`idService` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`portafolio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`portafolio` (
  `idPortafolio` INT(11) NOT NULL AUTO_INCREMENT,
  `idService` INT(11) NULL DEFAULT NULL,
  `idServiceType` INT(11) NULL DEFAULT NULL,
  `promotionName` VARCHAR(225) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `idUser` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idPortafolio`),
  CONSTRAINT `portafolio_ibfk_1`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`),
  CONSTRAINT `portafolio_ibfk_2`
    FOREIGN KEY (`idServiceType`)
    REFERENCES `polarized`.`serviceTypes` (`idServiceType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idService` ON `polarized`.`portafolio` (`idService` ASC) ;

CREATE INDEX `idServiceType` ON `polarized`.`portafolio` (`idServiceType` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`promotions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`promotions` (
  `idPromotion` INT(11) NOT NULL AUTO_INCREMENT,
  `idServiceType` INT(11) NULL DEFAULT NULL,
  `promotionName` VARCHAR(100) NOT NULL,
  `promotionPrice` DECIMAL(10,2) NOT NULL,
  `startDate` DATE NULL DEFAULT NULL,
  `endDate` DATE NULL DEFAULT NULL,
  `status` VARCHAR(50) NULL DEFAULT NULL,
  `discount` DECIMAL(5,2) NULL DEFAULT NULL,
  `idService` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idPromotion`),
  CONSTRAINT `promotions_ibfk_1`
    FOREIGN KEY (`idServiceType`)
    REFERENCES `polarized`.`serviceTypes` (`idServiceType`),
  CONSTRAINT `promotions_ibfk_2`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idServiceType` ON `polarized`.`promotions` (`idServiceType` ASC) ;

CREATE INDEX `idService` ON `polarized`.`promotions` (`idService` ASC) ;


-- -----------------------------------------------------
-- Table `polarized`.`testimonies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `polarized`.`testimonies` (
  `idTestimony` INT(11) NOT NULL AUTO_INCREMENT,
  `idUser` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(500) NOT NULL,
  `date` DATE NULL DEFAULT NULL,
  `idService` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idTestimony`),
  CONSTRAINT `testimonios_ibfk_1`
    FOREIGN KEY (`idUser`)
    REFERENCES `polarized`.`users` (`idUser`),
  CONSTRAINT `testimonios_ibfk_2`
    FOREIGN KEY (`idService`)
    REFERENCES `polarized`.`services` (`idService`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

CREATE INDEX `idUser` ON `polarized`.`testimonies` (`idUser` ASC) ;

CREATE INDEX `idService` ON `polarized`.`testimonies` (`idService` ASC) ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
