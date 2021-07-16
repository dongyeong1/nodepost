-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: nodedong
-- ------------------------------------------------------
-- Server version	10.5.10-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `nodedong`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nodedong` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `nodedong`;

--
-- Table structure for table `answerposts`
--

DROP TABLE IF EXISTS `answerposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answerposts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(140) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `answerposts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answerposts_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answerposts`
--

LOCK TABLES `answerposts` WRITE;
/*!40000 ALTER TABLE `answerposts` DISABLE KEYS */;
INSERT INTO `answerposts` VALUES (16,'ㅇ',NULL,'2021-06-12 04:54:56','2021-06-12 04:54:56',16,NULL),(17,'g',NULL,'2021-06-11 19:28:48','2021-06-11 19:28:48',16,NULL),(18,'d',NULL,'2021-06-12 05:51:33','2021-06-12 05:51:33',16,NULL),(19,'d',NULL,'2021-06-12 05:54:51','2021-06-12 05:54:51',16,NULL),(20,'dfg',NULL,'2021-06-12 06:00:49','2021-06-12 06:00:49',16,NULL),(21,'f',NULL,'2021-06-12 06:12:26','2021-06-12 06:12:26',16,NULL),(22,'dsfsd',NULL,'2021-06-12 06:15:36','2021-06-12 06:15:36',16,NULL),(23,'h',NULL,'2021-06-12 06:16:28','2021-06-12 06:16:28',16,NULL),(24,'hhjh',NULL,'2021-06-12 06:17:09','2021-06-12 06:17:09',16,NULL),(25,'dd',NULL,'2021-06-12 06:25:05','2021-06-12 06:25:05',16,NULL),(26,'dd',NULL,'2021-06-12 06:26:29','2021-06-12 06:26:29',16,NULL),(27,'d',NULL,'2021-06-12 06:27:36','2021-06-12 06:27:36',16,NULL),(28,'네',NULL,'2021-06-12 06:27:48','2021-06-12 06:27:48',16,NULL),(29,'네',NULL,'2021-06-12 06:29:43','2021-06-12 06:29:43',16,NULL),(30,'네',NULL,'2021-06-12 06:29:54','2021-06-12 06:29:54',16,NULL),(31,'안녕',NULL,'2021-06-12 12:59:39','2021-06-12 12:59:39',16,NULL),(32,'2입니다',NULL,'2021-06-13 06:10:11','2021-06-13 06:10:11',16,52);
/*!40000 ALTER TABLE `answerposts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `followingId` int(11) NOT NULL,
  `followerId` int(11) NOT NULL,
  PRIMARY KEY (`followingId`,`followerId`),
  KEY `followerId` (`followerId`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`followingId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtags`
--

DROP TABLE IF EXISTS `hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hashtags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtags`
--

LOCK TABLES `hashtags` WRITE;
/*!40000 ALTER TABLE `hashtags` DISABLE KEYS */;
/*!40000 ALTER TABLE `hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `homeposts`
--

DROP TABLE IF EXISTS `homeposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `homeposts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(140) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `homeposts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homeposts`
--

LOCK TABLES `homeposts` WRITE;
/*!40000 ALTER TABLE `homeposts` DISABLE KEYS */;
INSERT INTO `homeposts` VALUES (5,'멋져요!',NULL,'2021-06-13 06:09:19','2021-06-13 06:09:19',17),(6,'대박!',NULL,'2021-06-13 06:11:47','2021-06-13 06:11:47',17);
/*!40000 ALTER TABLE `homeposts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hukuokaposts`
--

DROP TABLE IF EXISTS `hukuokaposts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hukuokaposts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(140) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `hukuokaposts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hukuokaposts`
--

LOCK TABLES `hukuokaposts` WRITE;
/*!40000 ALTER TABLE `hukuokaposts` DISABLE KEYS */;
INSERT INTO `hukuokaposts` VALUES (9,'영진전문대 대단하네요!!',NULL,'2021-06-13 06:09:29','2021-06-13 06:22:48',17);
/*!40000 ALTER TABLE `hukuokaposts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posthashtag`
--

DROP TABLE IF EXISTS `posthashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posthashtag` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) NOT NULL,
  `HashtagId` int(11) NOT NULL,
  PRIMARY KEY (`PostId`,`HashtagId`),
  KEY `HashtagId` (`HashtagId`),
  CONSTRAINT `posthashtag_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posthashtag_ibfk_2` FOREIGN KEY (`HashtagId`) REFERENCES `hashtags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posthashtag`
--

LOCK TABLES `posthashtag` WRITE;
/*!40000 ALTER TABLE `posthashtag` DISABLE KEYS */;
/*!40000 ALTER TABLE `posthashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(140) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (52,'1+1은 뭐에요?',NULL,'2021-06-13 06:09:53','2021-06-13 06:09:53',17),(54,'ㄴㄴ',NULL,'2021-06-14 06:04:17','2021-06-14 06:04:22',17);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(40) DEFAULT NULL,
  `nick` varchar(15) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `provider` varchar(10) NOT NULL DEFAULT 'local',
  `snsId` varchar(30) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (16,'master@naver.com','dongmaster','$2b$12$PLYI95uY0z77MpMll3jWfe9eS5P6VO2V3Pf.sDlzEBWiA1slivTCK','local',NULL,'2021-06-11 16:00:39','2021-06-11 16:00:39',NULL),(17,'asd@naver.com','userdong','$2b$12$1N.0sWcUBLEb5xjKV.3Wm.8qBTQXt9QZsPkETFocQZXieD8PI2Vwe','local',NULL,'2021-06-11 16:01:46','2021-06-11 16:01:46',NULL);
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

-- Dump completed on 2021-06-14 21:11:38
