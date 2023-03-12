-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` CHAR(50) NOT NULL,
    `password` CHAR(100) NOT NULL,
    `avatar` CHAR(100) NULL,
    `github` CHAR(100) NULL,
    `douyin` CHAR(100) NULL,
    `creataTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
