CREATE DATABASE  IF NOT EXISTS `busmanagement` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `busmanagement`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: busmanagement
-- ------------------------------------------------------
-- Server version   5.7.16-log
 
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
 
--
-- Table structure for table `admin`
--
 
DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `admin`
--
 
LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'quang.td95@gmail.com','$2a$10$JP5k4wwZG/8t/7X/lH6RJOR.hV2oKwBSci5QbJH6T8vISCc4CoPqu');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;
 
--
-- Table structure for table `bus_route`
--
 
DROP TABLE IF EXISTS `bus_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus_route` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SOURCE` varchar(256) NOT NULL,
  `DESTINATION` varchar(256) NOT NULL,
  `DEPARTURE_TIME` datetime NOT NULL,
  `ARRIVAL_TIME` datetime NOT NULL,
  `REMAINING_TICKETS` int(11) NOT NULL,
  `TOTAL_TICKETS` int(11) NOT NULL,
  `TICKET_PRICE` int(11) NOT NULL,
  `BUS_SERVICE_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FKel73txp0i3e6aaf4mn0jbuy88` (`BUS_SERVICE_ID`),
  CONSTRAINT `FKel73txp0i3e6aaf4mn0jbuy88` FOREIGN KEY (`BUS_SERVICE_ID`) REFERENCES `bus_service` (`ID`),
  CONSTRAINT `bus_route_ibfk_1` FOREIGN KEY (`BUS_SERVICE_ID`) REFERENCES `bus_service` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `bus_route`
--
 
LOCK TABLES `bus_route` WRITE;
/*!40000 ALTER TABLE `bus_route` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_route` ENABLE KEYS */;
UNLOCK TABLES;
 
--
-- Table structure for table `bus_service`
--
 
DROP TABLE IF EXISTS `bus_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bus_service` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) NOT NULL,
  `PHONE` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `bus_service`
--
 
LOCK TABLES `bus_service` WRITE;
/*!40000 ALTER TABLE `bus_service` DISABLE KEYS */;
/*!40000 ALTER TABLE `bus_service` ENABLE KEYS */;
UNLOCK TABLES;
 
--
-- Table structure for table `ticket`
--
 
DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) NOT NULL,
  `SEAT_ID` int(11) NOT NULL,
  `PAYMENT_METHOD` varchar(20) NOT NULL,
  `STATUS` int(11) NOT NULL,
  `BUS_ROUTE_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK2ns1hntuiw2m98ys5v0uwh9xn` (`BUS_ROUTE_ID`),
  CONSTRAINT `FK2ns1hntuiw2m98ys5v0uwh9xn` FOREIGN KEY (`BUS_ROUTE_ID`) REFERENCES `bus_route` (`ID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`BUS_ROUTE_ID`) REFERENCES `bus_route` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `ticket`
--
 
LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
 
--
-- Table structure for table `transaction`
--
 
DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AMOUNT` int(11) NOT NULL,
  `FROM_ACCOUNT` varchar(20) NOT NULL,
  `TO_ACCOUNT` varchar(20) NOT NULL,
  `TICKET_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK1h80y2m3jm1y34o3ifu27hvhu` (`TICKET_ID`),
  CONSTRAINT `FK1h80y2m3jm1y34o3ifu27hvhu` FOREIGN KEY (`TICKET_ID`) REFERENCES `ticket` (`ID`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`TICKET_ID`) REFERENCES `ticket` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
 
--
-- Dumping data for table `transaction`
--
 
LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
 
-- Dump completed
 
INSERT INTO `bus_service` (ID, NAME, PHONE)
VALUES
(1, 'ABC', '0511.3696969'),
(2, 'WTF', '0511.3696969'),
(3, 'DEF', '0511.3696969'),
(4, 'ASB', '0511.3696969');
 
INSERT INTO `bus_route` (ID, SOURCE, DESTINATION, DEPARTURE_TIME, ARRIVAL_TIME, REMAINING_TICKETS, TOTAL_TICKETS, TICKET_PRICE, BUS_SERVICE_ID)
VALUES
(1, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Sài Gòn-Bến xe Miền Đông', '2017-04-24T14:00:00.000', '2017-04-24T15:00:00.000', 1, 25, 355000, 1),
(2, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Khánh Hoà-Bến xe Khánh Hoà', '2017-04-24T19:00:00.000', '2017-04-24T20:00:00.000', 1, 25, 255000, 2),
(3, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Sài Gòn-Bến xe Miền Đông', '2017-04-24T14:00:00.000', '2017-04-24T15:00:00.000', 1, 25, 355000, 3),
(4, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Khánh Hoà-Bến xe Khánh Hoà', '2017-04-24T19:00:00.000', '2017-04-24T20:00:00.000', 1, 25, 255000, 4),
(5, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Sài Gòn-Bến xe Miền Đông', '2017-04-24T14:00:00.000', '2017-04-24T15:00:00.000', 1, 25, 60000, 1),
(6, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Khánh Hoà-Bến xe Khánh Hoà', '2017-04-24T19:00:00.000', '2017-04-24T20:00:00.000', 1, 25, 255000, 3),
(7, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Sài Gòn-Bến xe Miền Đông', '2017-04-24T14:00:00.000', '2017-04-24T15:00:00.000', 1, 25, 60000, 1),
(8, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Khánh Hoà-Bến xe Khánh Hoà', '2017-04-24T19:00:00.000', '2017-04-24T20:00:00.000', 1, 25, 255000, 2),
(9, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Sài Gòn-Bến xe Miền Đông', '2017-04-24T14:00:00.000', '2017-04-24T15:00:00.000', 1, 25, 60000, 1),
(10, 'Đà Nẵng-Bến xe TT Đà nẵng', 'Khánh Hoà-Bến xe Khánh Hoà', '2017-04-24T19:00:00.000', '2017-04-24T20:00:00.000', 1, 25, 255000, 2);
