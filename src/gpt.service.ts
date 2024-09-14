import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class GPTService {
    private openai: ChatOpenAI;

    constructor() {
        this.openai = new ChatOpenAI({
            apiKey: process.env.APP_OPENAI_KEY,
            modelName: 'gpt-4',
            temperature: 0.7,
        });
    }

    async enhanceDescription(name: string, description: string, category?: string): Promise<string> {
        const prompt = `
            You are an expert in medical sales. Your specialty is medical consumables used by hospitals daily. Your task is to enhance the description of a product based on the information provided.

            Product name: ${name}
            Product description: ${description}
            Category: ${category ? category : 'General'}

            New Description:
        `;

        const gptResponse = await this.callGPT4(prompt);
        return gptResponse;
    }

    async callGPT4(prompt: string): Promise<any> {
        try {
            const response = await this.openai.invoke(prompt);
            console.log(response)
            return response;
        } catch (error) {
            console.error('Error calling GPT-4 API:', error);
            throw new Error('Failed to enhance the description.');
        }
    }
}
