/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100311
 Source Host           : localhost:3306
 Source Schema         : lottery

 Target Server Type    : MySQL
 Target Server Version : 100311
 File Encoding         : 65001

 Date: 04/04/2019 12:40:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cs_chromosphere
-- ----------------------------
DROP TABLE IF EXISTS `cs_chromosphere`;
CREATE TABLE `cs_chromosphere`  (
  `id` int(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '序号',
  `issue` int(255) DEFAULT NULL COMMENT '期号',
  `redone` int(255) DEFAULT NULL COMMENT '红球1',
  `redtwo` int(255) DEFAULT NULL COMMENT '红球2',
  `redthree` int(255) DEFAULT NULL COMMENT '红球3',
  `redfour` int(255) DEFAULT NULL COMMENT '红球4',
  `redfive` int(255) DEFAULT NULL COMMENT '红球5',
  `redsex` int(255) DEFAULT NULL COMMENT '红球6',
  `blueone` int(255) DEFAULT NULL COMMENT '蓝球',
  `progressive_prize` varchar(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '奖池奖金(元)',
  `first_prize_num` int(255) DEFAULT NULL COMMENT '一等奖注数',
  `first_prize` varchar(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '一等奖奖金(元)',
  `second_prize_num` int(255) DEFAULT NULL COMMENT '二等奖注数',
  `second_prize` varchar(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '二等奖奖金(元)',
  `sum_num` varchar(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '总投注额(元)',
  `open_prize_date` char(255) CHARACTER SET armscii8 COLLATE armscii8_general_ci DEFAULT NULL COMMENT '开奖日期',
  `reg_date` int(255) DEFAULT NULL COMMENT '时间戳',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2397 CHARACTER SET = armscii8 COLLATE = armscii8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
