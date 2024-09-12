import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.schema';
import { FileService } from 'src/file.service';
import { GPTService } from 'src/gpt.service';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
        VendorModule
    ],
    controllers: [ProductController],
    providers: [ProductService, FileService, GPTService],
    exports: [ProductService]
})
export class ProductModule { }
