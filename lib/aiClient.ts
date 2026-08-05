import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const templatePath = path.join(process.cwd(), "app/prompts/reviewSummary.txt");
const template = fs.readFileSync(templatePath, "utf-8");

export const AIclient = {
  async GenerateSummary(joinedReviews: string, model?: string) {
    const summaryInstructions = template.replace(
      "{{joinedReviews}}",
      joinedReviews,
    );
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.interactions.create({
      model: model ?? "gemini-3.6-flash",
      input: summaryInstructions,
    });

    return response.output_text;
  },
};
