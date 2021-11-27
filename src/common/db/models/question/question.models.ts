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

@index(
    {
        "alternativ.isCorrect": 1
    },
    {
        name: '_id_and_is_correct',
        background: true,
        // unique: true,
        partialFilterExpression: {
            type: {
                $eq: 'single_answer',
            },
            "alternativ.isCorrect": {
                $eq: true
            }
        }
    }
)

export class QuizQuestion {
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
export const QuizQuestionModel = getModelForClass(QuizQuestion);
export const QuestionSchema = QuizQuestionModel.schema;