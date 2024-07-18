CREATE DATABASE  IF NOT EXISTS `get_market` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `get_market`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: get_market
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Dairy & Eggs','Fresh dairy products sourced directly from local farms, including milk, cheese, yogurt, and farm-fresh eggs.',NULL),(2,'Meat & Poultry','High-quality cuts of meat and poultry, carefully selected for freshness and flavor. Choose from a variety of options including beef, chicken, pork, and more',NULL),(3,'Produce','A vibrant selection of fresh fruits and vegetables, handpicked for peak ripeness and flavor. From crisp apples to leafy greens, we\'ve got your produce needs covered.',NULL),(4,'Bakery',' Indulge in freshly baked bread, pastries, and desserts made with the finest ingredients. From crusty artisan loaves to decadent cakes, our bakery has something for every craving.',NULL),(5,'Snacks & Sweets','Treat yourself to a selection of snacks and sweets, perfect for satisfying cravings any time of day. From salty snacks to sweet treats, we\'ve got snacks for every palate.',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` decimal(19,4) NOT NULL DEFAULT '0.0000',
  `stock` smallint NOT NULL DEFAULT '0',
  `categoryId` int NOT NULL,
  `quantity` varchar(20) DEFAULT NULL,
  `imageName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Products_Categories_idx` (`categoryId`),
  CONSTRAINT `FK_Products_Categories` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (11,'Dairy & Eggs','Locally sourced, pasteurized milk with a rich, creamy taste.',5.9000,25,1,'1bottle of 250ml',NULL),(12,'Free-Range Eggs',' Cage-free eggs from humanely raised chickens, offering superior flavor and nutrition.',12.9000,9,1,'12 eggs.',NULL),(13,'Organic Chicken Breast','Premium organic chicken breast, raised without antibiotics or hormones for a healthier option.',34.9000,20,2,'1kg.',NULL),(14,'Grass-Fed Beef Sirloin Steak','Tender and flavorful steak from grass-fed cattle, perfect for grilling or searing.',89.9000,7,2,'650g.',NULL),(15,'Sweet Juicy Strawberries','Plump and juicy strawberries bursting with sweetness, perfect for snacking or adding to desserts.',26.5000,12,3,'1/2kg.',NULL),(16,'Decadent Chocolate Brownies',' Rich and fudgy chocolate brownies made with premium cocoa and real butter, a heavenly treat for chocolate lovers.',33.8000,6,4,'1 box with 8 cookies',NULL),(17,'Gourmet Dark Chocolate Bar','Luxurious dark chocolate bar made from single-origin cocoa beans, offering intense cocoa flavor with hints of fruit and nuts.',12.8000,5,5,'1 snack of 200g.',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Users_Roles_idx` (`roleId`),
  CONSTRAINT `FK_Users_Roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28  0:52:56
