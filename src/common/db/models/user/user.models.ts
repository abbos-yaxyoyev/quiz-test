import { getModelForClass, index, modelOptions, prop } from "@typegoose/typegoose";

@index(
    {
        username: 1,
    },
    {
        background: true,
        unique: true
    }
)

@modelOptions({
    schemaOptions: {
        collection: 'users'
    }
})

export class User {
    @prop({
        required: true,
        trim: true
    })
    public username!: string;

    @prop({
        required: true,
        trim: true,
    })
    public first_name!: string;

    @prop({
        required: true,
        trim: true,
    })
    public last_name!: string;
}
const schemaOpts = { schemaOptions: { timestamps: { createdAt: true } } };
export const UserModel = getModelForClass(User, schemaOpts);

export const UserSchema = UserModel.schema;


