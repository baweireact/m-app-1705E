/*
Navicat MySQL Data Transfer

Source Server         : xu
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : demo

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2019-09-30 12:09:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('001', 'admin', '123456');
INSERT INTO `user` VALUES ('002', 'newss', '666');
INSERT INTO `user` VALUES ('003', 'xutongbao', '123456');
INSERT INTO `user` VALUES ('361bcc30-e324-11e9-84e0-21e3a7472a91', 'b', '123');
INSERT INTO `user` VALUES ('405faa90-e324-11e9-84e0-21e3a7472a91', 'c', '123');
INSERT INTO `user` VALUES ('607b88e0-e323-11e9-bf39-e749238a098a', 'a', '123');
INSERT INTO `user` VALUES ('99e4f3f0-e323-11e9-bf39-e749238a098a', 'a', '123');
INSERT INTO `user` VALUES ('f29994f0-e324-11e9-b522-c5b8434a44d4', 'd', '123');
