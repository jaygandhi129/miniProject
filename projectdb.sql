-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `business_details`
--

DROP TABLE IF EXISTS `business_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_details` (
  `bId` int NOT NULL AUTO_INCREMENT,
  `seller` int NOT NULL,
  `bName` varchar(80) NOT NULL,
  `bCategory` varchar(45) NOT NULL,
  `bMobile` bigint NOT NULL,
  `bGST` varchar(15) NOT NULL,
  `bEmail` varchar(45) NOT NULL,
  `bWebsite` varchar(45) DEFAULT NULL,
  `bAddress` varchar(100) NOT NULL,
  `bCity` varchar(45) NOT NULL,
  `bState` varchar(45) NOT NULL,
  `bZip` int NOT NULL,
  `bPhotoId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`bId`),
  UNIQUE KEY `bMobile` (`bMobile`),
  UNIQUE KEY `bGST` (`bGST`),
  UNIQUE KEY `bEmail` (`bEmail`),
  KEY `sellerBusiness` (`seller`),
  CONSTRAINT `sellerBusiness` FOREIGN KEY (`seller`) REFERENCES `seller_details` (`sId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_details`
--

LOCK TABLES `business_details` WRITE;
/*!40000 ALTER TABLE `business_details` DISABLE KEYS */;
INSERT INTO `business_details` VALUES (18,1029,'mybusiness','...',7756901721,'AB1234567808767','dhoblesaurabh35@gmail.com','','PLOT NO. 23, DHOBLE KIRANA STORES, MANISH NAGAR','NAGPUR','Maharashtra',440015,NULL),(26,1044,'Gada Electronics','Electronics and Accessories',6363636363,'542198546523251','sdfsd@gmail.com','','Sujaynagar-8','Akluj','Maharashtra',413101,'Seller%2F1044%2F26-photo.jpg'),(29,1048,'Tejas Shop','Electronics and Accessories',5216325298,'521325269875465','tejas@gmail.com','','SUJAYNAGAR 8 , BYPASS ROAD,','Akluj','Maharashtra',413101,'Seller%2F1048%2F29-photo.PNG');
/*!40000 ALTER TABLE `business_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cust_details`
--

DROP TABLE IF EXISTS `cust_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cust_details` (
  `cId` int NOT NULL AUTO_INCREMENT,
  `cName` varchar(100) NOT NULL,
  `cEmail` varchar(70) NOT NULL,
  `cMobile` bigint NOT NULL,
  `cPincode` int NOT NULL,
  `cPassword` varchar(100) NOT NULL,
  `role` int DEFAULT '1',
  PRIMARY KEY (`cId`),
  UNIQUE KEY `cEmail_UNIQUE` (`cEmail`),
  UNIQUE KEY `cMobile_UNIQUE` (`cMobile`)
) ENGINE=InnoDB AUTO_INCREMENT=800002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cust_details`
--

LOCK TABLES `cust_details` WRITE;
/*!40000 ALTER TABLE `cust_details` DISABLE KEYS */;
INSERT INTO `cust_details` VALUES (800001,'Jay Nandan Gandhi','jaygandhi129@gmail.com',7709708626,413101,'70b4269b412a8af42b1f7b0d26eceff2',1);
/*!40000 ALTER TABLE `cust_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `iId` int NOT NULL AUTO_INCREMENT,
  `sellerPrice` float NOT NULL,
  `stockAvailable` int NOT NULL,
  `sId` int DEFAULT NULL,
  `pId` int DEFAULT NULL,
  `iDelivery` char(1) NOT NULL,
  PRIMARY KEY (`iId`),
  UNIQUE KEY `sId` (`sId`,`pId`),
  KEY `pId` (`pId`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `seller_details` (`sId`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `products` (`pId`),
  CONSTRAINT `CHK_Delivery` CHECK ((`iDelivery` in (_utf8mb4'Y',_utf8mb4'N'))),
  CONSTRAINT `inventory_chk_1` CHECK ((`stockAvailable` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=100027 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pId` int NOT NULL AUTO_INCREMENT,
  `pName` varchar(100) NOT NULL,
  `pMrp` float NOT NULL,
  `pCategory` varchar(45) NOT NULL,
  `pDescription` varchar(200) NOT NULL,
  `pPhotoId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=50026 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_details`
--

DROP TABLE IF EXISTS `seller_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_details` (
  `sId` int NOT NULL AUTO_INCREMENT,
  `sName` varchar(45) NOT NULL,
  `sPhoneNo` bigint NOT NULL,
  `sDOB` date NOT NULL,
  `sGender` char(1) NOT NULL,
  `sAddress` varchar(100) NOT NULL,
  `sCity` varchar(45) NOT NULL,
  `sState` varchar(45) NOT NULL,
  `sZip` int NOT NULL,
  `sAadhar` bigint NOT NULL,
  `sPAN` char(10) NOT NULL,
  `sPassword` varchar(100) NOT NULL,
  `role` int DEFAULT '0',
  PRIMARY KEY (`sId`),
  UNIQUE KEY `sPhoneNo` (`sPhoneNo`),
  UNIQUE KEY `sAadhar` (`sAadhar`),
  UNIQUE KEY `sPAN` (`sPAN`),
  CONSTRAINT `seller_details_chk_1` CHECK ((`sGender` in (_utf8mb4'M',_utf8mb4'F',_utf8mb4'O')))
) ENGINE=InnoDB AUTO_INCREMENT=1049 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_details`
--

LOCK TABLES `seller_details` WRITE;
/*!40000 ALTER TABLE `seller_details` DISABLE KEYS */;
INSERT INTO `seller_details` VALUES (1029,'Saurabh Dhoble',7756901721,'2021-04-13','M','23, Manish Nagar, Nagpur','NAGPUR','Maharashtra',440015,9911881277336659,'9011882275','10b8e822d03fb4fd946188e852a4c3e2',0),(1044,'Jethalal Gada',2312121212,'2021-04-15','M','Hhjahj','Akluj','Maharashtra',413101,7578555555555555,'2222222222','dc02c947d1b6c77047f17e5f01ea39ed',0),(1048,'Tejas Gandhi',8087630373,'2021-04-23','M','sdfsasd','Solapur','Maharashtra',215421,5212212132565212,'1245236985','15e8e7c72ea16ca290930fd7c4db760b',0);
/*!40000 ALTER TABLE `seller_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-24 21:56:12
