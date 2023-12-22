const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) console.log('DB connect successfully');
        else console.log('DB connection failed');
    } catch (error) {
        console.log('DB connect is failed');
        throw new Error(error);
    }
};

// const newSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         require: true
//     },
//     user: {
//         type: String,
//         require: true
//     },
//     password: {
//         type: String,
//         require: true
//     },
//     phone: {
//         type: String,
//         require: false
//     }
// })

// const collection = mongoose.model("collection", newSchema)

module.exports = dbConnect;
