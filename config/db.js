import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Base de datos conectada con éxito')
    } catch (error) {
        console.error('Error al conectar la base de datos:', error.message)
    }
}

export default connectDB