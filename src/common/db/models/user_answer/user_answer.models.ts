import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Question } from "../question/question.models";
import { Quiz } from "../quiz/quiz.models";

@modelOptions({
    schemaOptions: {
        collection: 'answer_question',
        timestamps: { createdAt: true }
    }
})

export class Answer {
    @prop({ type: [], ref: 'questions' })
    public correct_answer_id!: Types.ObjectId[];

    @prop({ type: Types.ObjectId, ref: 'questions' })
    public question_id!: Ref<Question>;

    @prop({ type: Types.ObjectId, ref: 'answer_question' })
    public quiz_id!: Ref<Quiz>;

    @prop({
        required: true,
        trim: true
    })
    public title!: string;

    @prop({
        type: () => [Types.ObjectId],
        default: []
    })
    public user_answer_id: Types.ObjectId[];

}

export const AnswerModel = getModelForClass(Answer);
export const AnswerSchema = AnswerModel.schema;