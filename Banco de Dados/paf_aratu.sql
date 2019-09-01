CREATE DATABASE  IF NOT EXISTS `paf` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `paf`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: paf
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `opcoes`
--

DROP TABLE IF EXISTS `opcoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `opcoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `valor` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcoes`
--

LOCK TABLES `opcoes` WRITE;
/*!40000 ALTER TABLE `opcoes` DISABLE KEYS */;
INSERT INTO `opcoes` VALUES (1,'SIM'),(2,'NÃO'),(3,'VERDE'),(4,'AZUL'),(5,'VERMELHO'),(6,'AMARELO');
/*!40000 ALTER TABLE `opcoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `valor` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio`
--

DROP TABLE IF EXISTS `privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `privilegio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomePrivilegio` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio`
--

LOCK TABLES `privilegio` WRITE;
/*!40000 ALTER TABLE `privilegio` DISABLE KEYS */;
INSERT INTO `privilegio` VALUES (1,'Administrador'),(2,'Funcionário');
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `valor` decimal(8,2) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `quantidade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'INGRESSO CINEMA',50.00,'Par de Ingressos para o Cinema Mais Incrível da sua Vida',23),(2,'INGRESSO TEATRO',60.00,'Par de Ingressos Para o Teatro mais Incrivel e Emocionante da Sua Vida',32),(3,'VOUCHER LANCHE GOSTOSO',30.00,'Lanche Grátis Gostoso, todo mundo vai adorar',18);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programas`
--

DROP TABLE IF EXISTS `programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `programas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fim` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
INSERT INTO `programas` VALUES (2,' Que Venha o Povo','08:00:00','09:00:00'),(3,'VOCÊ QUER CASAR?','09:00:00','10:00:00'),(4,'VOCÊ CURTE ROCK?','10:00:00','11:00:00');
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respostas`
--

DROP TABLE IF EXISTS `respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `respostas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `id_opcao` int(11) DEFAULT NULL,
  `id_tipo_resposta` int(11) DEFAULT NULL,
  `id_programa` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respostas`
--

LOCK TABLES `respostas` WRITE;
/*!40000 ALTER TABLE `respostas` DISABLE KEYS */;
INSERT INTO `respostas` VALUES (6,1,1,6,2,'2019-09-01 01:17:39',NULL),(7,1,1,6,2,'2019-09-01 01:19:00','2019-09-01 01:19:54'),(8,NULL,1,1,2,'2019-09-01 08:13:14','2019-09-01 08:13:14'),(9,1,1,1,2,'2019-09-01 08:13:43','2019-09-01 08:13:43'),(10,1,1,1,2,'2019-09-01 09:24:00','2019-09-01 09:24:00'),(11,1,1,1,2,'2019-09-01 09:24:03','2019-09-01 09:24:03'),(12,1,1,1,2,'2019-09-01 09:24:06','2019-09-01 09:24:06'),(13,1,1,1,2,'2019-09-01 09:24:31','2019-09-01 09:24:31');
/*!40000 ALTER TABLE `respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statususuario`
--

DROP TABLE IF EXISTS `statususuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `statususuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomeStatus` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statususuario`
--

LOCK TABLES `statususuario` WRITE;
/*!40000 ALTER TABLE `statususuario` DISABLE KEYS */;
INSERT INTO `statususuario` VALUES (2,'PENDENTE'),(3,'EM OPERAÇÃO'),(4,'CONCLUSO'),(5,'FINALIZADO');
/*!40000 ALTER TABLE `statususuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_respostas`
--

DROP TABLE IF EXISTS `tipos_respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tipos_respostas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_respostas`
--

LOCK TABLES `tipos_respostas` WRITE;
/*!40000 ALTER TABLE `tipos_respostas` DISABLE KEYS */;
INSERT INTO `tipos_respostas` VALUES (6,'SIM OU NÃO');
/*!40000 ALTER TABLE `tipos_respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_respostas_opcoes`
--

DROP TABLE IF EXISTS `tipos_respostas_opcoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tipos_respostas_opcoes` (
  `id_tipos_respostas` int(11) NOT NULL,
  `id_opcoes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_respostas_opcoes`
--

LOCK TABLES `tipos_respostas_opcoes` WRITE;
/*!40000 ALTER TABLE `tipos_respostas_opcoes` DISABLE KEYS */;
INSERT INTO `tipos_respostas_opcoes` VALUES (4,2),(4,1),(6,2),(6,1);
/*!40000 ALTER TABLE `tipos_respostas_opcoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoes`
--

DROP TABLE IF EXISTS `transacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pergunta` int(11) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `valor` decimal(8,2) DEFAULT NULL,
  `id_resposta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoes`
--

LOCK TABLES `transacoes` WRITE;
/*!40000 ALTER TABLE `transacoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `idStatus` int(11) NOT NULL,
  `idPrivilegio` int(11) NOT NULL DEFAULT '0',
  `saldo` decimal(8,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_usuario` (`email`),
  KEY `idPrivilegio` (`idPrivilegio`),
  CONSTRAINT `idPrivilegio` FOREIGN KEY (`idPrivilegio`) REFERENCES `privilegio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Vinicius','teste@teste.com','40bd001563085fc35165329ea1ff5c5ecbdbbeef',1,1,220.00),(2,'Gugu','gug@gug.com','bc34801422fb2bf02e54b0ed838056be57574643',1,2,0.00),(3,'vini','vini@THE.KID','40bd001563085fc35165329ea1ff5c5ecbdbbeef',1,1,0.00);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-01  9:28:31
