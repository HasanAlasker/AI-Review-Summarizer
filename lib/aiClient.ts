import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const AIclient = {
  async GenerateSummary(
    joinedReview: string,
    instructions: string,
    model?: string,
  ) {
    const interaction = await ai.interactions.create({
      model: model ?? "gemini-3.6-flash",
      input: joinedReview,
      system_instruction: instructions,
    });
    return {
      id: interaction.id,
      summary: interaction.output_text,
    };
  },

  // in the future i can add more ai implementations => ex customer service chat bot
};
