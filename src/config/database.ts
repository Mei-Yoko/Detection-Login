import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
    try{
        // ดึง MongoDB URI
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/secure_login_db';
        // เชื่อมต่อกับ MongoDB
        const conn = await mongoose.connect(mongoUri);

        console.log(`MongoDB Connect: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);

        //event listen
        mongoose.connection.on('error', (err) => {
            console.log('Mongo Connection Error', err);
        });

        mongoose.connection.on('disconnected',() => {
            console.log('Mongo Disconected');
        });

        process.on('SIGINT', async () =>{
            await mongoose.connection.close();
            console.log('Mongo Shutdown by terminal');
            process.exit(0);
        });
    }catch (error){
        console.log('Mongo error',error);
        process.exit(1);
    }
};

//ใช่เมื่อปิด mongo,ตัดการเชื่อมต่อ
export const disconnectDatabase = async (): Promise<void> => {
        try{
            await mongoose.connection.close();
            console.log('Mongo Disconnected Success');
        }catch(error){
            console.log('Error Mongo Disconnected ',error);
            throw error;
        }     
    };
