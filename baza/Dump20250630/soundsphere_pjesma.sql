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
-- Table structure for table `pjesma`
--

DROP TABLE IF EXISTS `pjesma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pjesma` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ocjena` decimal(3,2) DEFAULT NULL,
  `trajanje` time DEFAULT NULL,
  `zanr_id` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `zanr_id` (`zanr_id`),
  CONSTRAINT `pjesma_ibfk_1` FOREIGN KEY (`zanr_id`) REFERENCES `zanr` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pjesma`
--

LOCK TABLES `pjesma` WRITE;
/*!40000 ALTER TABLE `pjesma` DISABLE KEYS */;
INSERT INTO `pjesma` VALUES (1,'Yesterday','https://www.youtube.com/yesterday',4.50,'03:30:00',1),(2,'Thriller','https://www.youtube.com/thriller',4.80,'05:57:00',1),(3,'Lose Yourself','https://www.youtube.com/lose-yourself',4.90,'05:20:00',3),(4,'One More Time','https://www.youtube.com/watch?v=A2VpR8HahKc',4.70,'05:20:00',4),(5,'So What','https://www.youtube.com/so-what',4.60,'09:22:00',5),(7,'Bad Liar','https://www.youtube.com/watch?v=I-QfPUz1es8',4.60,'04:43:00',1);
/*!40000 ALTER TABLE `pjesma` ENABLE KEYS */;
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
