import mongoose from 'mongoose';


const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.DB_HOST);
        console.log(`mongoDB connected: ${conn.connection.host}`);

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

export { connectDB };