/*
 Navicat Premium Data Transfer

 Source Server         : adminMysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : scoremang

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 26/04/2022 17:14:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userscore
-- ----------------------------
DROP TABLE IF EXISTS `userscore`;
CREATE TABLE `userscore`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `studentnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `power` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `score` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `scoredate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = ujis COLLATE = ujis_japanese_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userscore
-- ----------------------------
INSERT INTO `userscore` VALUES (7, 21, '湖南科技大学111111111111', '1804020109', '2', '5', '80', '2022-03-30 16:03');
INSERT INTO `userscore` VALUES (8, 22, '2', '2', '2', '2', '80', '2022-03-30 16:04');
INSERT INTO `userscore` VALUES (9, NULL, '3', '3', '2', '3', '70', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (10, NULL, '4', '4', '2', '4', '90', '2022-03-29 16:04');
INSERT INTO `userscore` VALUES (11, NULL, '5', '5', '2', '5', '89', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (12, NULL, '6', '6', '2', '6', '76', '');
INSERT INTO `userscore` VALUES (13, NULL, '7', '7', '2', '7', '60', NULL);
INSERT INTO `userscore` VALUES (14, NULL, '8', '8', '2', '8', '40', NULL);
INSERT INTO `userscore` VALUES (15, NULL, '9', '9', '2', '9', '60', NULL);
INSERT INTO `userscore` VALUES (16, NULL, '10', '10', '2', '10', '50', NULL);
INSERT INTO `userscore` VALUES (17, NULL, '11', '11', '2', '11', '69', NULL);
INSERT INTO `userscore` VALUES (18, NULL, '12', '12', '2', '10', '80', '10');
INSERT INTO `userscore` VALUES (19, NULL, '16', '13', '2', '11', '90', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (20, NULL, '16', '14', '2', '10', '100', '2022-03-31 12:04');
INSERT INTO `userscore` VALUES (21, NULL, '17', '15', '2', '11', '40', '11');
INSERT INTO `userscore` VALUES (22, NULL, '16', '16', '2', '10', '100', '2022-03-31 11:04');
INSERT INTO `userscore` VALUES (23, NULL, '17', '17', '2', '11', '0', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (24, NULL, '16', '18', '2', '10', '0', '2022-03-31 10:04');
INSERT INTO `userscore` VALUES (25, NULL, '17', '19', '2', '11', '10', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (26, NULL, '18', '18', '1', '18', '10', '2022-03-31 15:04');
INSERT INTO `userscore` VALUES (27, NULL, '12', '323', '2', '213', '80', '2022-03-31 16:04');
INSERT INTO `userscore` VALUES (28, NULL, '16', '1', '1', '1', '1', NULL);
INSERT INTO `userscore` VALUES (29, NULL, '16', '1', '1', '1', '1', NULL);
INSERT INTO `userscore` VALUES (30, NULL, '16', '2', '2', '4', '6', NULL);
INSERT INTO `userscore` VALUES (31, NULL, '16', '43', '2', '543', '54', NULL);
INSERT INTO `userscore` VALUES (32, NULL, '16', '16', '2', '16', '90', NULL);
INSERT INTO `userscore` VALUES (33, NULL, '16', '15', '2', NULL, '90', NULL);
INSERT INTO `userscore` VALUES (34, NULL, '16', NULL, '2', NULL, '80', NULL);
INSERT INTO `userscore` VALUES (35, NULL, '16', NULL, '2', NULL, '80', NULL);
INSERT INTO `userscore` VALUES (36, NULL, '16', NULL, '2', NULL, '75', NULL);
INSERT INTO `userscore` VALUES (37, 8, '1', 'admin', '0', '1', '60', '2022-04-25 19:15');

-- ----------------------------
-- Table structure for usertable
-- ----------------------------
DROP TABLE IF EXISTS `usertable`;
CREATE TABLE `usertable`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `studentnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `power` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usertable
-- ----------------------------
INSERT INTO `usertable` VALUES (1, '湖南科技大学', '1804020109', '彭宇祥', '1732589810', 1);
INSERT INTO `usertable` VALUES (2, '湖南科技大学', '1', '1', '1', 1);
INSERT INTO `usertable` VALUES (6, '湖南科技大学', '2', '2', '2', 2);
INSERT INTO `usertable` VALUES (8, '1', 'admin', '1', '1', 0);
INSERT INTO `usertable` VALUES (21, '5', '5', '5', '5', 2);
INSERT INTO `usertable` VALUES (22, '2', '2', '2', '2', 2);
INSERT INTO `usertable` VALUES (23, '16', '1', '1', '1', 1);

SET FOREIGN_KEY_CHECKS = 1;
