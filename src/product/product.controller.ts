import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('import')
    async importProducts() {
        await this.productService.importProducts();
        return { message: 'Product import started.' };
    }

    @Post('import')
    async importProduct(@Body() productData: any) {
        const product = await this.productService.upsertProduct(productData);
        return product;
    }
}
