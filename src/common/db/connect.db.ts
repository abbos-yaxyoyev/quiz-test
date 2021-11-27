import { mongoose } from "@typegoose/typegoose";
import fp from "fastify-plugin";
import { MongooseOptions } from "mongoose";

function dbRunCommand() {
    //! add  validator method for db 
    console.log("a :");

    mongoose.connection.db.command({
        collMod: "questions",
        validator: {
            $expr: {
                $or: [
                    {
                        $eq: [
                            {
                                $size: {
                                    $let: {
                                        vars: {
                                            answers: {
                                                $filter: {
                                                    input: "$alternativ",
                                                    cond: {
                                                        $eq: [
                                                            "$$this.isCorrect",
                                                            true
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        in: "$$answers"
                                    }
                                }
                            },
                            1
                        ]
                    },
                    { $eq: ["$type", "multi_answer"] }
                ]
            }
        }
    }, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
}

async function connectToDb() {
    try {
        const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/test_aplication';
        const options: MongooseOptions = {
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
        await mongoose.connect(dbURI, options);
        mongoose.set('debug', true);

        //! add method to question model
        dbRunCommand()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

async function pl(instance, options, next) {
    connectToDb()
    next()
}

export const connectDbPlugin = fp(pl)