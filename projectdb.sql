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
-- Table structure for table `admin_details`
--

DROP TABLE IF EXISTS `admin_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_details` (
  `adminId` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`adminId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_details`
--

LOCK TABLES `admin_details` WRITE;
/*!40000 ALTER TABLE `admin_details` DISABLE KEYS */;
INSERT INTO `admin_details` VALUES ('admin1','10b8e822d03fb4fd946188e852a4c3e2',2);
/*!40000 ALTER TABLE `admin_details` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_details`
--

LOCK TABLES `business_details` WRITE;
/*!40000 ALTER TABLE `business_details` DISABLE KEYS */;
INSERT INTO `business_details` VALUES (32,1051,'Dhoble Mart','',7756901721,'22AAAAA0000A1Z5','dhoblesaurabh35@gmail.com','','PN. 23, DHOBLE MART, MANISH NAGAR','NAGPUR','Maharashtra',440015,'Seller%2F1051%2F32-photo.jpg'),(33,1052,'Tejas Shoppy','Mart',8087630373,'22AAAAA0000A1Z4','tgandhi172@gmail.com','','PN. 47, TEJAS SHOPPY, MANISH NAGAR','NAGPUR','Maharashtra',440015,'Seller%2F1052%2F33-photo.jpg'),(34,1053,'Chavan General Store','Other',7378770771,'22AAAAA0000A1Z3','pc.chavan@gmail.com','','A2, Navi Peth','Solapur','Maharashtra',413002,'Seller%2F1053%2F34-photo.jpg'),(35,1054,'J Store','',7709708626,'22AAAAA0000A1Z2','contact@jaygandhi.tech','www.jaygandhi.tech','A3, Navi Peth','Solapur','Maharashtra',413002,'Seller%2F1054%2F35-photo.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=800009 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cust_details`
--

LOCK TABLES `cust_details` WRITE;
/*!40000 ALTER TABLE `cust_details` DISABLE KEYS */;
INSERT INTO `cust_details` VALUES (800003,'Tejas Gandhi','tg.gandhi@gmail.com',8087630373,440015,'10b8e822d03fb4fd946188e852a4c3e2',1),(800004,'Ajay Phade','ap.phade@gmail.com',9422129600,413002,'10b8e822d03fb4fd946188e852a4c3e2',1),(800005,'Akshay Kumar','ak.kumar@gmail.com',7709708626,413002,'10b8e822d03fb4fd946188e852a4c3e2',1),(800006,'SAURABH SHASHANK DHOBLE','dhoblesaurabh35@gmail.com',7756901721,440015,'10b8e822d03fb4fd946188e852a4c3e2',1),(800007,'Pooja Chavan','poo@gmail.com',7378770771,413002,'70b4269b412a8af42b1f7b0d26eceff2',1),(800008,'dsd dsg ds gdsg ds gds gs','fdhfdhdf@syhsh.fgg',3536326623,0,'c0c61ecb1f07e5ae58e507547df12c72',1);
/*!40000 ALTER TABLE `cust_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_subscription`
--

DROP TABLE IF EXISTS `customer_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_subscription` (
  `cId` int NOT NULL,
  `subscription` text NOT NULL,
  PRIMARY KEY (`cId`),
  CONSTRAINT `cId_sub` FOREIGN KEY (`cId`) REFERENCES `cust_details` (`cId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_subscription`
--

LOCK TABLES `customer_subscription` WRITE;
/*!40000 ALTER TABLE `customer_subscription` DISABLE KEYS */;
INSERT INTO `customer_subscription` VALUES (800005,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/eB6bJXhyT14:APA91bEEtv2MRLRMO-5iz-rKHTQoOyKE6bm_TW_SCX8HpGTCXGHtitrh6hjpwdX333KeBbTOvN2HegTHbq3PBI8uP-sIj6Vz23Ehjye6lRlUcez1PMw3n_KGI0QSQtxyJM1d_rQRqU2o\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BLc_zMCdXmsCA1Q4kCjTFGVtODrQhp7D-yBUo0FMDPTmwBiw6XVZmjJDmyxUpfqufyLt2AQEH9Vu5rFiX572HPc\",\"auth\":\"C7j4zo8wEQKLjI9wuLnrRw\"}}'),(800007,'{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/eT9yGsZ3eAo:APA91bG_RshetYJ6aKquoUS6qFzPHE6skPoG2yPbATUHLzGptLWVCfnSMBwcwOvVl3owDjOIoEgL4fkN2Z0HCZ0YS-yQjhavWQnGZ9SLYYOWRqNfygxyndBhakY4X1LrXwzftrfDoZ_q\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BGIBOLMzDgiYnOXxcKiAkQ1Qb9D0czYn4vHuqYRFu4Zdd_SEzXFZqDyKuop0BRae9XCLNuqPM0H0gOCiRW9Po8c\",\"auth\":\"jPrelMBo953eH22eBOIn5g\"}}');
/*!40000 ALTER TABLE `customer_subscription` ENABLE KEYS */;
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
  `iSize` varchar(50) DEFAULT NULL,
  `iDescription` varchar(500) NOT NULL,
  `iDeliveryCharges` int NOT NULL DEFAULT '0',
  `iTags` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`iId`),
  UNIQUE KEY `sId` (`sId`,`pId`),
  KEY `pId` (`pId`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `seller_details` (`sId`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`pId`) REFERENCES `products` (`pId`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,255,15,1053,50054,'N',NULL,'Author : Amish\r\nLanguage: English\r\nBinding: Paperback\r\nPublisher: Westland\r\nGenre: Historical Fiction\r\nPages: 415',0,'Shiva Trilogy The Immortals of Meluha Novels Books Chavan General Store'),(2,260,15,1053,50055,'Y',NULL,'Author : Tripathi Amish\r\nLanguage: English\r\nBinding: Paperback\r\nGenre: Fiction\r\nPages: 600',40,'Shiva Trilogy The Oath of the Vayuputras Novels Books Chavan General Store'),(3,270,15,1053,50056,'Y',NULL,'Author: Amish Tripathi\r\n396 Pages\r\nLanguage: English\r\nPublisher: Generic',40,'Shiva Trilogy The Secret Of The Nagas Novels Books Chavan General Store'),(4,350,23,1053,50057,'N',NULL,'Language: English\r\nBinding: Paperback\r\nPublisher: Penguin Random House Children\'s UK\r\nPages: 352\r\nOne of the most popular young adult fiction books to read .',0,'John Green\'s The Fault in Our Stars Novels Books Chavan General Store'),(5,3500,15,1053,50058,'N',NULL,'With Mic:Yes\r\nConnector type: 3.5 mm\r\nBattery life: 15 hr | Charging time: 3 Hours\r\n40mm Drivers: HD Sound\r\nAdjustable Earcups\r\nUp to 15 H Playback\r\nLightweight Design\r\nDual Modes: Bluetooth & AUX',0,'BOAT Rockerz 450 Bluetooth Headset  Headphones & Earphones Mobile & Accessories Chavan General Store'),(6,3300,10,1054,50058,'N',NULL,'With Mic:Yes Connector type: 3.5 mm Battery life: 15 hr | Charging time: 3 Hours 40mm Drivers: HD Sound Adjustable Earcups Up to 15 H Playback Lightweight Design Dual Modes: Bluetooth & AUX',0,'BOAT Rockerz 450 Bluetooth Headset Headphones & Earphones Mobile & Accessories'),(7,14.5,200,1053,50059,'N',NULL,'Brand\r\nCadbury\r\nModel Name\r\nHot Chocolate\r\nQuantity\r\n20 g\r\nContainer Type\r\nPouch\r\nFlavor\r\nChocolate\r\nMaximum Shelf Life\r\n9 Months',0,'Cadbury  Hot Chocolate  (20 g) Snacks & Drinks Grocery Chavan General Store'),(8,2999,15,1053,50060,'Y',NULL,'Type: Teardrop Bean Bag\r\nColor : Black or Grey\r\nMaterial: Artificial Leather\r\nFastening Mechanism: Zipper with Velcro\r\nFilling: Styrofoam\r\nWidth x Height: 28 inch x 48 inch (2 ft 4 in x 4 ft)',40,'Beanskart Bean Bag XXXL ( Bean Filled ) Bean Bag Home & Decor Chavan General Store'),(9,399,30,1053,50061,'Y','34,36,38,40,42,44','Fit Solid \r\nSpread Collar \r\nColour Blue',50,'SANGAM  Men Regular Casual Shirt Men\'s Formal Clothing Chavan General Store'),(10,399,30,1054,50062,'Y','32,34,36,38,40,42','Sleeve	Full Sleeve\r\nFabric	Cotton',20,'Clinkx Cotton Mens Casual Shirt Men Casual Clothing'),(11,340,15,1053,50063,'Y',NULL,'Ideal For: Women, Men, Senior, Boys, Girls\r\nLength in Number: 1.5 ft\r\nMaximum Weight Capacity: 90 kg\r\nExercise Type: Overhead Press, Bench Press, Bent Over Rows, Push up, Military Press\r\nColor: Black',40,'NIRVA  Pushup Bars Stands Handles Gym Equipment Sports & Fitness Chavan General Store'),(12,1699,30,1053,50064,'N',NULL,'Type: Fixed Weight Dumbbell\r\nWeight: 10 kg\r\nPack of: 2\r\nFor: Junior, Senior',0,'Headly Dumbbell HEXA-5KG COMBO16 Fixed Weight Gym Equipment Sports & Fitness Chavan General Store'),(15,149,15,1054,50067,'N',NULL,'Washable Mask Anti Air Pollution Anti Dust Face Mask With 5 Layer For Women , Men  (White, Free Size, Pack of 2)',0,'DALUCI N95 Mask (Pack of 2) Face Masks Covid Safety'),(16,199,17,1054,50068,'N',NULL,'Lifebuoy Antibacterial Hand Sanitizer has over 60% alcohol content and gives you instant germ protection.Apply enough Hand sanitiser gel on your palm. Spread and rub over the back of your hands thoroughly and fingertips until completely dry before touching other surfaces',0,'Lifebuoy Alcohol Based Hand Sanitizer 500ml Sanitizer Covid Safety'),(17,188.5,27,1054,50069,'Y',NULL,'Strong woody fragrance, smells like Cinnamon bark, Sandalwood and Vanilla,\r\n0% Gas,\r\n24 hour, long lasting fragrance\r\n\r\n',10,'Axe Signature Intense Long Lasting No Gas Deodorant Bodyspray For Men 154 ml Deo & Perfumes Beauty & Personal care '),(18,3100,4,1052,50070,'Y',NULL,'Flex	Extra Stiff\r\nFrame	HM Graphite / Namd / Tungsten / Black Micro Core / Nanometric\r\nShaft Composition	HM Graphite / Namd\r\nLength	10 mm longer',40,'Yonex Badminton Racket Indoor Games Equipment Sports & Fitness  Tejas Shoppy'),(19,22599,4,1054,50071,'Y',NULL,'Upholestry: Cotton,\r\nFilling Material: Foam,\r\nW x H x D: 193 cm x 84 cm x 86 cm (6 ft 3 in x 2 ft 9 in x 2 ft 9 in),\r\nSymmetrical',200,'METSMITH 3 Seater Sofa  (Finish Color - Blue, Knock Down) Sofa set Furniture '),(20,41999,10,1051,50072,'Y',NULL,'Operating System: OxygenOS based on Android™ 11\r\nCPU: Qualcomm® Snapdragon™ 888\r\n5G Chipset: X60\r\nGPU: Adreno 660\r\nRAM: 8GB/12GB LPDDR5\r\nStorage: 128GB/256GB UFS 3.1 2-LANE\r\nBattery: 4,500 mAh (2S1P 2,250 mAh, non-removable)\r\nWarp Charge 65T (10V/6.5A)\r\nCamera : Megapixels: 48,50,2\r\nVideo\r\n8K video at 30 fps\r\n4K video at 30/60 fps\r\n1080p video at 30/60 fps\r\nSuper Slow Motion: 1080p video at 240 fps, 720p video at 480 fps\r\nTime-Lapse: 1080p at 30fps, 4k at 30 fps\r\nVideo Editor\r\n\r\nFeatures\r\nNights',60,'OnePlus 9 Smart Phones Mobile & Accessories Dhoble Mart'),(21,70999,25,1051,50073,'N',NULL,'Android\r\nColour : Phantom Black\r\nProcessor\r\nCPU Speed\r\n2.9GHz, 2.8GHz, 2.2GHz\r\nCPU Type\r\nOcta-Core\r\nDisplay\r\nSize (Main_Display)\r\n17.30cm (6.8\") full rectangle / 16.87cm (6.6\") rounded corners\r\n	\r\nRear Camera - Resolution (Multiple)\r\n108.0 MP + 10.0 MP + 12.0 MP + 10.0 MP\r\nRear Camera - F Number (Multiple)\r\nF1.8 , F4.9 , F2.2 , F2.4\r\n	\r\nRAM_Size (GB) : 12\r\nROM Size (GB) : 256\r\nBattery Capacity (mAh, Typical) : 5000\r\n',0,'Samsung S21 Ultra 5G Smart Phones Mobile & Accessories Dhoble Mart'),(22,79000,10,1051,50074,'N',NULL,'OS : iOS\r\nColor :  Blue\r\nCapacity : 128GB\r\nDisplay : Super Retina XDR display\r\n13.7 cm / 5.4‑inch (diagonal) all‑screen OLED display\r\n2340x1080-pixel resolution at 476 ppi\r\nChip : A14 Bionic chip\r\nNext‑generation Neural Engine\r\nDual 12MP camera system: Ultra Wide and Wide cameras\r\nUltra Wide: ƒ/2.4 aperture and 120° field of view\r\nWide: ƒ/1.6 aperture\r\n2x optical zoom out\r\nDigital zoom up to 5x\r\nFace ID\r\nEnabled by TrueDepth camera for facial recognition',0,'Apple iPhone 12 Smart Phones Mobile & Accessories Dhoble Mart'),(23,1100,2,1052,50075,'N',NULL,'900km/day',0,'Byke Riding Gears Riding gears Auto Accessories Tejas Shoppy '),(24,69999,10,1051,50076,'Y',NULL,'OS : Android\r\nColor : Ceramic Black\r\nProcessor : Flagship Qualcomm® Snapdragon™ 888\r\nCPU: Qualcomm® Kryo™ 680, up to 2.84GHz, with Arm Cortex-X1 technology\r\nGPU: Qualcomm® Adreno™ 660 GPU\r\nStorage & RAM : 12GB+256GB LPDDR5 + UFS 3.1\r\nDimensions\r\nHeight: 164.3mm\r\nWidth: 74.6mm\r\nThickness: 8.38mm\r\nWeight: 234g\r\nDisplay : Quad-curved display\r\nWQHD+ 6.81” AMOLED DotDisplay\r\n50MP wide-angle camera\r\n48MP ultra-wide angle camera\r\n48MP telephoto camera\r\n20MP in-display selfie camera\r\n\r\n',50,'Xiaomi mi 11 Ultra Smart Phones Mobile & Accessories Dhoble Mart'),(25,49999,12,1051,50077,'Y',NULL,'OS : Android\r\nColor : Phantom Black\r\nWeight and Dimension : 238 grams\r\n(6.09 inches), (2.72 inches),  (0.36 inches)\r\nProcessor : 2.84 GHz Qualcomm Snapdragon 888 Adreno 660\r\nRAM : 8GB\r\nStorage : 128GB\r\nDisplay : 17.22cm(6.78”) 20.4:9 2448x1080 FHD+ (395ppi) 144Hz/1ms AMOLED HDR10+ certified\r\nCamera : 64 MP+13 MP+5MP\r\nFront Camera : 24MP\r\nBattery : 2 x 3000 mah',50,'Asus ROG Phone 5 Smart Phones Mobile & Accessories Dhoble Mart'),(26,8999,4,1053,50078,'Y',NULL,'Finish Color - Wenge\r\nType: Open | 5 Shelves\r\nEngineered Wood\r\nW x H x D: 29.9 cm x 165.1 cm x 29.9 cm (11 in x 5 ft 5 in x 11 in)\r\nMount: Free Standing\r\nStyle: Contemporary & Modern\r\nDIY - Basic assembly to be done with simple tools by the customer, comes with instructions.',80,'BLUEWUD Alex Wood Open Book Shelf   Shelves Furniture Chavan General Store'),(30,176,10,1054,50082,'Y',NULL,'Language: English\r\nBinding: Paperback\r\nPublisher: Rupa\r\nGenre: Teens\r\nISBN: 9780978812911, 8129135728\r\nEdition: 3, 2014',10,' Half Girlfriend  Novels Books'),(31,71599,10,1052,50073,'Y',NULL,'Android\r\nColour : Phantom Black\r\nProcessor\r\nCPU Speed\r\n2.9GHz, 2.8GHz, 2.2GHz\r\nCPU Type\r\nOcta-Core\r\nDisplay\r\nSize (Main_Display)\r\n17.30cm (6.8\") full rectangle / 16.87cm (6.6\") rounded corners\r\n\r\nRear Camera - Resolution (Multiple)\r\n108.0 MP + 10.0 MP + 12.0 MP + 10.0 MP\r\nRear Camera - F Number (Multiple)\r\nF1.8 , F4.9 , F2.2 , F2.4\r\n\r\nRAM_Size (GB) : 12\r\nROM Size (GB) : 256\r\nBattery Capacity (mAh, Typical) : 5000',50,'Samsung S21 Ultra 5G Smart Phones Mobile & Accessories Tejas Shoppy'),(32,41599,20,1052,50072,'N',NULL,'Operating System: OxygenOS based on Android™ 11\r\nCPU: Qualcomm® Snapdragon™ 888\r\n5G Chipset: X60\r\nGPU: Adreno 660\r\nRAM: 8GB/12GB LPDDR5\r\nStorage: 128GB/256GB UFS 3.1 2-LANE\r\nBattery: 4,500 mAh (2S1P 2,250 mAh, non-removable)\r\nWarp Charge 65T (10V/6.5A)\r\nCamera : Megapixels: 48,50,2\r\nVideo\r\n8K video at 30 fps\r\n4K video at 30/60 fps\r\n1080p video at 30/60 fps\r\nSuper Slow Motion: 1080p video at 240 fps, 720p video at 480 fps\r\nTime-Lapse: 1080p at 30fps, 4k at 30 fps\r\nVideo Editor\r\n\r\nFeatures\r\nNights',0,'OnePlus 9 Smart Phones Mobile & Accessories Tejas Shoppy'),(33,69999,15,1052,50076,'N',NULL,'OS : Android\r\nColor : Ceramic Black\r\nProcessor : Flagship Qualcomm® Snapdragon™ 888\r\nCPU: Qualcomm® Kryo™ 680, up to 2.84GHz, with Arm Cortex-X1 technology\r\nGPU: Qualcomm® Adreno™ 660 GPU\r\nStorage & RAM : 12GB+256GB LPDDR5 + UFS 3.1\r\nDimensions\r\nHeight: 164.3mm\r\nWidth: 74.6mm\r\nThickness: 8.38mm\r\nWeight: 234g\r\nDisplay : Quad-curved display\r\nWQHD+ 6.81” AMOLED DotDisplay\r\n50MP wide-angle camera\r\n48MP ultra-wide angle camera\r\n48MP telephoto camera\r\n20MP in-display selfie camera',0,'Xiaomi mi 11 Ultra Smart Phones Mobile & Accessories Tejas Shoppy'),(34,79500,10,1052,50074,'Y',NULL,'OS : iOS\r\nColor : Blue\r\nCapacity : 128GB\r\nDisplay : Super Retina XDR display\r\n13.7 cm / 5.4‑inch (diagonal) all‑screen OLED display\r\n2340x1080-pixel resolution at 476 ppi\r\nChip : A14 Bionic chip\r\nNext‑generation Neural Engine\r\nDual 12MP camera system: Ultra Wide and Wide cameras\r\nUltra Wide: ƒ/2.4 aperture and 120° field of view\r\nWide: ƒ/1.6 aperture\r\n2x optical zoom out\r\nDigital zoom up to 5x\r\nFace ID\r\nEnabled by TrueDepth camera for facial recognition',50,'Apple iPhone 12 Smart Phones Mobile & Accessories Tejas Shoppy'),(36,49900,10,1052,50077,'N',NULL,'OS : Android\r\nColor : Phantom Black\r\nWeight and Dimension : 238 grams\r\n(6.09 inches), (2.72 inches), (0.36 inches)\r\nProcessor : 2.84 GHz Qualcomm Snapdragon 888 Adreno 660\r\nRAM : 8GB\r\nStorage : 128GB\r\nDisplay : 17.22cm(6.78”) 20.4:9 2448x1080 FHD+ (395ppi) 144Hz/1ms AMOLED HDR10+ certified\r\nCamera : 64 MP+13 MP+5MP\r\nFront Camera : 24MP\r\nBattery : 2 x 3000 mah',0,'Asus ROG Phone 5 Smart Phones Mobile & Accessories Tejas Shoppy'),(37,67499,2,1054,50084,'Y',NULL,'Processor: Intel Core i5-10300H processor, turbo up to 4.5 Ghz\r\nDisplay: 15.6\" display with IPS (In-Plane Switching) technology, Full HD\r\nMemory: 8 GB of DDR4 system memory, upgradable to 32 GB\r\nStorage: 1 TB HDD 7200RPM + 256 GB SSD\r\nGraphics: NVIDIA GeForce GTX 1650Ti with 4GB of dedicated GDDR6 VRAM\r\nDTS X:Ultra Audio, featuring optimized Bass, Loudness, Speaker Protection with up to 6 custom content modes by smart amplifier',50,'Acer Nitro 5 Laptop Electronic Accessories J Store'),(38,7999,2,1054,50078,'Y',NULL,'Finish Color - Wenge\r\nType: Open | 5 Shelves\r\nEngineered Wood\r\nW x H x D: 29.9 cm x 165.1 cm x 29.9 cm (11 in x 5 ft 5 in x 11 in)\r\nMount: Free Standing\r\nStyle: Contemporary & Modern',0,'BLUEWUD Alex Wood Open Book Shelf Shelves Furniture J Store'),(39,25999,4,1053,50085,'Y',NULL,'Bed Material Subtype: Particle Board\r\nW x H x D: 188.97 cm x 91.44 cm x 216.4 cm (6 ft 2 in x 3 ft x 7 ft 1 in)\r\nStorage Type: Box\r\nDelivery Condition: Knock Down \r\nDelivered in non-assembled pieces\r\nInstallation by service partner',120,'Okra Sunflower  Wood King Box Bed Bed Furniture Chavan General Store'),(41,599,10,1054,50087,'Y','18,20,22,24,26,28,30,32,34,36,38,40,42,44,46','Color: Multicolored\r\nFabric: Cotton\r\nStyle: Cocktail\r\nPattern: Animal Print\r\nNeck Style: Round Neck',25,'QwikFashion Jaipuri Style Women\'s Cocktail Midi Dress Women\'s Casual Clothing J Store'),(42,4100,30,1053,50088,'N',NULL,'Style code : STNILW66BLK\r\nPattern : Colorblock\r\nLocking mechanism : Number Lock\r\nOccasion : Everyday\r\nIdeal for :Men & Women\r\nNumber of wheels : 4\r\nWater resistant : No\r\nClosure : Zipper',0,'ARISTOCRAT  Medium Check-in Luggage Trollies Travel Equipments Chavan General Store'),(43,2199,30,1053,50089,'N','24,26,28,30','Color : Blue\r\nFabric : Cotton Blend\r\nPattern : Solid\r\nStyle code : 85210206\r\nIdeal for : Boys\r\nSleeve : Full Sleeve\r\nClosure : Zipper\r\nSales package : 1 Jacket',0,'PUMA Full Sleeve Solid Boys Casual Jacket Boys Clothing Chavan General Store'),(45,249,25,1051,50091,'N','18,20,22,24,26,28','Color : Blue \r\nFabric : Cotton\r\nNeck Style : Round Neck\r\nSleeve Type : Half - Sleeve\r\nPattern : Printed\r\nWash : Machine Wash\r\nBoys will be good Humans',0,'Cotton King T shirt Boys Clothing Dhoble Mart'),(46,8999,10,1051,50092,'N','9,10','Color : Blue',0,'Nike Air Men\'s Casual Footware Dhoble Mart'),(49,68,14,1052,50094,'N',NULL,'High quality particle-filtering respirator KN95/FFP-2 (> 95%)\r\nType:  Surgical mask\r\nExtra soft ear loops and shapeable nose clip\r\nSoft inner fleece lining\r\nCan be folded flat and therefore practical to take with you\r\nNot washable\r\nExpiry date according to packaging\r\nSize folded:  10.5 x 15.2 cm, One Size\r\nColor:	grey',0,'Respair 90 x KN95 Face Mask Face Masks Covid Safety Tejas Shoppy'),(50,68,10,1051,50094,'Y',NULL,'Packaging unit: 90 pieces\r\nHigh quality particle-filtering respirator KN95/FFP-2 (> 95%)\r\nType: Surgical mask\r\nExtra soft ear loops and shapeable nose clip\r\nSoft inner fleece lining\r\nCan be folded flat and therefore practical to take with you\r\nNot washable\r\nExpiry date according to packaging\r\nSize folded: 10.5 x 15.2 cm, One Size\r\nColor:        grey',25,'Respair 90 x KN95 Face Mask Face Masks Covid Safety Dhoble Mart'),(51,999,10,1051,50093,'N','freeSize','Color : Red\r\nFabric : Silk\r\nNeck Style : Round Neck\r\nPattern : Designer\r\nWash : Hand Wash',0,'Rudra Fashion Embroidered Fashion Poly Silk Saree  Women Ethnic Clothing Dhoble Mart'),(53,670,50,1054,50095,'N','18','Fabric: Streatchable Fabric\r\nColor: Blue',0,'Lzard Regular Men Blue Jeans Men Casual Clothing J Store'),(54,14759,5,1054,50096,'Y',NULL,'-64MP quad rear camera with ultra-wide, macro mode, super macro, portrait, night mode, 960fps slowmotion, ai scene recognition, pro color, HDR, pro mode | 32MP front camera\r\n-16.94 centimeters (6.67 inch) FHD+ LCD multi-touch capacitive touchscreen, full screen dot display with 2400 x 1080 pixels resolution, 400 ppi pixel density and 20:9 aspect ratio| 2.5D curved glass\r\n-Memory, Storage & SIM: 6GB RAM | 64GB internal memory expandable up to 512GB with dedicated SD card slot | Dual SIM (nano+nan',30,'Xiaomi Redmi Note 9 Pro Max (6GB RAM, 64GB Storage) Smart Phones Mobile & Accessories J Store'),(57,599,25,1054,50099,'N','30,32,34,36','Fit Type: Regular Fit (S-37 M-39 L-41 XL-43 XXL-45)\r\nMaterial - These are 100% cotton t-shirt which are made of pre-shrunk cotton and are soft & smooth with a high thread-count. \r\nThey are comfortable and durable.',0,'MOOCHSINGH Men\'s T-shirt  Men Casual Clothing J Store'),(66,620,4,1052,50102,'Y','7,8,9,10','Sole: Rubber\r\nClosure: Pull-On\r\nShoe Width: Medium\r\nImported anti-skit Rubber Sole\r\nThese Clogs are very easy to wear as they have a convenient slip on design so you can put them on in no time and be ready to go!',40,'Zerol Waterproof Casual Sandals for Mens/Boys, Slippers & Flip Flops Men\'s Sandals Footware Tejas Shoppy'),(67,299,40,1053,50103,'N',NULL,'Ideal For: Kids\r\nForm: Oil\r\nSkin Type: All Skin Type\r\nOrganic Type: Herbal\r\nFragrance: Olive Oil',0,'HIMALAYA Massage Oil Skin Care Baby Care Chavan General Store'),(68,325,40,1053,50104,'N',NULL,'Daily Care, Nourishment & Moisturization Shampoo\r\nIdeal For: Baby Boys & Baby Girls\r\nSuitable For: All Hair Types\r\nComposition: No added parabens, phthalates or dyes',0,'JOHNSON\'S Baby No More Tears Shampoo 500 ml Skin Care Baby Care Chavan General Store'),(69,325,20,1053,50105,'N',NULL,'Type: Combination\r\nPack of 9\r\nTip Type: Slot, Phillips\r\nUsage: Household\r\nProduct Type: Screwdriver Set',0,'VISKO 111-Red Combination Screwdriver Set  (Pack of 9) Screw driver Tools & Utilities Chavan General Store'),(70,9999,3,1053,50106,'N',NULL,'Electric guitar\r\nSwan7 guitar\r\nElectric Black guitar\r\n It features professional quality standards and delivers the best Swan7 innovative excellence.\r\nMaple tonewood gives rich, well-balanced tones and excellent projection on stage. ',0,'Swan Black Electric Guitar Electro-acoustic String Musical Instruments Chavan General Store'),(71,1100,5,1052,50107,'N',NULL,'Material: Genuine leather in nappa black variant\r\n\r\nDimension: 7 inches x 9.5 inches x 1.5 inch (LxBxH)\r\n\r\nNote: The product comes with a writing pad',0,'LEATHER TALKS Conference Folder IV Files & folders Stationary Tejas Shoppy'),(72,58,20,1054,50108,'Y',NULL,'Expiry Date: 20 Apr, 2023\r\nQuantity: 1 kg\r\nForm Factor: Powder\r\nType: Refined Sugar\r\nContainer Type: Pouch\r\nOrganic: No\r\nMaximum Shelf Life: 24 Months\r\n',10,'Uttam Sugar Sulphurfree Sugar  (1 kg) Coffee/ Tea/ Sugar Grocery J Store'),(73,21,50,1054,50109,'N',NULL,'Quantity: 1 kg\r\nType: Iodized Salt\r\nForm Factor: Fine Grain\r\nContainer Type: Pouch\r\nMaximum Shelf Life: 24 Months\r\nOrganic: No',0,'Tata Iodized Salt  (1 kg) Salt & Spices Grocery J Store'),(74,53999,10,1054,50110,'Y',NULL,'Rear Triple Camera Co-Developed by Hasselblad, 48 MP Main camera, 50 MP Ultra Wide Angle Camera with Free Form Lens, 2 MP Monochorme Lens. Also comes with a 16 MP Front Camera\r\nQualcomm Snapdragon 888 Processor with Adreno 660 GPU\r\n6.55 Inches Fluid AMOLED Display with 120Hz refresh rate\r\nOnePlus Oxygen OS based on Andriod 11\r\nComes with 4500 mAh Battery with 65W Wired Charging',50,'OnePlus 9 5G (Winter Mist, 12GB RAM, 256GB Storage) Smart Phones Mobile & Accessories J Store'),(75,699,25,1054,50113,'N',NULL,'Scrabble is the classic word game\r\nMake the best word you can using any of your 7 letter tiles drawn at random\r\nYour word must use a letter tile already in play on the board\r\nScores are given for letter values and are boosted by premium squares on the grid\r\nFor 2-4 players',0,'Mattel Scrabble Board Game, Word, Letters Game, Multi Color Board games Toys J Store'),(76,240,10,1052,50115,'N',NULL,'Brand	BACKGAMMON\r\nGenre	Tournament Chess\r\nItem Dimensions LxWxH	38 x 38 x 1 Centimeters\r\nCPSIA Cautionary Statement	No Warning Applicable\r\nNumber of Players	2',0,'BACKGAMMON 15X15 Tournament Chess Game Black & White Chess Board Board games Toys Tejas Shoppy'),(77,429,20,1054,50116,'Y',NULL,'Lightweight & Comfortable\r\nDurable & Easy to Sanitize\r\nComfortable Breathing\r\nFog & Echo Resistant',20,'Covid Comfort Smartguard Lightweight Reusable Face Shield Face Shield Covid Safety J Store'),(78,14500,5,1053,50096,'N',NULL,'64MP quad rear camera with ultra-wide, macro mode, super macro, portrait, night mode, 960fps slowmotion, ai scene recognition, pro color, HDR, pro mode \r\n32MP front camera\r\n-16.94 centimeters (6.67 inch) FHD+ LCD multi-touch capacitive touchscreen, full screen dot display with 2400 x 1080 pixels resolution, 400 ppi pixel density and 20:9 aspect ratio\r\n2.5D curved glass\r\nMemory, Storage & SIM: 6GB RAM \r\n64GB internal memory expandable up to 512GB with dedicated SD card slot \r\nDual SIM (nano+nano)',0,'Xiaomi  Redmi Note 9 Pro Max (6GB RAM, 64GB Storage) Smart Phones Mobile & Accessories Chavan General Store'),(79,51999,10,1053,50110,'Y',NULL,'Rear Triple Camera Co-Developed by Hasselblad, 48 MP Main camera\r\n50 MP Ultra Wide Angle Camera with Free Form Lens, 2 MP Monochorme Lens. \r\nAlso comes with a 16 MP Front Camera\r\nQualcomm Snapdragon 888 Processor with Adreno 660 GPU\r\n6.55 Inches Fluid AMOLED Display with 120Hz refresh rate\r\nOnePlus Oxygen OS based on Andriod 11\r\nComes with 4500 mAh Battery with 65W Wired Charging',40,'OnePlus 9 5G (Winter Mist, 12GB RAM, 256GB Storage) Smart Phones Mobile & Accessories Chavan General Store'),(80,1299,12,1053,50117,'N','36,38,40,42,44,46','Colour: White\r\nCare Instructions: Machine Wash\r\nFit Type: slim fit\r\nColor name: White\r\nMaterial: cotton\r\nPattern: Printed\r\nLong Sleeve\r\nMachine Wash',0,'Allen Solly Men\'s Slim fit Casual Shirt Men Casual Clothing Chavan General Store'),(81,699,12,1053,50118,'N','34,36,38','Care Instructions: Hand Wash Only\r\nColor Name: Black and Maroon\r\nHand wash\r\nA-line\r\nSleeveless\r\nMaxi\r\nHARPA : V-neck',0,'Harpa Women\'s Maxi A-line Dress Women\'s Casual Clothing Chavan General Store'),(82,270,36,1053,50119,'N',NULL,'Pack of 2\r\nMaterial Composition : 100% Cotton Innerlayer\r\nCare Instructions : Hand Wash\r\nSize : M\r\nStyle : Unisex Face Mask',0,'Jockey  Unisex\'s Cotton Face Mask  Face Masks Covid Safety Chavan General Store'),(83,1299,12,1053,50120,'Y',NULL,'Wireless Carrier : Unlocked for All Carriers\r\nColour : Deep Blue\r\nMemory Storage Capacity : 4 MB\r\nOS : ThreadX\r\n1.8 inch screen\r\n2500mAh Battery\r\nKingvoice\r\nBig LED Torch\r\n08 Indian input language',30,'Itel Power110 (4.5cm,Big Battery, Deep Blue) Basic Phones Mobile & Accessories Chavan General Store'),(84,17999,3,1053,50121,'Y',NULL,'6.49\" Inch 16.5cm FHD+ Punch-hole Display with 2400x1080 pixels. Larger screen to body ratio of 90.5%.Side Fingerprint Sensor\r\nQualcomm Snapdragon 480 5G GPU 619 at 650 MHz Support 5G sim Powerful 2 GHz Octa-core processor, support LPDDR4X memory and latest UFS 2.1 gear 3 storage\r\n5000 mAh lithium polymer battery\r\n48MP Quad Camera 48MP Main + 2MP Macro + 2MP Depth Lens 8MP Front Camera\r\nMemory, Storage & SIM: 6GB RAM 128GB internal memory expandable up to 256GB Dual SIM nano+nano dual-standby 5G',40,'OPPO  A74 5G (Fantastic Purple, 6GB RAM, 128GB Storage) Smart Phones Mobile & Accessories Chavan General Store'),(85,69999,2,1054,50122,'Y',NULL,'6.1-inch (15.5 cm diagonal) Super Retina XDR display\r\nCeramic Shield, tougher than any smartphone glass\r\nA14 Bionic chip, the fastest chip ever in a smartphone\r\nAdvanced dual-camera system with 12MP Ultra Wide and Wide cameras; Night mode, Deep Fusion, Smart HDR 3, 4K Dolby Vision HDR recording\r\n12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording\r\nIndustry-leading IP68 water resistance\r\nSupports MagSafe accessories for easy attach and faster wireless charging\r\niOS with red',50,'Apple iPhone 12 (64GB) - Black Smart Phones Mobile & Accessories J Store'),(86,1999,20,1054,50123,'Y',NULL,'Quality geared machine heads\r\nNylon strung\r\nStandard gcea tuning. Rechargeable : No\r\nTwo months access to live or local tutors with take lessons\r\nCarry case included\r\nRefer user guide below\r\nCountry of Origin: China',50,'Martin Smith UK-212 Ultimate Soprano UKulele Starter Kit (Black) String Musical Instruments J Store');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_qty` int NOT NULL,
  `price` float NOT NULL,
  `savedAmt` float NOT NULL,
  `product_size` varchar(20) DEFAULT NULL,
  `delivery_method` varchar(45) NOT NULL,
  `prod_status` varchar(45) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`pId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (4000068,50058,2,7000,998,'','N','Cancelled'),(4000069,50054,1,255,65,'','N','Cancelled'),(4000070,50054,1,255,65,'','N','Rejected'),(4000071,50058,1,3100,899,'','N','Order Completed'),(4000072,50058,1,3200,799,'','N','Order Completed'),(4000073,50055,1,260,60,'','N','Order Completed'),(4000074,50058,1,3200,799,'','N','Order Completed'),(4000075,50058,3,9600,2397,'','N','Order Completed'),(4000076,50055,1,260,60,'','Y','Order Completed'),(4000077,50063,3,1020,777,'','Y','Cancelled'),(4000078,50058,3,10500,1497,'','N','Order Completed'),(4000079,50058,1,3500,499,'','N','Cancelled'),(4000080,50058,1,3300,699,'','N','Cancelled'),(4000081,50064,1,1699,301,'','N','Order Completed'),(4000082,50078,3,26997,3000,'','Y','Cancelled'),(4000083,50058,1,3500,499,'','N','Order Completed'),(4000084,50072,2,83198,6800,'','N','Order Completed'),(4000085,50074,1,79000,900,'','N','Accepted, In-progress'),(4000086,50070,4,12400,1200,'','Y','Order Completed'),(4000087,50070,3,9300,900,'','Y','Order Completed'),(4000088,50073,2,143198,800,'','Y','Order Completed'),(4000089,50076,1,69999,5000,'','Y','Order Completed'),(4000090,50075,2,2200,200,'','N','Accepted, In-progress'),(4000091,50084,1,67499,27500,'','N','Order Completed'),(4000092,50073,2,143198,800,'','Y','Awaiting Approval'),(4000093,50091,1,249,150,'24','N','Order Completed'),(4000094,50093,2,1998,402,'freeSize','N','Awaiting Approval'),(4000095,50072,1,41999,3000,'','N','Awaiting Approval'),(4000096,50077,1,49999,6000,'','Y','Awaiting Approval'),(4000097,50091,5,1245,750,'20','N','Cancelled'),(4000098,50084,1,67499,27500,'','Y','Accepted, In-progress'),(4000099,50099,2,1198,400,'34','N','Order Completed'),(4000100,50102,2,1240,158,'8','Y','Order Completed'),(4000101,50055,2,520,120,'','N','Accepted, In-progress'),(4000102,50054,1,255,65,'','N','Order Completed'),(4000103,50099,1,599,200,'32','N','Cancelled'),(4000104,50116,1,429,70,'','N','Order Completed'),(4000105,50096,2,29518,8480,'','Y','Order Completed'),(4000106,50091,1,249,150,'24','N','Cancelled'),(4000107,50073,1,70999,1000,'','N','Cancelled'),(4000108,50076,3,209997,15000,'','Y','Order Completed'),(4000109,50072,1,41999,3000,'','N','Cancelled'),(4000110,50096,2,29000,8998,'','N','Order Completed'),(4000111,50096,1,14759,4240,'','Y','Order Completed'),(4000112,50096,1,14759,4240,'','Y','Order Completed'),(4000113,50096,1,14759,4240,'','Y','Order Completed'),(4000114,50099,1,599,200,'32','N','Awaiting Approval'),(4000115,50123,1,1999,500,'','Y','Awaiting Approval'),(4000116,50109,2,42,0,'','N','Awaiting Approval'),(4000117,50096,1,14759,4240,'','Y','Order Completed'),(4000118,50096,1,14759,4240,'','N','Order Completed'),(4000119,50096,1,14759,4240,'','N','Rejected'),(4000120,50096,1,14759,4240,'','N','Cancelled'),(4000121,50058,1,3300,699,'','N','Order Completed'),(4000122,50096,1,14759,4240,'','Y','Cancelled'),(4000123,50096,1,14500,4499,'','N','Order Completed'),(4000124,50096,2,29000,8998,'','N','Cancelled'),(4000125,50076,1,69999,5000,'','Y','Order Completed'),(4000126,50096,1,14759,4240,'','Y','Order Completed'),(4000127,50063,1,340,259,'','N','Accepted, In-progress'),(4000128,50095,1,670,329,'18','N','Order Completed'),(4000129,50058,1,3300,699,'','N','Cancelled'),(4000130,50096,1,14759,4240,'','N','Order Completed'),(4000131,50064,1,1699,301,'','N','Order Completed'),(4000132,50117,1,1299,300,'36','N','Order Completed'),(4000133,50054,1,255,65,'','N','Order Completed'),(4000134,50058,1,3300,699,'','N','Cancelled'),(4000135,50054,1,255,65,'','N','Cancelled'),(4000136,50096,1,14500,4499,'','N','Cancelled');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_payment_details`
--

DROP TABLE IF EXISTS `order_payment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_payment_details` (
  `orderId` int NOT NULL,
  `razorpayOrderId` varchar(100) NOT NULL,
  `razorpayPaymentId` varchar(100) NOT NULL,
  `paymentMethod` varchar(45) NOT NULL,
  `paymentEmail` varchar(45) NOT NULL,
  `paymentPhone` varchar(45) NOT NULL,
  `amount` float NOT NULL,
  `paymentTimestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `refundId` varchar(100) DEFAULT NULL,
  `refundTimeStamp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`orderId`,`razorpayPaymentId`),
  CONSTRAINT `order_payment_details_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_payment_details`
--

LOCK TABLES `order_payment_details` WRITE;
/*!40000 ALTER TABLE `order_payment_details` DISABLE KEYS */;
INSERT INTO `order_payment_details` VALUES (4000068,'order_HN1DLUYaGeW0ct','pay_HN1Dsn62SPzy8K','upi','sp.patil@gmail.com','919146632518',700000,'2021-07-03 09:13:58','rfnd_HUP9BxPWmUoftB','2021-07-03 09:13:57'),(4000069,'order_HNEtKHRkUMDPkq','pay_HNEts9kYal3u42','upi','sp.patil@gmail.com','919146632518',25500,'2021-06-15 06:39:30',NULL,NULL),(4000070,'order_HNF2bhoCNeU6UC','pay_HNF2nntctVmGBj','upi','ak.kumar@gmail.com','919145598626',25500,'2021-06-15 08:00:52','rfnd_HNGHnZ7YoTwgTa','2021-06-15 08:00:50'),(4000071,'order_HNFT9jhHTplo0P','pay_HNFTjYQ8Bmo2oT','upi','ak.kumar@gmail.com','919145598626',310000,'2021-06-15 07:13:27',NULL,NULL),(4000072,'order_HNFcBFjkduFXCM','pay_HNFd91mPgPKwfh','upi','ak.kumar@gmail.com','919145598626',320000,'2021-06-15 07:22:21',NULL,NULL),(4000073,'order_HNFjymmEj4GO1N','pay_HNFk40yazEKdTN','upi','ak.kumar@gmail.com','919145598626',26000,'2021-06-15 07:28:54',NULL,NULL),(4000074,'order_HNG2u9i94lxg5b','pay_HNG36NDSbVHbPZ','upi','poo@gmail.com','917378770771',320000,'2021-06-15 07:46:56',NULL,NULL),(4000075,'order_HNG53vCvlBby47','pay_HNG5ArN7J7XbUH','upi','poo@gmail.com','917378770771',960000,'2021-06-15 07:48:53',NULL,NULL),(4000076,'order_HNG7RQX4xjw80C','pay_HNG84e62r0T3Fo','upi','ak.kumar@gmail.com','917709708626',30000,'2021-06-15 07:51:38',NULL,NULL),(4000077,'order_HNR65kxZvDHMOb','pay_HNR6fmmgO3dmsv','upi','poo@gmail.com','917378770771',106000,'2021-06-15 18:38:20','rfnd_HNR9BVxoaLtXE8','2021-06-15 18:38:19'),(4000078,'order_HNR9g1J492gU3R','pay_HNR9rnxcqqBUS1','upi','poo@gmail.com','917378770771',1050000,'2021-06-15 18:38:58',NULL,NULL),(4000079,'order_HNRFOJqryVx0cZ','pay_HNRFTtuU38GjqI','upi','poo@gmail.com','917378770771',350000,'2021-06-15 18:44:16',NULL,NULL),(4000080,'order_HO9e90ZqaEQxvG','pay_HO9efa740vs5g4','upi','dhoblesaurabh35@gmail.com','917756901721',330000,'2021-06-17 14:17:00','rfnd_HO9lMenHaC6AW2','2021-06-17 14:16:58'),(4000081,'order_HOzZvlBvLj48Ml','pay_HOzbZcC4aBTHce','upi','poo@gmail.com','917378770771',169900,'2021-06-19 16:59:46',NULL,NULL),(4000082,'order_HP1Hb7kHVaeYQD','pay_HP1HykJsVcWApu','upi','ak.kumar@gmail.com','917709708626',2707700,'2021-12-06 16:36:26','rfnd_IUG1Nap7Rl1SnQ','2021-12-06 16:36:25'),(4000083,'order_HP1SsGkwse2BFL','pay_HP1T58lhvwTnTz','upi','ak.kumar@gmail.com','917709708626',350000,'2021-06-19 18:49:07',NULL,NULL),(4000084,'order_HP1m4HEGa3Vw5S','pay_HP1mBV00JrKUNZ','upi','dhoblesaurabh35@gmail.com','917756901721',8319800,'2021-06-19 19:07:12',NULL,NULL),(4000085,'order_HP1nEEftDF9sZd','pay_HP1nKuyx62BgPj','upi','dhoblesaurabh35@gmail.com','917756901721',7900000,'2021-06-19 19:08:18',NULL,NULL),(4000086,'order_HP1oo57rJZwRou','pay_HP1p0r389mXHev','upi','dhoblesaurabh35@gmail.com','917756901721',1244000,'2021-06-19 19:09:53',NULL,NULL),(4000087,'order_HP1qI1Ziwu4SQm','pay_HP1qfbF4chR2FU','upi','tg.gandhi@gmail.com','918087630373',934000,'2021-06-19 19:11:27',NULL,NULL),(4000088,'order_HP1rSSkwBjr1ak','pay_HP1s7hwBhGNabo','netbanking','tg.gandhi@gmail.com','918087630373',14324800,'2021-06-19 19:12:49',NULL,NULL),(4000089,'order_HP1sbkAnm4YHpL','pay_HP1t4hd97JCLi2','upi','tg.gandhi@gmail.com','918087630373',7004900,'2021-06-19 19:13:44',NULL,NULL),(4000090,'order_HP1u6Iuqf0p8pY','pay_HP1uFxYzkWllpG','upi','tg.gandhi@gmail.com','918087630373',220000,'2021-06-19 19:14:51',NULL,NULL),(4000091,'order_HP1yFf0YqHybSq','pay_HP1yQjrcaFWoaN','upi','ak.kumar@gmail.com','917709708626',6749900,'2021-06-19 19:18:48',NULL,NULL),(4000092,'order_HPjwJHu4QgphQG','pay_HPjwi6PPNtgd1c','netbanking','dhoblesaurabh35@gmail.com','917756901721',14324800,'2021-06-21 14:19:41',NULL,NULL),(4000093,'order_HQBa9E1JTICzSb','pay_HQBaNNW7LqvTqb','upi','dhoblesaurabh35@gmail.com','917756901721',24900,'2021-06-22 17:21:58',NULL,NULL),(4000094,'order_HQCFnKMLTcsPYc','pay_HQCFwWYCgyxwVK','upi','dhoblesaurabh35@gmail.com','917756901721',199800,'2021-06-22 18:01:19',NULL,NULL),(4000095,'order_HRN6TJDomK103W','pay_HRN72YWmqvT7BQ','upi','tg.gandhi@gmail.com','918087630373',4199900,'2021-06-25 17:17:31',NULL,NULL),(4000096,'order_HS1cfouhUCI9k4','pay_HS1dDZD9CPyEDR','netbanking','dhoblesaurabh35@gmail.com','917756901721',5004900,'2021-06-27 08:55:43',NULL,NULL),(4000097,'order_HSURcDmxDQaUfs','pay_HSURqBzSePjuo8','netbanking','dhoblesaurabh35@gmail.com','917756901721',124500,'2021-11-04 12:29:23','rfnd_IHWiXkAg4HNAVt','2021-11-04 12:29:21'),(4000098,'order_HTBUUoTZ1c6Iy5','pay_HTBUgE7j2oTy0S','upi','ak.kumar@gmail.com','917709708626',6754900,'2021-06-30 07:13:35',NULL,NULL),(4000099,'order_HTL2FHc5TUZMrv','pay_HTL3TLdvidzpk4','upi','ak.kumar@gmail.com','917709708626',119800,'2021-06-30 16:34:45',NULL,NULL),(4000100,'order_HTLf9QcEAaoNkr','pay_HTLfSIzROH4moL','upi','tg.gandhi@gmail.com','918087630373',128000,'2021-06-30 17:10:43',NULL,NULL),(4000101,'order_HTlFTz2gZdWtwW','pay_HTlGaBVRVYxYlx','upi','poo@gmail.com','917378770771',52000,'2021-07-01 18:13:12',NULL,NULL),(4000102,'order_HU4rYUJb2RBjal','pay_HU4rzmLQEu1Fbb','upi','poo@gmail.com','917378770771',25500,'2021-07-02 13:23:48',NULL,NULL),(4000103,'order_HUW87T1qr5Mc0X','pay_HUW8Ejb37OAc38','upi','ak.kumar@gmail.com','917709708626',59900,'2021-07-03 16:04:16','rfnd_HUW8bYmeB5rGIU','2021-07-03 16:04:15'),(4000104,'order_HUW9qU0gHDXjGd','pay_HUW9yKnZznUUdL','upi','ak.kumar@gmail.com','917709708626',42900,'2021-07-03 16:05:32',NULL,NULL),(4000105,'order_HUWl5cPtks42ty','pay_HUWm2bPk74wA9y','upi','ak.kumar@gmail.com','917709708626',2954800,'2021-07-03 16:41:35',NULL,NULL),(4000106,'order_HUvueJBaMVkIpo','pay_HUvwQab6q3Hvkm','upi','dhoblesaurabh35@gmail.com','917756901721',24900,'2021-07-04 17:37:26','rfnd_HUwG8TzmI1BOuz','2021-07-04 17:37:24'),(4000107,'order_HUvwqle3MVE80A','pay_HUw0IqgBZ9LOzz','netbanking','dhoblesaurabh35@gmail.com','917756901721',7099900,'2021-07-04 17:23:01','rfnd_HUw0u4fX9uhOyz','2021-07-04 17:22:59'),(4000108,'order_HUw3MuSd8dtAnz','pay_HUw3ncvOqSTurc','netbanking','dhoblesaurabh35@gmail.com','917756901721',21004700,'2021-07-04 17:25:44',NULL,NULL),(4000109,'order_HVBZwhoSYHjLhl','pay_HVBcCDI2wrCUTT','netbanking','dhoblesaurabh35@gmail.com','917756901721',4199900,'2021-07-05 08:41:44','rfnd_HVBfNHYWdTfsOH','2021-07-05 08:41:42'),(4000110,'order_HVKLt2zxzfSCjm','pay_HVKLyQzwcVFphU','upi','poo@gmail.com','917378770771',2900000,'2021-07-05 17:11:35',NULL,NULL),(4000111,'order_HVKjxMc1e86y29','pay_HVKro9UMUgyZs8','netbanking','ak.kumar@gmail.com','917709708626',1478900,'2021-07-05 17:41:43',NULL,NULL),(4000112,'order_HVV2WUO8SSgb9L','pay_HVV4McNwsCuSBu','netbanking','dhoblesaurabh35@gmail.com','917756901721',1478900,'2021-07-06 03:40:32',NULL,NULL),(4000113,'order_HVapWHRFk1HMje','pay_HVaqRJb2Bxz0SP','netbanking','dhoblesaurabh35@gmail.com','917756901721',1478900,'2021-07-06 09:19:31',NULL,NULL),(4000114,'order_HVdl3hhUq9yqGn','pay_HVdlAw6SMhA9Z9','netbanking','tg.gandhi@gmail.com','918087630373',59900,'2021-07-06 12:10:37',NULL,NULL),(4000115,'order_HVdlszz0tJZFwN','pay_HVdmFxhoe4sj4r','netbanking','tg.gandhi@gmail.com','918087630373',204900,'2021-07-06 12:11:38',NULL,NULL),(4000116,'order_HVdnBSOOQH16Ph','pay_HVdnJWWAlbqDgt','upi','tg.gandhi@gmail.com','918087630373',4200,'2021-07-06 12:12:38',NULL,NULL),(4000117,'order_HVdzngFbyRbPvU','pay_HVe0O62KdU17SQ','netbanking','dhoblesaurabh35@gmail.com','917756901721',1478900,'2021-07-06 12:25:01',NULL,NULL),(4000118,'order_HVe8FKwBqRQxmh','pay_HVe8RvKRIs9Ywj','netbanking','dhoblesaurabh35@gmail.com','917756901721',1475900,'2021-07-06 12:32:39',NULL,NULL),(4000119,'order_HVf1TXvqNTwnsx','pay_HVf1ilErxs9SrF','netbanking','dhoblesaurabh35@gmail.com','917756901721',1475900,'2021-07-06 13:26:01','rfnd_HVf2nAEtzaEYML','2021-07-06 13:25:59'),(4000120,'order_HW1C8sstfSG5iY','pay_HW1COGFAfU2BLt','upi','ak.kumar@gmail.com','917709708626',1475900,'2021-07-07 11:06:44','rfnd_HW1CmvSgmouGrw','2021-07-07 11:06:42'),(4000121,'order_HW1E9ZlHG93lWJ','pay_HW1EEbMquX6pV0','upi','ak.kumar@gmail.com','917709708626',330000,'2021-07-07 11:08:05',NULL,NULL),(4000122,'order_HYQQOr9J9OUP5c','pay_HYQQe1ZRJX0eAU','upi','ak.kumar@gmail.com','917709708626',1478900,'2021-07-13 13:05:39','rfnd_HYQR8IcSCsCfBi','2021-07-13 13:05:38'),(4000123,'order_HYQRqY3Vs9IuVI','pay_HYQRweRZ4acch3','upi','ak.kumar@gmail.com','917709708626',1450000,'2021-07-13 13:06:24',NULL,NULL),(4000124,'order_HZW5RIxyufLrJZ','pay_HZW5hIu2J8mx65','upi','poo@gmail.com','917378770771',2900000,'2021-07-16 07:17:40','rfnd_HZW6uNgXeUo3fV','2021-07-16 07:17:39'),(4000125,'order_IHWZO4NXAzr4uw','pay_IHWbJnoUDBqzY6','upi','dhoblesaurabh35@gmail.com','917756901721',7004900,'2021-11-04 12:22:31',NULL,NULL),(4000126,'order_IMDaHFgEvo0cqK','pay_IMDaWL8rIvSFI8','upi','dhoblesaurabh35@gmail.com','917756901721',1478900,'2021-11-16 09:01:35',NULL,NULL),(4000127,'order_IUG2CFTf6yb3nJ','pay_IUG2R5skdZac7J','upi','ak.kumar@gmail.com','917709708626',34000,'2021-12-06 16:37:25',NULL,NULL),(4000128,'order_IUG4YY5BUsVMl6','pay_IUG4gR5I5wLJLT','upi','ak.kumar@gmail.com','917709708626',67000,'2021-12-06 16:39:33',NULL,NULL),(4000129,'order_IUvFAU9yBpL0kp','pay_IUvFOeUnoNaVgH','upi','tg.gandhi@gmail.com','918087630373',330000,'2021-12-08 08:56:07',NULL,NULL),(4000130,'order_IWV3rlA2KpfN4Y','pay_IWV45kK7877I9e','upi','dhoblesaurabh35@gmail.com','917756901721',1475900,'2021-12-12 08:37:24',NULL,NULL),(4000131,'order_IuOhjSOv9cLZxY','pay_IuOiHUE5JWzjKQ','upi','poo@gmail.com','917378770771',169900,'2022-02-10 18:00:37',NULL,NULL),(4000132,'order_IuzunJDEMHD0OO','pay_IuzvAYSBsZ1VDK','upi','poo@gmail.com','917378770771',129900,'2022-02-12 06:24:29',NULL,NULL),(4000133,'order_Iv01754WhfA57P','pay_Iv01qZAacZgkgy','upi','poo@gmail.com','917378770771',25500,'2022-02-12 06:30:49',NULL,NULL),(4000134,'order_JCbrcGkxypv0zG','pay_JCbrgwr5yPuOEx','upi','ak.kumar@gmail.com','917709708626',330000,'2022-03-28 19:14:58','rfnd_JCcYKlMzJiP4e7','2022-03-28 19:14:57'),(4000135,'order_JCcckpY1JJLsXr','pay_JCccqTiGy8xTAu','upi','ak.kumar@gmail.com','917709708626',25500,'2022-03-28 19:20:17','rfnd_JCcdwfJ64LmaWU','2022-03-28 19:20:16'),(4000136,'order_JCcx321hNwJM5u','pay_JCcxIdkoIOqs21','upi','ak.kumar@gmail.com','917709708626',1450000,'2022-03-28 19:39:42','rfnd_JCcyT5t6J2enFJ','2022-03-28 19:39:41');
/*!40000 ALTER TABLE `order_payment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `delivery_address` varchar(100) DEFAULT NULL,
  `order_zip` int NOT NULL,
  `seller_id` int NOT NULL,
  `cust_id` int NOT NULL,
  `delivery_charges` int DEFAULT '0',
  `total_amount` float NOT NULL,
  `ordered_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delivered_timestamp` timestamp NULL DEFAULT NULL,
  `seller_comment` varchar(200) DEFAULT NULL,
  `cust_feedback` varchar(200) DEFAULT NULL,
  `delivery_phone` bigint NOT NULL,
  `order_status` varchar(100) NOT NULL,
  `del_fname` varchar(45) DEFAULT NULL,
  `del_lname` varchar(45) DEFAULT NULL,
  `paymentMethod` varchar(45) NOT NULL,
  `paymentStatus` varchar(45) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `seller_id` (`seller_id`),
  KEY `cust_id` (`cust_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller_details` (`sId`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `cust_details` (`cId`)
) ENGINE=InnoDB AUTO_INCREMENT=4000137 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (4000068,NULL,413002,1053,800003,0,7000,'2021-06-14 17:16:59',NULL,NULL,NULL,9146632518,'Cancelled',NULL,NULL,'online','Refunded'),(4000069,NULL,413002,1053,800003,0,255,'2021-06-15 06:39:35',NULL,NULL,NULL,9146632518,'Cancelled',NULL,NULL,'online','Successfull'),(4000070,NULL,413002,1053,800005,0,255,'2021-06-15 06:48:03',NULL,'Stock not available',NULL,9145598626,'Rejected',NULL,NULL,'online','Refunded'),(4000071,NULL,413002,1054,800005,0,3100,'2021-06-15 07:13:32','2021-06-19 17:09:33',NULL,NULL,9145598626,'Order Completed',NULL,NULL,'online','Successfull'),(4000072,NULL,413002,1054,800005,0,3200,'2021-06-15 07:22:26','2021-06-19 17:10:21',NULL,NULL,9145598626,'Order Completed',NULL,NULL,'online','Successfull'),(4000073,'',413002,1053,800005,0,260,'2021-06-15 07:28:59','2021-06-19 17:07:21',NULL,NULL,9145598626,'Order Completed','','','online','Successfull'),(4000074,NULL,413002,1054,800007,0,3200,'2021-06-15 07:47:01','2021-06-15 07:48:16',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000075,NULL,413002,1054,800007,0,9600,'2021-06-15 07:48:59','2021-06-15 07:49:39',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000076,'Sujaynagar',413002,1053,800005,40,300,'2021-06-15 07:51:43','2021-06-15 07:58:11',NULL,NULL,7709708626,'Order Completed','Jay','Gandhi','online','Successfull'),(4000077,'Mantri Chandak Nagar',413002,1053,800007,40,1060,'2021-06-15 18:36:02',NULL,NULL,NULL,737877077,'Cancelled','POOJA','CHAVAN','online','Refunded'),(4000078,NULL,413002,1053,800007,0,10500,'2021-06-15 18:39:03','2021-07-05 17:16:01',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000079,NULL,413002,1053,800007,0,3500,'2021-06-15 18:44:23',NULL,NULL,NULL,7378770771,'Accepted, In-progress',NULL,NULL,'online','Successfull'),(4000080,NULL,413002,1054,800006,0,3300,'2021-06-17 14:10:44',NULL,NULL,NULL,7756901721,'Cancelled',NULL,NULL,'online','Refunded'),(4000081,NULL,413002,1053,800007,0,1699,'2021-06-19 16:59:52','2021-06-19 17:05:31',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000082,'Test Address',413002,1053,800005,80,27077,'2021-06-19 18:38:42',NULL,NULL,NULL,7709708626,'Cancelled','Jay','Gandhi','online','Refunded'),(4000083,NULL,413002,1053,800005,0,3500,'2021-06-19 18:49:13','2021-06-19 18:50:35',NULL,NULL,7709708626,'Order Completed',NULL,NULL,'online','Successfull'),(4000084,NULL,440015,1052,800006,0,83198,'2021-06-19 19:07:18','2021-06-19 19:17:43',NULL,NULL,7756901721,'Order Completed',NULL,NULL,'online','Successfull'),(4000085,NULL,440015,1051,800006,0,79000,'2021-06-19 19:08:23',NULL,NULL,NULL,7756901721,'Accepted, In-progress',NULL,NULL,'online','Successfull'),(4000086,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',440015,1052,800006,40,12440,'2021-06-19 19:09:58','2021-06-19 19:17:17',NULL,NULL,7756901721,'Order Completed','SAURABH','DHOBLE','online','Successfull'),(4000087,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',440015,1052,800003,40,9340,'2021-06-19 19:11:32','2021-06-19 19:16:50',NULL,NULL,9422129600,'Order Completed','SAURABH','DHOBLE','online','Successfull'),(4000088,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',440015,1052,800003,50,143248,'2021-06-19 19:12:54','2021-06-19 19:16:18',NULL,NULL,7756901721,'Order Completed','RATAN','TATA','online','Successfull'),(4000089,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',440015,1051,800003,50,70049,'2021-06-19 19:13:49','2021-06-19 19:18:38',NULL,NULL,7756901721,'Order Completed','MUKESH','BAMBANI','online','Successfull'),(4000090,NULL,440015,1052,800003,0,2200,'2021-06-19 19:14:56',NULL,NULL,NULL,8087630373,'Accepted, In-progress',NULL,NULL,'online','Successfull'),(4000091,'',413002,1054,800005,0,67499,'2021-06-19 19:18:54','2021-06-19 19:19:33',NULL,NULL,7709708626,'Order Completed','','','online','Successfull'),(4000092,'Test address',440015,1052,800006,50,143248,'2021-06-21 14:19:47',NULL,NULL,NULL,7756901721,'Awaiting Approval','Saurabh','Dhoble','online','Successfull'),(4000093,NULL,440015,1051,800006,0,249,'2021-06-22 17:22:03','2021-06-22 17:23:34',NULL,NULL,7756901721,'Order Completed',NULL,NULL,'online','Successfull'),(4000094,NULL,440015,1051,800006,0,1998,'2021-06-22 18:01:24',NULL,NULL,NULL,7756901721,'Awaiting Approval',NULL,NULL,'online','Successfull'),(4000095,'',440015,1051,800003,0,41999,'2021-06-25 17:17:37',NULL,NULL,NULL,8087630373,'Awaiting Approval','','','online','Successfull'),(4000096,'Test address',440015,1051,800006,50,50049,'2021-06-27 08:55:52',NULL,NULL,NULL,7756901721,'Awaiting Approval','Saurabh','Dhoble','online','Successfull'),(4000097,NULL,440015,1051,800006,0,1245,'2021-06-28 13:07:08',NULL,NULL,NULL,7756901721,'Cancelled',NULL,NULL,'online','Refunded'),(4000098,'Sujaynagar-8',413002,1054,800005,50,67549,'2021-06-30 07:13:41',NULL,NULL,NULL,7709708626,'Accepted, In-progress','Jay','Gandhi','online','Successfull'),(4000099,NULL,413002,1054,800005,0,1198,'2021-06-30 16:34:51','2021-06-30 16:36:50',NULL,NULL,7709708626,'Order Completed',NULL,NULL,'online','Successfull'),(4000100,'Wathar Station,Tal-Koregaon,Dis-Satara',440015,1052,800003,40,1280,'2021-06-30 17:10:48','2021-06-30 17:13:02',NULL,NULL,8087630373,'Order Completed','Tejas','Gandhi','online','Successfull'),(4000101,'',413002,1053,800007,0,520,'2021-07-01 18:13:17',NULL,NULL,NULL,7378770771,'Accepted, In-progress','','','online','Successfull'),(4000102,NULL,413002,1053,800007,0,255,'2021-07-02 13:23:54','2021-07-16 07:22:13',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000103,NULL,413002,1054,800005,0,599,'2021-07-03 16:03:59',NULL,NULL,NULL,7709708626,'Cancelled',NULL,NULL,'online','Refunded'),(4000104,'',413002,1054,800005,0,429,'2021-07-03 16:05:38','2021-07-03 16:08:26',NULL,NULL,7709708626,'Order Completed','','','online','Successfull'),(4000105,'Sujaynagar-8',413002,1054,800005,30,29548,'2021-07-03 16:41:40','2021-07-03 16:43:39',NULL,NULL,7709708626,'Order Completed','Jay','Gandhi','online','Successfull'),(4000106,NULL,440015,1051,800006,0,249,'2021-07-04 17:18:50',NULL,NULL,NULL,7756901721,'Cancelled',NULL,NULL,'online','Refunded'),(4000107,NULL,440015,1051,800006,0,70999,'2021-07-04 17:22:30',NULL,NULL,NULL,7756901721,'Cancelled',NULL,NULL,'online','Refunded'),(4000108,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',440015,1051,800006,50,210047,'2021-07-04 17:26:06','2021-07-04 17:31:52',NULL,NULL,7756901721,'Order Completed','SAURABH','DHOBLE','online','Successfull'),(4000109,'',440015,1051,800006,0,41999,'2021-07-05 08:39:06',NULL,NULL,NULL,7756901721,'Cancelled','','','online','Refunded'),(4000110,NULL,413002,1053,800007,0,29000,'2021-07-05 17:11:42','2021-07-05 17:16:45',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000111,'Solapur',413002,1054,800005,30,14789,'2021-07-05 17:41:48','2021-07-05 17:51:58',NULL,NULL,7756901721,'Order Completed','Saurabh','Dhoble','online','Successfull'),(4000112,'Navi Peth, Solapur',413002,1054,800006,30,14789,'2021-07-06 03:40:38','2021-07-06 03:57:17',NULL,NULL,7756901721,'Order Completed','Tejas','Gandhi','online','Successfull'),(4000113,'Solapur',413002,1054,800006,30,14789,'2021-07-06 09:19:35','2021-07-06 09:24:23',NULL,NULL,7756901721,'Order Completed','Tejas','Gandhi','online','Successfull'),(4000114,NULL,413002,1054,800003,0,599,'2021-07-06 12:10:41',NULL,NULL,NULL,8087630373,'Awaiting Approval',NULL,NULL,'online','Successfull'),(4000115,'Wathar Station',413002,1054,800003,50,2049,'2021-07-06 12:11:42',NULL,NULL,NULL,8087630373,'Awaiting Approval','Tejas','Gandhi','online','Successfull'),(4000116,NULL,413002,1054,800003,0,42,'2021-07-06 12:12:44',NULL,NULL,NULL,8087630373,'Awaiting Approval',NULL,NULL,'online','Successfull'),(4000117,'Solapur',413002,1054,800006,30,14789,'2021-07-06 12:25:13','2021-07-06 12:27:28',NULL,NULL,7756901721,'Order Completed','Tejas','Gandhi','online','Successfull'),(4000118,'',413002,1054,800006,0,14759,'2021-07-06 12:32:42','2021-07-06 12:33:31',NULL,NULL,7756901721,'Order Completed','','','online','Successfull'),(4000119,'',413002,1054,800006,0,14759,'2021-07-06 13:25:11',NULL,'Insufficient stock',NULL,7756901721,'Rejected','','','online','Refunded'),(4000120,'',413002,1054,800005,0,14759,'2021-07-07 11:06:25',NULL,NULL,NULL,7709708626,'Cancelled','','','online','Refunded'),(4000121,NULL,413002,1054,800005,0,3300,'2021-07-07 11:08:10','2021-07-07 11:09:08',NULL,NULL,7709708626,'Order Completed',NULL,NULL,'online','Successfull'),(4000122,'Sujaynagar-8',413002,1054,800005,30,14789,'2021-07-13 13:05:16',NULL,NULL,NULL,7709708626,'Cancelled','Jay','Gandhi','online','Refunded'),(4000123,NULL,413002,1053,800005,0,14500,'2021-07-13 13:06:30','2021-07-13 13:09:02',NULL,NULL,7709708626,'Order Completed',NULL,NULL,'online','Successfull'),(4000124,NULL,413002,1053,800007,0,29000,'2021-07-16 07:16:37',NULL,NULL,NULL,7378770771,'Cancelled',NULL,NULL,'online','Refunded'),(4000125,'A2, Navi Peth',440015,1051,800006,50,70049,'2021-11-04 12:22:37','2021-11-04 12:28:33',NULL,NULL,7972489962,'Order Completed','Shreyas','Gadwe','online','Successfull'),(4000126,'PN. 23, DHOBLE KIRANA STORES, MANISH NAGAR',413002,1054,800006,30,14789,'2021-11-16 09:01:41','2021-12-15 16:24:31',NULL,NULL,7756901721,'Order Completed','SAURABH','DHOBLE','online','Successfull'),(4000127,'',413002,1053,800005,0,340,'2021-12-06 16:37:30',NULL,NULL,NULL,7709708626,'Accepted, In-progress','','','online','Successfull'),(4000128,NULL,413002,1054,800005,0,670,'2021-12-06 16:39:38','2021-12-06 16:40:34',NULL,NULL,7709708626,'Order Completed',NULL,NULL,'online','Successfull'),(4000129,NULL,413002,1054,800003,0,3300,'2021-12-08 08:56:13',NULL,NULL,NULL,8087630373,'Awaiting Approval',NULL,NULL,'online','Successfull'),(4000130,'',413002,1054,800006,0,14759,'2021-12-12 08:37:29','2021-12-12 08:38:54',NULL,NULL,7756901721,'Order Completed','','','online','Successfull'),(4000131,NULL,413002,1053,800007,0,1699,'2022-02-10 18:00:43','2022-02-10 18:10:14',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000132,NULL,413002,1053,800007,0,1299,'2022-02-12 06:24:35','2022-02-12 06:39:32',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000133,NULL,413002,1053,800007,0,255,'2022-02-12 06:30:54','2022-02-12 06:32:28',NULL,NULL,7378770771,'Order Completed',NULL,NULL,'online','Successfull'),(4000134,NULL,413002,1054,800005,0,3300,'2022-03-28 18:34:40',NULL,NULL,NULL,7709708626,'Cancelled',NULL,NULL,'online','Refunded'),(4000135,NULL,413002,1053,800005,0,255,'2022-03-28 19:19:19',NULL,NULL,NULL,7709708626,'Cancelled',NULL,NULL,'online','Refunded'),(4000136,NULL,413002,1053,800005,0,14500,'2022-03-28 19:38:42',NULL,NULL,NULL,7709708626,'Cancelled',NULL,NULL,'online','Refunded');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_categories` (
  `catId` int NOT NULL AUTO_INCREMENT,
  `catName` varchar(100) NOT NULL,
  PRIMARY KEY (`catId`)
) ENGINE=InnoDB AUTO_INCREMENT=2000023 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_categories`
--

LOCK TABLES `product_categories` WRITE;
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (2000001,'Clothing'),(2000002,'Fashion Accessories'),(2000003,'Footware'),(2000004,'Travel Equipments'),(2000005,'Electronic Accessories'),(2000006,'Electronics & Appliances'),(2000007,'Mobile & Accessories'),(2000008,'Electricals'),(2000009,'Stationary'),(2000010,'Home & Decor'),(2000011,'Kitchen Items'),(2000012,'Tools & Utilities'),(2000013,'Toys'),(2000014,'Beauty & Personal care'),(2000015,'Auto Accessories'),(2000016,'Furniture'),(2000017,'Baby Care'),(2000018,'Books'),(2000019,'Musical Instruments'),(2000020,'Sports & Fitness'),(2000021,'Covid Safety'),(2000022,'Grocery');
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_feedback`
--

DROP TABLE IF EXISTS `product_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_feedback` (
  `pId` int NOT NULL,
  `order_id` int NOT NULL,
  `cId` int NOT NULL,
  `p_rating` float NOT NULL,
  `p_review` varchar(256) DEFAULT NULL,
  `p_feedback_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`p_feedback_id`),
  KEY `pId` (`pId`),
  KEY `order_id` (`order_id`),
  KEY `cId` (`cId`),
  CONSTRAINT `product_feedback_ibfk_1` FOREIGN KEY (`pId`) REFERENCES `products` (`pId`),
  CONSTRAINT `product_feedback_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `product_feedback_ibfk_3` FOREIGN KEY (`cId`) REFERENCES `cust_details` (`cId`)
) ENGINE=InnoDB AUTO_INCREMENT=87012 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_feedback`
--

LOCK TABLES `product_feedback` WRITE;
/*!40000 ALTER TABLE `product_feedback` DISABLE KEYS */;
INSERT INTO `product_feedback` VALUES (50096,4000123,800005,3.5,'Nice',87001),(50058,4000121,800005,5,'Good Product',87002),(50095,4000128,800005,3,'',87003),(50099,4000099,800005,1.5,'',87004),(50054,4000102,800007,3,'haan ',87005),(50096,4000110,800007,4,'Wonderful Phone!',87006),(50076,4000089,800003,4,'Nice Phone',87007),(50076,4000125,800006,1,'Worst Performance\n',87008),(50096,4000130,800006,4,'Nice camera\nAverage Performance\nDisplay not that Good but works',87009),(50091,4000093,800006,4,'good fit',87010),(50070,4000086,800006,4,'hello ji',87011);
/*!40000 ALTER TABLE `product_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_subcategories`
--

DROP TABLE IF EXISTS `product_subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_subcategories` (
  `subCatId` int NOT NULL AUTO_INCREMENT,
  `subCatName` varchar(200) NOT NULL,
  `catId` int DEFAULT NULL,
  PRIMARY KEY (`subCatId`),
  KEY `product_subcategories_ibfk_1` (`catId`),
  CONSTRAINT `product_subcategories_ibfk_1` FOREIGN KEY (`catId`) REFERENCES `product_categories` (`catId`)
) ENGINE=InnoDB AUTO_INCREMENT=3000260 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_subcategories`
--

LOCK TABLES `product_subcategories` WRITE;
/*!40000 ALTER TABLE `product_subcategories` DISABLE KEYS */;
INSERT INTO `product_subcategories` VALUES (3000001,'Men Casual',2000001),(3000002,'Men\'s Formal',2000001),(3000003,'Men\'s Bottom Wear',2000001),(3000004,'Men\'s Night wear',2000001),(3000005,'Men Ethnic',2000001),(3000006,'Women\'s Formal',2000001),(3000007,'Women\'s Night wear',2000001),(3000008,'Women\'s Casual',2000001),(3000009,'Women Ethnic',2000001),(3000010,'Other Clothing',2000001),(3000011,'Boys',2000001),(3000012,'Girls',2000001),(3000013,'Kids ',2000001),(3000014,'Artificial jewellery',2000002),(3000015,'Wallets',2000002),(3000016,'Purse',2000002),(3000017,'Men\'s Watch',2000002),(3000018,'Women\'s watch',2000002),(3000019,'Bracelets',2000002),(3000020,'Keychains & Lockets',2000002),(3000021,'Frames & Lenses',2000002),(3000022,'Men\'s Boot',2000003),(3000023,'Men\'s Sneakers',2000003),(3000024,'Men\'s Casual',2000003),(3000025,'Men\'s Formal',2000003),(3000026,'Men\'s Loafers',2000003),(3000027,'Men\'s Sports',2000003),(3000028,'Men\'s Ethnic',2000003),(3000029,'Men\'s Slippers',2000003),(3000030,'Men\'s Sandals',2000003),(3000031,'Women\'s Slipper',2000003),(3000032,'Women\'s ethnic',2000003),(3000033,'Women\'s heels',2000003),(3000034,'Women\'s sandals',2000003),(3000035,'Women\'s boots',2000003),(3000036,'Women\'s Ballerinas',2000003),(3000037,'Travel Bag',2000004),(3000038,'Trekking Backpack',2000004),(3000039,'Trollies',2000004),(3000040,'Backpack',2000004),(3000041,'Suitcase',2000004),(3000042,'Pouch',2000004),(3000043,'Laptop bag',2000004),(3000044,'Sleeping Bag',2000004),(3000045,'Laptop',2000005),(3000046,'Tablet',2000005),(3000047,'Speakers',2000005),(3000048,'Desktop',2000005),(3000049,'Monitor',2000005),(3000050,'Mouse',2000005),(3000051,'Pd',2000005),(3000052,'Printer & Ink cartridges',2000005),(3000053,'Scanner',2000005),(3000054,'Console',2000005),(3000055,'Keyboard',2000005),(3000056,'Mouse pad',2000005),(3000057,'Laptop adapter & cable',2000005),(3000058,'HeadSet',2000005),(3000059,'Cooling Pad',2000005),(3000060,'HDD',2000005),(3000061,'Webcam',2000005),(3000062,'Cameras & Lenses',2000005),(3000063,'PS & Xbox',2000005),(3000064,'Refrigerator',2000006),(3000065,'AC',2000006),(3000066,'Washing Machine',2000006),(3000067,'Oven',2000006),(3000068,'Toaster',2000006),(3000069,'Sandwich Maker',2000006),(3000070,'Heater',2000006),(3000071,'Gyser',2000006),(3000072,'Air cooler',2000006),(3000073,'Fan',2000006),(3000074,'Mixer',2000006),(3000075,'Juicer',2000006),(3000076,'Kettle',2000006),(3000077,'Water Purifier',2000006),(3000078,'TV',2000006),(3000079,'Vacuuum cleaner',2000006),(3000080,'Dish washer',2000006),(3000081,'Sewing Machine',2000006),(3000082,'Voltage Stabilizer',2000006),(3000083,'Induction',2000006),(3000084,'Iron',2000006),(3000085,'Inverter',2000006),(3000086,'Blender',2000006),(3000087,'Exhaust Fan',2000006),(3000088,'Smart Phones',2000007),(3000089,'Basic Phones',2000007),(3000090,'Tab',2000007),(3000091,'Charger',2000007),(3000092,'Cables',2000007),(3000093,'USB',2000007),(3000094,'OTG',2000007),(3000095,'Wireless Charging Pad',2000007),(3000096,'Earphones',2000007),(3000097,'Headphones & Earphones',2000007),(3000098,'Screen guard',2000007),(3000099,'Back Cover',2000007),(3000100,'Lamination',2000007),(3000101,'Batteries',2000007),(3000102,'Memory card',2000007),(3000103,'Phone parts',2000007),(3000104,'Powerbank',2000007),(3000105,'Phone holders',2000007),(3000106,'VR glasses',2000007),(3000107,'Tripod & Gimble',2000007),(3000108,'Wires',2000008),(3000109,'Plugs',2000008),(3000110,'Bulbs',2000008),(3000111,'Switches',2000008),(3000112,'Extension Board',2000008),(3000113,'Tube lights',2000008),(3000114,'Sockets',2000008),(3000115,'IC',2000008),(3000116,'Ammeter',2000008),(3000117,'Voltmeter',2000008),(3000118,'Lamp',2000008),(3000119,'Torch',2000008),(3000120,'Batteries & cells',2000008),(3000121,'Capacitors',2000008),(3000122,'Regulator',2000008),(3000123,'Ring Light',2000008),(3000124,'Buzzer',2000008),(3000125,'Door bells',2000008),(3000126,'Transformer',2000008),(3000127,'Generator',2000008),(3000128,'School supplies',2000009),(3000129,'Home essentails',2000009),(3000130,'Drawing & painting',2000009),(3000131,'Calculator',2000009),(3000132,'Office essentials',2000009),(3000133,'Xerox papers',2000009),(3000134,'Files & folders',2000009),(3000135,'Vase',2000010),(3000136,'Curtains',2000010),(3000137,'Mirror',2000010),(3000138,'Bed sheets & Pillow cover',2000010),(3000139,'Wall arts & Frames',2000010),(3000140,'Lamps',2000010),(3000141,'Carpets',2000010),(3000142,'Wallpapers',2000010),(3000143,'Chandilier',2000010),(3000144,'Clock',2000010),(3000145,'Floor Covering',2000010),(3000146,'Mattress',2000010),(3000147,'Bean Bag',2000010),(3000148,'Shower',2000010),(3000149,'Toilet & Bathroom',2000010),(3000150,'Tap',2000010),(3000151,'Basin',2000010),(3000152,'Dinner Set',2000011),(3000153,'Vessels',2000011),(3000154,'Chimney',2000011),(3000155,'Cutting Equipment',2000011),(3000156,'Cutlery',2000011),(3000157,'Storage Containers',2000011),(3000158,'Pan',2000011),(3000159,'Racks',2000011),(3000160,'Stove',2000011),(3000161,'Tiffin box',2000011),(3000162,'Kitchen Trolley',2000011),(3000163,'Wrench',2000012),(3000164,'Drilling Machine',2000012),(3000165,'Cutting tools',2000012),(3000166,'Hammer',2000012),(3000167,'Screw driver',2000012),(3000168,'Ladder',2000012),(3000169,'Tapes',2000012),(3000170,'Toolbox',2000012),(3000171,'Screw & Nails',2000012),(3000172,'Vice',2000012),(3000173,'Sand papers',2000012),(3000174,'Nut bolt & Washers',2000012),(3000175,'Others',2000012),(3000176,'Remote control toys',2000013),(3000177,'Educational toys',2000013),(3000178,'Soft toys',2000013),(3000179,'Board games',2000013),(3000180,'Outdoor toys',2000013),(3000181,'Musical toys',2000013),(3000182,'Dolls',2000013),(3000183,'Puzzles',2000013),(3000184,'Action figures',2000013),(3000185,'Cars',2000013),(3000186,'Toy guns',2000013),(3000187,'Cosmetics',2000014),(3000188,'Makeup Tools & Brushes',2000014),(3000189,'Trimmer',2000014),(3000190,'Hair care & Appliances',2000014),(3000191,'Skin care & Appliances',2000014),(3000192,'Deo & Perfumes',2000014),(3000193,'Shaving & After shave',2000014),(3000194,'Car accessories',2000015),(3000195,'Bike accessories',2000015),(3000196,'Helment',2000015),(3000197,'Riding gears',2000015),(3000198,'Washing equipment',2000015),(3000199,'Sofa set',2000016),(3000200,'Chairs',2000016),(3000201,'Tables',2000016),(3000202,'Wardrobe & Almirah',2000016),(3000203,'Dinning Table set',2000016),(3000204,'Bed',2000016),(3000205,'Chaurang',2000016),(3000206,'Shelves',2000016),(3000207,'Stool',2000016),(3000208,'Diapers & Wipes',2000017),(3000209,'Baby bath',2000017),(3000210,'Baby Oral Care',2000017),(3000211,'Baby Bedding',2000017),(3000212,'Baby Feeding & Accessories',2000017),(3000213,'Baby Grooming',2000017),(3000214,'Skin Care',2000017),(3000215,'Acedemic Books',2000018),(3000216,'Novels',2000018),(3000217,'Short Stories',2000018),(3000218,'Comics',2000018),(3000219,'Magazines',2000018),(3000220,'Encyclopedia',2000018),(3000221,'Percussion',2000019),(3000222,'Woodwind',2000019),(3000223,'String',2000019),(3000224,'Brass and Keyboard',2000019),(3000225,'Health Suppliment',2000020),(3000226,'Gym Equipment',2000020),(3000227,'Aerobic Equipment',2000020),(3000228,'Outdoor Games Equipment',2000020),(3000229,'Indoor Games Equipment',2000020),(3000230,'Swimming Equipments',2000020),(3000231,'Smart Watches & Fitness Bands',2000020),(3000232,'Stopwatch & Timer',2000020),(3000233,'Sports Wear',2000020),(3000234,'Fitness Kit',2000020),(3000235,'Face Masks',2000021),(3000236,'PPE Kit',2000021),(3000237,'Sanitizer',2000021),(3000238,'Pulse-Oximeter',2000021),(3000239,'Thermometer',2000021),(3000240,'Gloves',2000021),(3000241,'Face Shield',2000021),(3000242,'Thermal Gun',2000021),(3000243,'Handwash',2000021),(3000244,'Steamer',2000021),(3000245,'Snacks & Drinks',2000022),(3000246,'Instant Food',2000022),(3000247,'Grain',2000022),(3000248,'Flour',2000022),(3000249,'Dry Fruits',2000022),(3000250,'Salt & Spices',2000022),(3000251,'Coffee/ Tea/ Sugar',2000022),(3000252,'Frozen Food',2000022),(3000253,'Cleaning Supplies',2000022),(3000254,'Toiletries/ Personal Hygiene',2000022),(3000255,'Disposables',2000022),(3000256,'Household',2000022),(3000257,'Pooja Items',2000022),(3000258,'Diary Products',2000022),(3000259,'None',NULL);
/*!40000 ALTER TABLE `product_subcategories` ENABLE KEYS */;
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
  `pCategory` int NOT NULL,
  `pPhotoId` varchar(100) DEFAULT NULL,
  `pSubCategory` int DEFAULT NULL,
  `pBrand` varchar(100) DEFAULT NULL,
  `isBan` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`pId`),
  KEY `pCategory` (`pCategory`),
  KEY `pSubCategory` (`pSubCategory`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`pCategory`) REFERENCES `product_categories` (`catId`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`pSubCategory`) REFERENCES `product_subcategories` (`subCatId`)
) ENGINE=InnoDB AUTO_INCREMENT=50124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (50054,'The Immortals of Meluha',320,2000018,'Product%2F50054-photo.jpg',3000216,'Shiva Trilogy',1),(50055,'The Oath of the Vayuputras',320,2000018,'Product%2F50055-photo.jpg',3000216,'Shiva Trilogy',0),(50056,'The Secret Of The Nagas',320,2000018,'Product%2F50056-photo.jpg',3000216,'Shiva Trilogy',0),(50057,'The Fault in Our Stars',399,2000018,'Product%2F50057-photo.jpg',3000216,'John Green\'s',0),(50058,'Rockerz 450 Bluetooth Headset ',3999,2000007,'Product%2F50058-photo.jpeg',3000097,'BOAT',1),(50059,'Hot Chocolate  (20 g)',15,2000022,'Product%2F50059-photo.jpeg',3000245,'Cadbury ',0),(50060,'Bean Bag XXXL (Filled)',3500,2000010,'Product%2F50060-photo.jpeg',3000147,'Beanskart',0),(50061,'Casual Shirt',500,2000001,'Product%2F50061-photo.jpeg',3000002,'SANGAM  Men Regular',1),(50062,'Cotton Mens Casual Shirt',500,2000001,'Product%2F50062-photo.jpg',3000001,'Clinkx',0),(50063,'Pushup Bars Stands Handles',599,2000020,'Product%2F50063-photo.jpeg',3000226,'NIRVA ',0),(50064,'HEXA-5KG COMBO16 Fixed Weight',2000,2000020,'Product%2F50064-photo.jpeg',3000226,'Headly Dumbbell',0),(50065,'9 Pro 5G',64999,2000007,'Product%2F50065-photo.png',3000088,'OnePlus',0),(50066,'N95 Reusable Washable Mask',399,2000007,'Product%2F50066-photo.jpeg',3000088,'DALUCI',0),(50067,'N95 Mask (Pack of 2)',399,2000021,'Product%2F50067-photo.jpeg',3000235,'DALUCI',0),(50068,'Alcohol Based Hand Sanitizer 500ml',248,2000021,'Product%2F50068-photo.jpg',3000237,'Lifebuoy',0),(50069,'Signature Intense Long Lasting No Gas Deodorant Bodyspray For Men 154 ml',250,2000014,'Product%2F50069-photo.jpg',3000192,'Axe',0),(50070,'Badminton Racket',3400,2000020,'Product%2F50070-photo.jpg',3000229,'Yonex',0),(50071,'3 Seater Sofa  (Finish Color - Blue, Knock Down)',26799,2000016,'Product%2F50071-photo.jpeg',3000199,'METSMITH',0),(50072,'9',44999,2000007,'Product%2F50072-photo.jpg',3000088,'OnePlus',0),(50073,'S21 Ultra 5G',71999,2000007,'Product%2F50073-photo.png',3000088,'Samsung',0),(50074,'iPhone 12',79900,2000007,'Product%2F50074-photo.jpg',3000088,'Apple',0),(50075,'Riding Gears',1200,2000015,'Product%2F50075-photo.jpg',3000197,'Byke',0),(50076,'mi 11 Ultra',74999,2000007,'Product%2F50076-photo.jpg',3000088,'Xiaomi',0),(50077,'ROG Phone 5',55999,2000007,'Product%2F50077-photo.png',3000088,'Asus',0),(50078,'Alex Wood Open Book Shelf  ',9999,2000016,'Product%2F50078-photo.jpeg',3000206,'BLUEWUD',0),(50079,'dsfsd',14999,2000017,'Product%2F50079-photo.jpeg',3000212,'sdfsd',0),(50080,'as',14999,2000015,'Product%2F50080-photo.jpeg',3000197,'saa',0),(50081,'sas',320,2000017,'Product%2F50081-photo.jpeg',3000211,'asd',0),(50082,'Girlfriend ',255,2000018,'Product%2F50082-photo.jpg',3000216,' Half',0),(50083,'ROG Phone 5	',55999,2000007,'Product%2F50083-photo.png',3000088,'Asus',0),(50084,'Nitro 5',94999,2000005,'Product%2F50084-photo.jpg',3000045,'Acer',0),(50085,'Wood King Box Bed',29999,2000016,'Product%2F50085-photo.jpeg',3000204,'Okra Sunflower ',0),(50086,'Straight Kurta',699,2000001,'Product%2F50086-photo.jpeg',3000008,'Women Solid Cotton Blend ',0),(50087,'Jaipuri Style Women\'s Cocktail Midi Dress',999,2000001,'Product%2F50087-photo.jpg',3000008,'QwikFashion',0),(50088,'Medium Check-in Luggage',4350,2000004,'Product%2F50088-photo.jpeg',3000039,'ARISTOCRAT ',0),(50089,'Full Sleeve Solid Boys Casual Jacket',2499,2000001,'Product%2F50089-photo.jpeg',3000011,'PUMA',0),(50090,'Card game  (Multicolor)',200,2000013,'Product%2F50090-photo.jpeg',3000259,'Uno',0),(50091,'T shirt',399,2000001,'Product%2F50091-photo.jpg',3000011,'Cotton King',0),(50092,'Air',10000,2000003,'Product%2F50092-photo.jpg',3000024,'Nike',0),(50093,'Embroidered Fashion Poly Silk Saree ',1200,2000001,'Product%2F50093-photo.jpg',3000009,'Rudra Fashion',1),(50094,'90 x KN95 Face Mask',80,2000021,'Product%2F50094-photo.jpg',3000235,'Respair',0),(50095,'Regular Men Blue Jeans',999,2000001,'Product%2F50095-photo.jpg',3000001,'Lzard',1),(50096,'Redmi Note 9 Pro Max (6GB RAM, 64GB Storage)',18999,2000007,'Product%2F50096-photo.jpg',3000088,'Xiaomi',1),(50097,'9 Pro 5G',200,2000001,NULL,3000005,'ABC',0),(50098,'Saree',999,2000001,'Product%2F50098-photo.png',3000009,'Lzard',0),(50099,'Men\'s T-shirt ',799,2000001,'Product%2F50099-photo.jpg',3000001,'MOOCHSINGH',1),(50100,'Men\'s Formal Shoes',1999,2000003,'Product%2F50100-photo.jpg',3000025,'Centrino',0),(50101,'Men\'s Formal Shoes',999,2000003,NULL,3000025,'Centrin',0),(50102,'Waterproof Casual Sandals for Mens/Boys, Slippers & Flip Flops',699,2000003,'Product%2F50102-photo.jpg',3000030,'Zerol',0),(50103,'Massage Oil',400,2000017,'Product%2F50103-photo.jpeg',3000214,'HIMALAYA',0),(50104,'Baby No More Tears Shampoo 500 ml',375,2000017,'Product%2F50104-photo.jpeg',3000214,'JOHNSON\'S',0),(50105,'Combination Screwdriver Set  (Pack of 9)',400,2000012,'Product%2F50105-photo.jpeg',3000167,'VISKO 111-Red',0),(50106,'Black Electric Guitar Electro-acoustic',11999,2000019,'Product%2F50106-photo.jpeg',3000223,'Swan',0),(50107,'Conference Folder IV',1195,2000009,'Product%2F50107-photo.jpg',3000134,'LEATHER TALKS',0),(50108,'Sugar Sulphurfree Sugar  (1 kg)',60,2000022,'Product%2F50108-photo.jpeg',3000251,'Uttam',0),(50109,'Iodized Salt  (1 kg)',21,2000022,'Product%2F50109-photo.jpeg',3000250,'Tata',0),(50110,'9 5G (Winter Mist, 12GB RAM, 256GB Storage)',54999,2000007,'Product%2F50110-photo.jpg',3000088,'OnePlus',0),(50111,'BACKGAMMON® 15X15 Tournament Chess Game Black & White Chess Board with Solid Plastic Pieces for Prof',259,2000013,NULL,3000179,'BACKGAMMON',0),(50112,'BACKGAMMON® 15X15 Tournament Chess Game Black & White Chess Board with Solid Plastic Pieces for Prof',259,2000013,NULL,3000179,'BACKGAMMON',0),(50113,'Scrabble Board Game, Word, Letters Game, Multi Color',899,2000013,'Product%2F50113-photo.jpg',3000179,'Mattel',0),(50114,'BACKGAMMON® 15X15 Tournament Chess Game Black & White Chess Board with Solid Plastic Pieces for Prof',259,2000013,NULL,3000179,'BACKGAMMON',0),(50115,'15X15 Tournament Chess Game Black & White Chess Board',259,2000013,'Product%2F50115-photo.jpg',3000179,'BACKGAMMON',0),(50116,'Smartguard Lightweight Reusable Face Shield',499,2000021,'Product%2F50116-photo.jpg',3000241,'Covid Comfort',0),(50117,'Men\'s Slim fit Casual Shirt',1599,2000001,'Product%2F50117-photo.jpg',3000001,'Allen Solly',0),(50118,'Women\'s Maxi A-line Dress',720,2000001,'Product%2F50118-photo.jpg',3000008,'Harpa',0),(50119,'Unisex\'s Cotton Face Mask ',299,2000021,'Product%2F50119-photo.jpg',3000235,'Jockey ',0),(50120,'Power110 (4.5cm,Big Battery, Deep Blue)',1599,2000007,'Product%2F50120-photo.jpg',3000089,'Itel',0),(50121,'A74 5G (Fantastic Purple, 6GB RAM, 128GB Storage)',20999,2000007,'Product%2F50121-photo.jpg',3000088,'OPPO ',0),(50122,'iPhone 12 (64GB) - Black',79900,2000007,'Product%2F50122-photo.jpg',3000088,'Apple',0),(50123,'Smith UK-212 Ultimate Soprano UKulele Starter Kit (Black)',2499,2000019,'Product%2F50123-photo.jpg',3000223,'Martin',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_product`
--

DROP TABLE IF EXISTS `report_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_product` (
  `cId` int NOT NULL,
  `pId` int NOT NULL,
  `reason` varchar(500) NOT NULL,
  `isDismissed` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`cId`,`pId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_product`
--

LOCK TABLES `report_product` WRITE;
/*!40000 ALTER TABLE `report_product` DISABLE KEYS */;
INSERT INTO `report_product` VALUES (800005,50084,'sadsa',0);
/*!40000 ALTER TABLE `report_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_seller`
--

DROP TABLE IF EXISTS `report_seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_seller` (
  `sId` int NOT NULL,
  `cId` int NOT NULL,
  `reason` varchar(500) DEFAULT NULL,
  `isDismissed` int DEFAULT '0',
  PRIMARY KEY (`sId`,`cId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_seller`
--

LOCK TABLES `report_seller` WRITE;
/*!40000 ALTER TABLE `report_seller` DISABLE KEYS */;
INSERT INTO `report_seller` VALUES (1053,800005,'Fraud',0);
/*!40000 ALTER TABLE `report_seller` ENABLE KEYS */;
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
  UNIQUE KEY `sPAN` (`sPAN`)
) ENGINE=InnoDB AUTO_INCREMENT=1055 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_details`
--

LOCK TABLES `seller_details` WRITE;
/*!40000 ALTER TABLE `seller_details` DISABLE KEYS */;
INSERT INTO `seller_details` VALUES (1051,'Saurabh Dhoble',7756901721,'2000-06-28','M','Pt. No. 23, Manish Nagar, Nagpur - 15','Nagpur','Maharashtra',440015,787898985252,'ABCDE1234F','10b8e822d03fb4fd946188e852a4c3e2',0),(1052,'Tejas Gandhi',8087630373,'2000-12-22','M','Pt. No. 47, Manish Nagar, Nagpur - 15','Nagpur','Maharashtra',440015,525265656363,'FGHIJ1234K','10b8e822d03fb4fd946188e852a4c3e2',0),(1053,'Pooja Chavan',7378770771,'2000-01-23','F','A2-90, Mantri Chandak Nagar, Solapur','Solapur','Maharashtra',413002,323265652525,'LMNOP1234Q','10b8e822d03fb4fd946188e852a4c3e2',0),(1054,'Jay Gandhi',7709708626,'2000-06-29','M','Sujay Nagar, Solapur','Solapur','Maharashtra',413002,656236326563,'RSTUV1234W','10b8e822d03fb4fd946188e852a4c3e2',0);
/*!40000 ALTER TABLE `seller_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_feedback`
--

DROP TABLE IF EXISTS `seller_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_feedback` (
  `s_feedback_id` int NOT NULL AUTO_INCREMENT,
  `seller_id` int NOT NULL,
  `s_review` varchar(256) DEFAULT NULL,
  `s_rating` float NOT NULL,
  `order_id` int NOT NULL,
  `cust_id` int NOT NULL,
  PRIMARY KEY (`s_feedback_id`),
  KEY `seller_id` (`seller_id`),
  KEY `cust_id` (`cust_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `seller_feedback_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `seller_details` (`sId`),
  CONSTRAINT `seller_feedback_ibfk_2` FOREIGN KEY (`cust_id`) REFERENCES `cust_details` (`cId`),
  CONSTRAINT `seller_feedback_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57016 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_feedback`
--

LOCK TABLES `seller_feedback` WRITE;
/*!40000 ALTER TABLE `seller_feedback` DISABLE KEYS */;
INSERT INTO `seller_feedback` VALUES (57006,1053,'Nice Service given',5,4000123,800005),(57007,1054,'The service given is very fast and nice! Staff is good',4,4000121,800005),(57011,1052,'4th try',5,4000086,800006),(57012,1054,'yeah works now',5,4000130,800006),(57013,1051,'yeah almost done',4,4000089,800003),(57014,1053,'thike',5,4000110,800007),(57015,1053,'done bro done',2.5,4000102,800007);
/*!40000 ALTER TABLE `seller_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_subscription`
--

DROP TABLE IF EXISTS `seller_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_subscription` (
  `sId` int NOT NULL,
  `subscription` text NOT NULL,
  PRIMARY KEY (`sId`),
  CONSTRAINT `sId_sellerSub` FOREIGN KEY (`sId`) REFERENCES `seller_details` (`sId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_subscription`
--

LOCK TABLES `seller_subscription` WRITE;
/*!40000 ALTER TABLE `seller_subscription` DISABLE KEYS */;
INSERT INTO `seller_subscription` VALUES (1053,'{\"endpoint\":\"https://wns2-sg2p.notify.windows.com/w/?token=BQYAAAB7WM7NgdXUXUXofo4pF0T79O%2f%2buVs5uJmW%2f2jOkt1fLoub8n%2fyRvTY8HmVO2fQbHQ7tJOGRWGSsBdmxOgYi6hQFmeC%2fVL03Yukor0K%2bC2pEceblS9Gc2K6tqPSAt2t5jn8DpjfodPTEIxOSHmDuMjzaLPiUv7D64NkiyweyshtNjaOKv72hv%2bdYPM6hd47Jze0g9WK%2fRtlYY%2brAU6ibUk5LmKADGCb2rorFCrudyEhMvdftOxybnh9WgviRzXYXA%2bMlVCxeFRfoUQdFQU0kvIAt%2bvb7CwdRTDy0EXYPlghwcOSeI2i19inyGhjhehR%2br3r%2b5kLmTRLE5g3XX%2f73VQL\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BP6sS2d9NJcqi8cxNdPQ1AFn9uC40f-TUMnFNk6bukoPwkRnUaU-dAHr04O91U65QNdHukCXaQ9vtADhWCQ328w\",\"auth\":\"EUwdLfgOO5hQJZ8ChWQSnw\"}}');
/*!40000 ALTER TABLE `seller_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `cust_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`cust_id`,`product_id`),
  KEY `cust_id_idx` (`cust_id`),
  KEY `pId_idx` (`product_id`),
  CONSTRAINT `cId` FOREIGN KEY (`cust_id`) REFERENCES `cust_details` (`cId`),
  CONSTRAINT `pId` FOREIGN KEY (`product_id`) REFERENCES `products` (`pId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (800003,50070),(800003,50072),(800003,50091),(800006,50058),(800006,50062),(800006,50119),(800006,50121);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-18 16:01:23
