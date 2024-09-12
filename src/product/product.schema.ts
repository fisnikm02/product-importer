import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    productId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false })
    category?: string;

    @Prop({ required: false })
    manufacturerId?: string;

    @Prop({ required: false })
    vendorId?: string;

    @Prop({ default: () => Date.now() })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
