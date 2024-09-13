import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
    @Prop({ required: true, unique: true })
    vendorId: string;

    @Prop({ default: () => nanoid() })
    docId: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

VendorSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});