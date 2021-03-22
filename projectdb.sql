-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2021 at 06:08 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `business_details`
--

CREATE TABLE `business_details` (
  `bId` int(11) NOT NULL,
  `seller` int(11) NOT NULL,
  `bName` varchar(80) NOT NULL,
  `bCategory` varchar(45) NOT NULL,
  `bMobile` int(10) NOT NULL,
  `bGST` varchar(15) NOT NULL,
  `bEmail` varchar(45) NOT NULL,
  `bWebsite` varchar(45) DEFAULT NULL,
  `bAddress` varchar(100) NOT NULL,
  `bCity` varchar(45) NOT NULL,
  `bState` varchar(45) NOT NULL,
  `bZip` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seller_details`
--

CREATE TABLE `seller_details` (
  `sId` int(11) NOT NULL,
  `sName` varchar(45) NOT NULL,
  `sPhoneNo` int(10) NOT NULL,
  `sDOB` date NOT NULL,
  `sGender` char(1) NOT NULL,
  `sAddress` varchar(100) NOT NULL,
  `sCity` varchar(45) NOT NULL,
  `sState` varchar(45) NOT NULL,
  `sZip` int(6) NOT NULL,
  `sAadhar` bigint(20) NOT NULL,
  `sPAN` char(10) NOT NULL,
  `sPassword` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_details`
--
ALTER TABLE `business_details`
  ADD PRIMARY KEY (`bId`),
  ADD UNIQUE KEY `bMobile` (`bMobile`),
  ADD UNIQUE KEY `bGST` (`bGST`),
  ADD UNIQUE KEY `bEmail` (`bEmail`),
  ADD KEY `sellerBusiness` (`seller`);

--
-- Indexes for table `seller_details`
--
ALTER TABLE `seller_details`
  ADD PRIMARY KEY (`sId`),
  ADD UNIQUE KEY `sPhoneNo` (`sPhoneNo`),
  ADD UNIQUE KEY `sAadhar` (`sAadhar`),
  ADD UNIQUE KEY `sPAN` (`sPAN`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business_details`
--
ALTER TABLE `business_details`
  MODIFY `bId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_details`
--
ALTER TABLE `seller_details`
  MODIFY `sId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `business_details`
--
ALTER TABLE `business_details`
  ADD CONSTRAINT `sellerBusiness` FOREIGN KEY (`seller`) REFERENCES `seller_details` (`sId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
