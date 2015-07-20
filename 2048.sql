-- MySQL dump 10.13  Distrib 5.5.40, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 2048
-- ------------------------------------------------------
-- Server version	5.5.40-0ubuntu0.12.04.1

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
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (3,'1212121',1),(4,'IVAN',1),(5,'Ivan',1),(6,'Ivan',1),(7,'',1),(8,'Ivan',1),(9,'1212',1),(10,'Ivanich',1),(11,'',1),(12,'Ivan',1),(13,'123',1),(14,'',1),(15,'123',1),(16,'Ivan',1),(17,'Ivan',1),(18,'Ivan2',1),(19,'',1),(20,'Ivan',1),(21,'Ivan 2',1),(22,'Ivan 3',1),(23,'masha',1),(24,'Ivan test',1),(25,'Ivan',1),(26,'Ivan',1),(27,'',1),(28,'Ivan',1),(29,'Ivan',1),(30,'Icvanich',1),(31,'Ivanich',1),(32,'Ivan',1),(33,'Ivan',1),(34,'Ivan',1),(35,'Ivan2',1),(36,'Ivan',1),(37,'Test',1),(38,'2048 manjac',1),(39,'I wanna more than 20000 pts',1),(40,'Ivan 2048',1),(41,'',1),(42,'Test',1),(43,'Ivan',1),(44,'',1),(45,'123',1),(46,'Test2',1),(47,'Ivan',1),(48,'Test 3',1),(49,'ivan IV',1),(50,'ivan IV',1),(51,'Vlad',1),(52,'<h1>ggg',1),(53,'Vlad',1),(54,'hhh',1),(55,'',1),(56,'',1),(57,'',1),(58,'',1),(59,'<script>alert(1)</script>',1),(60,'123',1),(61,'1234',1),(62,'1212121',1),(63,'87878',1),(64,'121212121',1),(65,'rrr',1),(66,'sss',1),(67,'sss',1),(68,'sss',1),(69,'111',1),(70,'test',1),(71,'ivan test',1),(72,'test test',1),(73,'123',1),(74,'ivan force rendering test',1);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `data` text NOT NULL,
  `score` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `loose` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (1,'1234','',56,25,0),(2,'123','[[0,0,0,0],[1,0,0,0],[3,1,0,0],[4,2,2,0]]',64,26,0),(3,'Saving 2','[[0,0,0,0],[0,0,0,0],[1,0,0,1],[3,1,0,0]]',16,28,0),(4,'Saving 3','[[0,0,0,0],[2,0,0,0],[3,2,0,0],[4,3,1,1]]',80,28,0),(5,'Saving 4','[[2,0,0,0],[3,1,0,0],[4,3,2,0],[5,4,3,1]]',256,28,0),(6,'','[[1,3,2,1],[2,1,5,3],[3,5,4,2],[1,2,1,1]]',352,29,1),(7,'','[[1,3,2,1],[2,1,5,3],[3,5,4,2],[2,2,3,1]]',372,29,1),(8,'','[[2,2,1,1],[3,6,4,2],[4,5,2,4],[1,2,3,1]]',628,29,1),(9,'','[[1,3,2,1],[1,4,3,1],[2,6,4,2],[1,2,3,2]]',468,34,1),(10,'','[[2,2,2,1],[3,3,3,2],[2,4,4,3],[7,6,1,1]]',1212,37,1),(11,'','[[2,1,3,1],[3,5,4,2],[4,6,5,4],[6,4,2,1]]',1064,38,1),(12,'','[[2,1,2,1],[4,2,1,2],[5,6,7,4],[9,2,6,5]]',5736,39,1),(13,'','[[3,5,3,1],[9,4,1,3],[1,2,7,2],[4,1,3,2]]',5032,40,1),(14,'','[[1,2,1,2],[2,10,3,5],[3,8,5,1],[1,2,1,2]]',11028,42,1),(15,'','[[1,2,1,2],[2,10,3,5],[3,8,5,1],[1,2,1,2]]',11028,42,1),(16,'','[[1,2,1,2],[3,4,3,1],[5,3,1,3],[6,5,3,1]]',584,46,1),(17,'super saving','[[0,0,0,0],[2,0,0,0],[3,0,0,0],[5,4,1,0]]',188,49,0),(18,'super saving','[[0,0,0,1],[0,0,0,0],[1,1,0,0],[2,2,0,0]]',4,50,0),(19,'','[[2,1,3,1],[3,5,4,2],[4,6,5,4],[6,4,2,1]]',1064,38,1),(20,'qqq1','[[4,1,2,1],[2,4,1,0],[5,2,1,0],[4,0,0,0]]',268,51,0),(21,'','[[1,4,2,2],[2,6,5,3],[7,3,2,2],[3,2,1,1]]',1300,52,1),(22,'','[[2,1,2,1],[5,3,1,2],[6,5,3,1],[4,3,2,1]]',648,53,1),(23,'<h1>save1','[[0,0,0,0],[0,0,0,0],[0,1,0,0],[2,2,0,2]]',4,54,0),(24,'','[[4,3,1,2],[6,4,3,2],[4,5,4,3],[1,4,3,1]]',704,55,1),(25,'','[[4,3,1,2],[6,4,3,2],[4,5,4,3],[1,4,3,1]]',704,55,1),(26,'','[[3,2,2,2],[4,3,3,1],[6,5,5,4],[4,6,1,1]]',1048,56,1),(27,'','[[1,2,1,1],[3,3,2,2],[1,2,3,3],[2,1,2,1]]',72,57,1),(28,'','[[1,2,3,2],[5,3,1,2],[6,4,3,2],[2,3,2,1]]',536,58,1),(29,'continued Vlad game','[[2,1,0,0],[3,4,1,0],[2,1,2,0],[7,2,5,1]]',948,51,0),(30,'','[[3,1,6,1],[6,3,1,4],[8,4,9,1],[1,1,3,2]]',6496,59,1),(31,'','{\"0\":[1,5,3,2],\"1\":[2,7,1,4],\"2\":[3,1,4,2],\"3\":[5,2,3,1]}',2564,60,1),(32,'','{\"0\":[4,3,1,2],\"1\":[5,4,3,4],\"2\":[3,2,4,3],\"3\":[2,1,3,2]}',372,63,1),(33,'','{\"0\":[1,4,2,1],\"1\":[2,6,5,4],\"2\":[3,5,7,3],\"3\":[2,3,5,1]}',1592,69,1),(34,'','{\"0\":[1,4,3,1],\"1\":[2,7,5,2],\"2\":[3,2,4,3],\"3\":[2,5,3,1]}',1128,70,1),(35,'','{\"0\":[1,3,2,1],\"1\":[2,5,3,2],\"2\":[5,7,5,4],\"3\":[2,1,2,1]}',1204,71,1),(36,'','{\"0\":[1,4,1,2],\"1\":[8,3,5,3],\"2\":[1,5,3,2],\"3\":[4,3,2,1]}',2156,72,1),(37,'','{\"0\":[1,5,3,2],\"1\":[2,1,5,1],\"2\":[5,6,4,3],\"3\":[1,2,3,1]}',772,73,1),(38,'','{\"0\":[2,4,2,1],\"1\":[1,7,8,2],\"2\":[5,3,4,1],\"3\":[3,1,5,2]}',2880,74,1);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'OLD_user');
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

-- Dump completed on 2015-07-20 23:48:02
