--
-- Revised database for alumni app
-- By: Team MagbabagsakanDito
-- Revised by: Hubert F. Espinola I
--

--
-- Database for alumni
--
CREATE TABLE `alumnus_bio` (
  `id` int(30) NOT NULL,
  `name` varchar(200) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `batch` year(4) NOT NULL,
  `course_id` int(30) NOT NULL,
  `email` varchar(250) NOT NULL,
  `avatar` text NOT NULL,
  `employment_status` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0= Unverified, 1= Verified',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `facebook_link` varchar(200) NOT NULL,
  `twitter_link` varchar(200) NOT NULL,
  `linkedin_link` varchar(200) NOT NULL,
  `github_link` varchar(200) NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Courses information
--
CREATE TABLE `courses` (
  `id` int(30) NOT NULL,
  `course` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Accounts information
--
CREATE TABLE `users` (
  `id` int(30) NOT NULL,
  `name` text NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 3 COMMENT '1=Admin,2=Alumni officer, 3=alumnus',
  `auto_generated_pass` text NOT NULL,
  `alumnus_id` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Jobs information
--
CREATE TABLE `jobs` (
  `id` int(30) NOT NULL,
  `header` text NOT NULL,
  `company` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `md_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- News information
--
CREATE TABLE `news` (
  `id` int(30) NOT NULL,
  `header` text NOT NULL,
  `image` varchar(200) NOT NULL,
  `md_content` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Events information
--
CREATE TABLE `events` (
  `id` int(30) NOT NULL,
  `header` text NOT NULL,
  `image` varchar(200) NOT NULL,
  `md_content` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes, IDs, and Increments
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `users`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `courses`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;

ALTER TABLE `alumnus_bio`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `alumnus_bio`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;

ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `jobs`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `news`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `events`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
COMMIT;

--
-- Sample data for user account
--
INSERT INTO users (`id`, `name`, `username`, `password`, `type`, `auto_generated_pass`, `alumnus_id`)
  VALUES ('2', 'Angelo Kenneth E. Amboy', 'harper@g.batstate-u.edu.ph', '3cc93e9a6741d8b40460457139cf8ced', '3', '', '2');

INSERT INTO alumnus_bio (`id`, `name`, `sex`, `batch`, `course_id`, `email`, `avatar`, `employment_status`, `status`, `facebook_link`, `twitter_link`, `linkedin_link`, `github_link`)
  VALUES ('2', 'Angelo Kenneth E. Amboy', 'Male', '2020', '1', 'harper@g.batstate-u.edu.ph', '', 'Unemployed', '1', '#', '#', '#', '#');

--
-- Default admin credentials
--
INSERT INTO users (`id`, `name`, `username`, `password`, `type`, `auto_generated_pass`, `alumnus_id`)
  VALUES ('1', 'admin', 'admin', '0192023a7bbd73250516f069df18b500', '1', '', '1');