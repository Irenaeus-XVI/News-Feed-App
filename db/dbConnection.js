import mongoose from "mongoose";
export const connection = () => {
    mongoose.connect(process.env.DATA_BASE_URL).then(() => console.log('Db Connected')
    ).catch(err => console.log("Error", err)
    );
}