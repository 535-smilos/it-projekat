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
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `slika` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `je_admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES ('admin','$2a$10$EEEEI4SMCUqAVYYdbK5oee2YriJLY7WuzhNP2sOYMzJzvfSHcGygO','http://localhost:8800/public/slike/default.png','admin@admin.com',1),('milos1','$2a$10$AeMAF.K3QIZ9GewbTtWM/eXyJj3Bfbo5bUZN5oQvSJCqi1NJF47yu','http://localhost:8800/public/slike/Screenshot 2025-01-14 131600.png','milos1@milos1.com',0),('milos2','$2a$10$32ZPfsyJrZH3hyTVBb72aePNtzvCKIUourZOM5k/GN1lHEAIg.Eha','http://localhost:8800/public/slike/default.png','milos2@milos2.com',0),('smilos','$2a$10$kjov0BOGgd99CTzNyusbo.x3oNC5WzDN4WD/ISx56Mu3HXsJUZJ0G','http://localhost:8800/public/slike/default.png','smilos@smilos.com',NULL),('user1','$2a$10$kjov0BOGgd99CTzNyusbo.x3oNC5WzDN4WD/ISx56Mu3HXsJUZJ0G','http://localhost:8800/public/slike/Screenshot 2025-01-14 131600.png','user1@example.com',0),('user2','$2a$10$kjov0BOGgd99CTzNyusbo.x3oNC5WzDN4WD/ISx56Mu3HXsJUZJ0G','user2.jpg','user2@example.com',0);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
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
