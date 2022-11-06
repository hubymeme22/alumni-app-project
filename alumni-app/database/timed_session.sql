-- Timed session for storing session tokens and their properties
CREATE TABLE `session_data` (
    `id` int NOT NULL,
    `new_id` int NOT NULL,
    `user` varchar(200) NOT NULL,
    `pass` varchar(200) NOT NULL,
    `token` varchar(100) NOT NULL,
    `epoch_created` int NOT NULL,
    `sess_stat` boolean NOT NULL DEFAULT 0
);