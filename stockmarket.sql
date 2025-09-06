-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Set 06, 2025 alle 04:57
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stockmarket`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `azioni`
--

CREATE TABLE `azioni` (
  `id` int(11) NOT NULL,
  `simbolo` varchar(20) NOT NULL,
  `nome_azienda` varchar(255) NOT NULL,
  `settore` varchar(100) NOT NULL,
  `prezzo_attuale` decimal(10,2) NOT NULL,
  `variazione_percentuale` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `azioni`
--

INSERT INTO `azioni` (`id`, `simbolo`, `nome_azienda`, `settore`, `prezzo_attuale`, `variazione_percentuale`) VALUES
(1, 'AAPL', 'Apple Inc.', 'Technology', 73.10, 2.94),
(2, 'MSFT', 'Microsoft Corporation', 'Technology', 466.84, 4.59),
(3, 'GOOGL', 'Alphabet Inc. (Google)', 'Technology', 135.40, 0.70),
(4, 'AMZN', 'Amazon.com Inc.', 'Consumer Cyclical', 145.89, -1.50),
(5, 'TSLA', 'Tesla Inc.', 'Consumer Cyclical', 255.01, -1.33),
(6, 'JNJ', 'Johnson & Johnson', 'Healthcare', 154.78, -3.56),
(7, 'JPM', 'JPMorgan Chase & Co.', 'Financial Services', 136.53, -0.21),
(8, 'V', 'Visa Inc.', 'Financial Services', 241.18, 4.45),
(9, 'WMT', 'Walmart Inc.', 'Consumer Defensive', 116.09, -4.39),
(10, 'DIS', 'The Walt Disney Company', 'Communication Services', 109.26, -0.90);

-- --------------------------------------------------------

--
-- Struttura della tabella `portafoglio`
--

CREATE TABLE `portafoglio` (
  `id` int(11) NOT NULL,
  `utente_id` int(11) NOT NULL,
  `azione_id` int(11) NOT NULL,
  `quantita` int(11) NOT NULL,
  `prezzo_acquisto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `portafoglio`
--

INSERT INTO `portafoglio` (`id`, `utente_id`, `azione_id`, `quantita`, `prezzo_acquisto`) VALUES
(1, 2, 1, 5, 178.40),
(2, 2, 1, 5, 181.59),
(3, 2, 1, 5, 186.64),
(4, 3, 1, 1, 169.55),
(5, 3, 5, 1, 249.48),
(6, 3, 9, 1, 126.94);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `nome`, `email`, `password_hash`) VALUES
(1, 'late', 'ahah@be.fast', '$2y$10$IaPJMMrbZpS2EktJIl3AQ.mHZgQOKdibwaEkIrtK14jXWHCUpWLze'),
(2, 'testuser', 'test@example.com', '$2y$10$8Il5/ZeV0C9OYZNGEtop3eQVgQB3TWNbhePfQ.b/IrhEWao23g0ce'),
(3, 'banana', 'babbo@morte.lano', '$2y$10$0tqnSEdNWOURvfVd0q2tqu6PKMscy80kK8Fy5yf/1HhMWUDuYCftC');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `azioni`
--
ALTER TABLE `azioni`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `portafoglio`
--
ALTER TABLE `portafoglio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente_id` (`utente_id`),
  ADD KEY `azione_id` (`azione_id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `azioni`
--
ALTER TABLE `azioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `portafoglio`
--
ALTER TABLE `portafoglio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `portafoglio`
--
ALTER TABLE `portafoglio`
  ADD CONSTRAINT `portafoglio_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utenti` (`id`),
  ADD CONSTRAINT `portafoglio_ibfk_2` FOREIGN KEY (`azione_id`) REFERENCES `azioni` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
