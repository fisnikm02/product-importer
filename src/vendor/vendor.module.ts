import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './vendor.schema';
import { VendorService } from './vendor.service';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
        ManufacturerModule,
    ],
    providers: [VendorService],
    exports: [VendorService]
})
export class VendorModule { }