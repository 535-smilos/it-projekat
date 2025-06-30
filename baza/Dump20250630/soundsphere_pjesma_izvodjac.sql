-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: soundsphere
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pjesma_izvodjac`
--

DROP TABLE IF EXISTS `pjesma_izvodjac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pjesma_izvodjac` (
  `id_pjesma` int NOT NULL,
  `ime_izvodjac` varchar(255) NOT NULL,
  PRIMARY KEY (`id_pjesma`,`ime_izvodjac`),
  KEY `ime_izvodjac` (`ime_izvodjac`),
  CONSTRAINT `pjesma_izvodjac_ibfk_1` FOREIGN KEY (`id_pjesma`) REFERENCES `pjesma` (`ID`),
  CONSTRAINT `pjesma_izvodjac_ibfk_2` FOREIGN KEY (`ime_izvodjac`) REFERENCES `izvodjac` (`ime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjesma_izvodjac`
--

LOCK TABLES `pjesma_izvodjac` WRITE;
/*!40000 ALTER TABLE `pjesma_izvodjac` DISABLE KEYS */;
INSERT INTO `pjesma_izvodjac` VALUES (4,'Daft Punk'),(3,'Eminem'),(7,'Imagine Dragons'),(2,'Michael Jackson'),(5,'Miles Davis'),(1,'The Beatles');
/*!40000 ALTER TABLE `pjesma_izvodjac` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-30 18:06:45
