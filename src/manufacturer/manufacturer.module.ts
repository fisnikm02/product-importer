// vendor.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Manufacturer, ManufacturerSchema } from './manufacturer.schema';
import { ManufacturerService } from './manufacturer.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Manufacturer.name, schema: ManufacturerSchema }]), // Register VendorModel
    ],
    providers: [ManufacturerService],
    exports: [ManufacturerService],
})
export class ManufacturerModule { }