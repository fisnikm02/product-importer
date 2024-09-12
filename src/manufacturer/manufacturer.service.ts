// manufacturer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manufacturer, ManufacturerDocument } from './manufacturer.schema';

@Injectable()
export class ManufacturerService {
    constructor(
        @InjectModel(Manufacturer.name) private manufacturerModel: Model<ManufacturerDocument>,
    ) { }

    async upsertManufacturer(manufacturerData: any): Promise<string> {
        // Ensure that the upsert operation returns the document
        const manufacturer = await this.manufacturerModel.findOneAndUpdate(
            { manufacturerId: manufacturerData.manufacturerId }, // Query to find existing or create new
            manufacturerData, // Data to update or insert
            { upsert: true, new: true } // Options: upsert creates if not found, new returns the updated document
        ).exec(); // Execute the query
        return manufacturer._id.toString(); // Return the unique identifier of the manufacturer
    }
}