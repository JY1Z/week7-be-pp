const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const jobs = require('./data/jobs.js');
const User = require('./models/userModel.js');
const Job = require('./models/jobModel.js');
const connectDB = require('./config/db.js');

dotenv.config();  // 加载环境变量

connectDB();  // 连接数据库

const importData = async () => {
  try {
    // 清空数据库中的现有数据
    await Job.deleteMany();
    await User.deleteMany();

    // 插入用户数据
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;  // 假设第一个用户是管理员

    // 将 jobs 数据和 adminUser 关联
    const sampleJobs = jobs.map((job) => {
      return { ...job, user_id: adminUser };
    });

    // 插入职位数据
    await Job.insertMany(sampleJobs);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // 删除所有数据
    await Job.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// 根据命令行参数判断是导入数据还是删除数据
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}


// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import colors from 'colors';
// import users from './data/users.js'; // 你的用户数据
// import jobs from './data/jobs.js';   // 你的职位数据
// import User from './models/userModel.js';  // 用户模型
// import Job from './models/jobModel.js';    // 职位模型
// import connectDB from './config/db.js';    // 数据库连接配置

// dotenv.config();

// connectDB();

// const importData = async () => {
//   try {
//     // 清空数据库中的现有数据
//     await Job.deleteMany();
//     await User.deleteMany();

//     // 插入用户数据
//     const createdUsers = await User.insertMany(users);
//     const adminUser = createdUsers[0]._id;  // 假设第一个用户是管理员

//     // 将 jobs 数据和 adminUser 关联
//     const sampleJobs = jobs.map((job) => {
//       return { ...job, user: adminUser };
//     });

//     // 插入职位数据
//     await Job.insertMany(sampleJobs);

//     console.log('Data Imported!'.green.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     // 删除所有数据
//     await Job.deleteMany();
//     await User.deleteMany();

//     console.log('Data Destroyed!'.red.inverse);
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// // 根据命令行参数判断是导入数据还是删除数据
// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }
