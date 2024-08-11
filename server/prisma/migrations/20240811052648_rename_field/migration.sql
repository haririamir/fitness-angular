/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `category` table. All the data in the column will be lost.
  - The primary key for the `exercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exercise_id` on the `exercise` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - The primary key for the `weeklyprogress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `progress_id` on the `weeklyprogress` table. All the data in the column will be lost.
  - The primary key for the `workout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `workout_id` on the `workout` table. All the data in the column will be lost.
  - The primary key for the `workoutdetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detail_id` on the `workoutdetail` table. All the data in the column will be lost.
  - The primary key for the `workoutplan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `plan_id` on the `workoutplan` table. All the data in the column will be lost.
  - Added the required column `id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `WeeklyProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `WorkoutDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `exercise` DROP FOREIGN KEY `Exercise_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `weeklyprogress` DROP FOREIGN KEY `WeeklyProgress_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `workoutdetail` DROP FOREIGN KEY `WorkoutDetail_exercise_id_fkey`;

-- DropForeignKey
ALTER TABLE `workoutdetail` DROP FOREIGN KEY `WorkoutDetail_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `workoutplan` DROP FOREIGN KEY `WorkoutPlan_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `workoutplan` DROP FOREIGN KEY `WorkoutPlan_workout_id_fkey`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    DROP COLUMN `category_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `exercise` DROP PRIMARY KEY,
    DROP COLUMN `exercise_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `weeklyprogress` DROP PRIMARY KEY,
    DROP COLUMN `progress_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workout` DROP PRIMARY KEY,
    DROP COLUMN `workout_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workoutdetail` DROP PRIMARY KEY,
    DROP COLUMN `detail_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `workoutplan` DROP PRIMARY KEY,
    DROP COLUMN `plan_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutPlan` ADD CONSTRAINT `WorkoutPlan_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutPlan` ADD CONSTRAINT `WorkoutPlan_workout_id_fkey` FOREIGN KEY (`workout_id`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutDetail` ADD CONSTRAINT `WorkoutDetail_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `WorkoutPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkoutDetail` ADD CONSTRAINT `WorkoutDetail_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeeklyProgress` ADD CONSTRAINT `WeeklyProgress_detail_id_fkey` FOREIGN KEY (`detail_id`) REFERENCES `WorkoutDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
