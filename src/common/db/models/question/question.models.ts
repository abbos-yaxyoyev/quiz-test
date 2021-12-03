import { getModelForClass, index, modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
// import  mongoose  from "mongoose";

export class Answer {

    @prop({
        auto: true
    })
    public _id: mongoose.Types.ObjectId;

    @prop({ trim: true })
    public title!: string;


    @prop({})
    public isCorrect: boolean;
}

@modelOptions({
    schemaOptions: {
        collection: 'questions',
        timestamps: { createdAt: true }
    }
})


export class Question {
    @prop({
        required: true,
        trim: true
    })
    public title!: string;

    @prop({
        required: true,
        trim: true
    })
    public type!: string;

    @prop({
        type: () => Answer
    })
    public alternativ!: Answer[];

}
export const QuestionModel = getModelForClass(Question);
export const QuestionSchema = QuestionModel.schema;