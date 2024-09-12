import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
    @Prop({ required: true, unique: true })
    vendorId: string;

    @Prop({ default: () => nanoidPromise() })
    docId: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    contactInfo: string;

    @Prop()
    address: string;

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

async function nanoidPromise(): Promise<string> {
    const { nanoid } = await import('nanoid');
    return nanoid();
}