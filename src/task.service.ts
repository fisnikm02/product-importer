import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductService } from './product/product.service';

@Injectable()
export class TaskService {
    constructor(private readonly productService: ProductService) { }

    @Cron('0 0 * * *')
    async handleCron() {
        console.log('Running scheduled product import...');
        await this.productService.importProducts();
    }
}
