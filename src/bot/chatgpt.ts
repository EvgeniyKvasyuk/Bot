import { OpenAIApi, Configuration } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

export const chat = async (text: string) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      stream: false,
      max_tokens: 1000,
    });
    return response.data.choices[0].text;
  } catch (error) {
    throw new Error(error);
  }
};
