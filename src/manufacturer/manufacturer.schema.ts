import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export type ManufacturerDocument = Manufacturer & Document;

@Schema()
export class Manufacturer {
    @Prop({ required: true, unique: true })
    manufacturerId: string;

    @Prop({ default: () => nanoid() })
    docId: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);

ManufacturerSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});