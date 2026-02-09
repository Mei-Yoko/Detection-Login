"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        // ดึง MongoDB URI
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secure_login_db';
        // เชื่อมต่อกับ MongoDB
        const conn = await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB Connect: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        //event listen
        mongoose_1.default.connection.on('error', (err) => {
            console.log('Mongo Connection Error', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('Mongo Disconected');
        });
        process.on('SIGINT', async () => {
            await mongoose_1.default.connection.close();
            console.log('Mongo Shutdown by terminal');
            process.exit(0);
        });
    }
    catch (error) {
        console.log('Mongo error', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//ใช่เมื่อปิด mongo,ตัดการเชื่อมต่อ
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.connection.close();
        console.log('Mongo Disconnected Success');
    }
    catch (error) {
        console.log('Error Mongo Disconnected ', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
