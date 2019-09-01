-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 01-Mar-2018 às 16:57
-- Versão do servidor: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paf`
--
CREATE DATABASE IF NOT EXISTS `paf` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `paf`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `centro_custo`
--

CREATE TABLE `centro_custo` (
  `id` int(11) NOT NULL,
  `centro` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estrutura da tabela `classe_despesa`
--

CREATE TABLE `classe_despesa` (
  `id` int(11) NOT NULL,
  `classe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_despesa`
--

CREATE TABLE `categoria_despesa` (
  `id` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `idClasse` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `despesas`
--

CREATE TABLE `despesas` (
  `id` int(11) NOT NULL,
  `idCategoria` int(255) NOT NULL,
  `idClasse` int(255) NOT NULL,
  `idCentro` int(255) NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `data_operacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
--
-- Estrutura da tabela `classe_despesa`
--

CREATE TABLE `classe_receita` (
  `id` int(11) NOT NULL,
  `classe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_despesa`
--

CREATE TABLE `categoria_receita` (
  `id` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `idClasse` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `despesas`
--

CREATE TABLE `receitas` (
  `id` int(11) NOT NULL,
  `idCategoria` int(255) NOT NULL,
  `idClasse` int(255) NOT NULL,
  `idCentro` int(255) NOT NULL,
  `valor` decimal(9,2) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `data` date NOT NULL,
  `data_operacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `privilegio`
--

CREATE TABLE `privilegio` (
  `id` int(11) NOT NULL,
  `nomePrivilegio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `privilegio`
--

INSERT INTO `privilegio` (`id`, `nomePrivilegio`) VALUES
(1, 'Administrador'),
(2, 'Funcionário');

-- --------------------------------------------------------

--
-- Estrutura da tabela `statususuario`
--

CREATE TABLE `statususuario` (
  `id` int(11) NOT NULL,
  `nomeStatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `statususuario`
--

INSERT INTO `statususuario` (`id`, `nomeStatus`) VALUES
(2, 'PENDENTE'),
(3, 'EM OPERAÇÃO'),
(4, 'CONCLUSO'),
(5, 'FINALIZADO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `idStatus` int(11) NOT NULL,
  `idPrivilegio` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `idStatus`, `idPrivilegio`) VALUES
(1, 'teste', 'teste@teste.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1, 1),
(2, 'Gugu', 'gug@gug.com', 'bc34801422fb2bf02e54b0ed838056be57574643', 1, 2),
(3, 'vini', 'vini@THE.KID', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centro_custo`
--
ALTER TABLE `centro_custo`
  ADD PRIMARY KEY (`id`);
--
-- Indexes for table `classe_despesa`
--
ALTER TABLE `classe_despesa`
  ADD PRIMARY KEY (`id`);
--
-- Indexes for table `categoria_despesa`
--
ALTER TABLE `categoria_despesa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `despesas`
--
ALTER TABLE `despesas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classe_receita`
--
ALTER TABLE `classe_receita`
  ADD PRIMARY KEY (`id`);
--
-- Indexes for table `categoria_receita`
--
ALTER TABLE `categoria_receita`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receitas`
--
ALTER TABLE `receitas`
  ADD PRIMARY KEY (`id`);
--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statususuario`
--
ALTER TABLE `statususuario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uc_usuario` (`email`),
  ADD KEY `idPrivilegio` (`idPrivilegio`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `centro_custo`
--
ALTER TABLE `centro_custo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `classe_despesa`
--
ALTER TABLE `classe_despesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `categoria_despesa`
--
ALTER TABLE `categoria_despesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `planejamento`
--
ALTER TABLE `despesas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `classe_receita`
--
ALTER TABLE `classe_receita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `categoria_receita`
--
ALTER TABLE `categoria_receita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `statususuario`
--
ALTER TABLE `statususuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `idPrivilegio` FOREIGN KEY (`idPrivilegio`) REFERENCES `privilegio` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
