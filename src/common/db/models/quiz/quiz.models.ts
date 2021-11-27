import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { User } from "../user/user.models";

export enum Status {
    DEFAULT = "start",
    RUNNING = "running",
    FINISHED = "finished"
}

@modelOptions({
    schemaOptions: {
        collection: 'quiz'
    }
})
// @index
export class Quiz {
    @prop({ type: Types.ObjectId, ref: 'users' })
    public user_id !: Ref<User>;

    @prop({ required: true })
    public total_count?: number;

    @prop({})
    public correct_count?: number;

    @prop({})
    public incorrect_count?: number;

    @prop({})
    public result?: number;

    @prop({})
    public started_at?: Date;

    @prop({})
    public finished_at?: Date;

    @prop({
        enum: ["start", "running", "finished"],
        default: Status.DEFAULT
    })
    public status?: string;

    @prop({})
    public percent?: string;
}


const schemaOpts = { schemaOptions: { timestamps: { createdAt: true } } };
export const QuizModel = getModelForClass(Quiz, schemaOpts);
export const QuizSchema = QuizModel.schema;