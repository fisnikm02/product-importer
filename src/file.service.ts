import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
    async readImagesTxt(): Promise<string[]> {
        const filePath = path.join(__dirname, '..', 'images40.txt');
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const lines = data.split('\n');

        const headers = lines[0].split('\t');
        const urlIndex = headers.indexOf('ItemImageURL');

        if (urlIndex === -1) {
            throw new Error('ItemImageURL column not found in images40.txt');
        }

        const images = lines.slice(1).map(line => {
            const columns = line.split('\t');
            if (columns.length > urlIndex) {
                const url = columns[urlIndex]?.trim();
                if (url && url.startsWith('http')) {
                    return url;
                }
            }
            return null;
        }).filter(url => url !== null);

        return images;
    }

    async readSampleProducts(): Promise<string> {
        const filePath = path.join(__dirname, '..', 'sample-products.json');
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return data;
    }
}
