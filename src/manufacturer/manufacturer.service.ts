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
        const manufacturer = await this.manufacturerModel.findOneAndUpdate(
            { manufacturerId: manufacturerData.manufacturerId },
            manufacturerData,
            { upsert: true, new: true }
        ).exec();
        return manufacturer._id.toString();
    }
}