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
-- Table structure for table `pjesma_korisnik`
--

DROP TABLE IF EXISTS `pjesma_korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pjesma_korisnik` (
  `id_pjesma` int NOT NULL,
  `korisnik_username` varchar(255) NOT NULL,
  `ocjena` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`id_pjesma`,`korisnik_username`),
  KEY `korisnik_username` (`korisnik_username`),
  CONSTRAINT `pjesma_korisnik_ibfk_1` FOREIGN KEY (`id_pjesma`) REFERENCES `pjesma` (`ID`),
  CONSTRAINT `pjesma_korisnik_ibfk_2` FOREIGN KEY (`korisnik_username`) REFERENCES `korisnik` (`username`),
  CONSTRAINT `pjesma_korisnik_ibfk_3` FOREIGN KEY (`id_pjesma`) REFERENCES `pjesma` (`ID`),
  CONSTRAINT `pjesma_korisnik_ibfk_4` FOREIGN KEY (`korisnik_username`) REFERENCES `korisnik` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjesma_korisnik`
--

LOCK TABLES `pjesma_korisnik` WRITE;
/*!40000 ALTER TABLE `pjesma_korisnik` DISABLE KEYS */;
INSERT INTO `pjesma_korisnik` VALUES (1,'user1',4.50),(1,'user2',NULL),(2,'user1',4.40),(3,'user2',4.50),(4,'milos1',4.60),(4,'user1',4.50),(7,'milos1',4.90);
/*!40000 ALTER TABLE `pjesma_korisnik` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-30 18:06:46
