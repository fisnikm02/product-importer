import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GPTService {
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

    async callGPT4(prompt: string): Promise<string> {
        try {
            const apiKey = process.env.OPENAI_API_KEY;
            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: 'gpt-4',
                prompt: prompt,
                max_tokens: 200,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling GPT-4 API:', error);
            throw new Error('Failed to enhance the description.');
        }
    }
}