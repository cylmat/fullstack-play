-- ---------------
-- CREATE TABLE --
-- ---------------

CREATE TABLE IF NOT EXISTS `my_table6` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO my_table6 VALUES(1,'record one'), (2,'record two');

-- -------------
-- BLACK HOLE --
-- -------------

CREATE TABLE IF NOT EXISTS `my_black_hole` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=BLACKHOLE DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO test VALUES(1,'record one'), (2,'record two');