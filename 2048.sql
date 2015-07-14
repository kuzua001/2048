-- phpMyAdmin SQL Dump
-- version 4.0.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 13, 2015 at 09:06 PM
-- Server version: 5.5.40-0ubuntu0.12.04.1
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `2048`
--
CREATE DATABASE IF NOT EXISTS `2048` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `2048`;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`) VALUES
(3, '1212121'),
(4, 'IVAN'),
(5, 'Ivan'),
(6, 'Ivan'),
(7, ''),
(8, 'Ivan'),
(9, '1212'),
(10, 'Ivanich'),
(11, ''),
(12, 'Ivan'),
(13, '123'),
(14, ''),
(15, '123'),
(16, 'Ivan'),
(17, 'Ivan'),
(18, 'Ivan2'),
(19, ''),
(20, 'Ivan'),
(21, 'Ivan 2'),
(22, 'Ivan 3'),
(23, 'masha'),
(24, 'Ivan test'),
(25, 'Ivan'),
(26, 'Ivan'),
(27, ''),
(28, 'Ivan'),
(29, 'Ivan'),
(30, 'Icvanich'),
(31, 'Ivanich'),
(32, 'Ivan'),
(33, 'Ivan'),
(34, 'Ivan'),
(35, 'Ivan2'),
(36, 'Ivan'),
(37, 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `data` text NOT NULL,
  `score` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `loose` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `name`, `data`, `score`, `game_id`, `loose`) VALUES
(1, '1234', '', 56, 25, 0),
(2, '123', '[[0,0,0,0],[1,0,0,0],[3,1,0,0],[4,2,2,0]]', 64, 26, 0),
(3, 'Saving 2', '[[0,0,0,0],[0,0,0,0],[1,0,0,1],[3,1,0,0]]', 16, 28, 0),
(4, 'Saving 3', '[[0,0,0,0],[2,0,0,0],[3,2,0,0],[4,3,1,1]]', 80, 28, 0),
(5, 'Saving 4', '[[2,0,0,0],[3,1,0,0],[4,3,2,0],[5,4,3,1]]', 256, 28, 0),
(6, '', '[[1,3,2,1],[2,1,5,3],[3,5,4,2],[1,2,1,1]]', 352, 29, 1),
(7, '', '[[1,3,2,1],[2,1,5,3],[3,5,4,2],[2,2,3,1]]', 372, 29, 1),
(8, '', '[[2,2,1,1],[3,6,4,2],[4,5,2,4],[1,2,3,1]]', 628, 29, 1),
(9, '', '[[1,3,2,1],[1,4,3,1],[2,6,4,2],[1,2,3,2]]', 468, 34, 1),
(10, '', '[[2,2,2,1],[3,3,3,2],[2,4,4,3],[7,6,1,1]]', 1212, 37, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
