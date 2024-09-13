import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { FileService } from 'src/file.service';
import { nanoid } from 'nanoid';
import { VendorService } from 'src/vendor/vendor.service';
import { GPTService } from 'src/gpt.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        private fileService: FileService,
        private vendorService: VendorService,
        private gptService: GPTService,
    ) { }

    async upsertProduct(productData: any): Promise<Product> {
        let nanoidv4 = nanoid

        console.log('Upserting product with data:', productData);
        if (!productData.data.vendorId || !productData.data.manufacturerId) {
            throw new Error('Product data must include vendor and manufacturer information.');
        }
        const vendorId = await this.vendorService.upsertVendor(productData.data);
        const manufacturerId = await this.vendorService.upsertManufacturer(productData.data);

        productData.vendorId = vendorId;
        productData.manufacturerId = manufacturerId;

        const { _id, ...updateData } = productData;
        if (!productData.docId) {
            productData.docId = nanoidv4
        }

        return this.productModel
            .findOneAndUpdate(
                { productId: productData.productId },
                productData,
                { upsert: true, new: true },
            )
            .exec();
    }

    async importProducts() {
        try {
            console.log('Starting product import process');
            const productsData = await this.fileService.readSampleProducts();
            const products = JSON.parse(productsData);

            const images = await this.fileService.readImagesTxt();

            for (let index = 0; index < products.data.length; index++) {
                const product = products.data[index];
                const image = images[index] || '';
                product.imageUrl = image;
                // try {


                const enhancedDescription = await this.gptService.enhanceDescription(
                    product.name,
                    product.description,
                    product.category
                );
                product.description = enhancedDescription;
                // } catch (innerError) {
                //     console.log(`Error processing product ID ${product}:`, innerError);
                // }

                await this.upsertProduct(product);
            }

            console.log('Completed product import');
        } catch (error) {
            console.error('Error in importProducts:', error);
            throw error;
        }
    }

    @Cron('0 0 * * *')
    async scheduledProductImport() {
        await this.importProducts();
        await this.enhanceDescriptions();
    }

    async enhanceDescriptions() {
        try {
            const productsToEnhance = await this.productModel.find().limit(10).exec();
            for (const product of productsToEnhance) {
                const enhancedDescription = await this.gptService.enhanceDescription(product.name, product.description);
                product.description = enhancedDescription;
                await product.save();
            }
        } catch (error) {
            console.error('Error enhancing descriptions:', error);
        }
    }
}
