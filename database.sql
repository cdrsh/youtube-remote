-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.2.9-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных ytchanger
CREATE DATABASE IF NOT EXISTS `ytchanger` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ytchanger`;

-- Дамп структуры для таблица ytchanger.playlist
CREATE TABLE IF NOT EXISTS `playlist` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `num` double DEFAULT NULL,
  `nam` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы ytchanger.playlist: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;

-- Дамп структуры для таблица ytchanger.video
CREATE TABLE IF NOT EXISTS `video` (
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vidid` varchar(255) DEFAULT NULL,
  `vid` varchar(255) DEFAULT NULL,
  `tmstart` varchar(255) DEFAULT NULL,
  `fullscr` double DEFAULT NULL,
  `w` double DEFAULT NULL,
  `h` double DEFAULT NULL,
  `quality` double DEFAULT NULL,
  `autoplay` double DEFAULT NULL,
  `speed` double DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `num` double DEFAULT NULL,
  `idpl` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы ytchanger.video: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
