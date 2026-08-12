import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not configured");
}

const groq = new Groq({
  apiKey,
});

type CvAnalysisResult = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
};

const analyzeCv = async (
  cvText: string,
  jobDescription: string
): Promise<CvAnalysisResult> => {
  const prompt = `
You are an AI recruitment assistant.

Analyze the candidate CV against the job description.

Candidate CV:
${cvText}

Job Description:
${jobDescription}

Return ONLY valid JSON:

{
  "score": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": []
}

Rules:
- score must be an integer between 0 and 100.
- summary must briefly explain the candidate's suitability.
- strengths must contain relevant skills or experience.
- weaknesses must contain relevant gaps or concerns.
- missingSkills must contain skills required by the job but not clearly demonstrated in the CV.
- Do not invent experience that is not present in the CV.
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
  });

  const text = completion.choices[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response");
  }

  try {
    return JSON.parse(text) as CvAnalysisResult;
  } catch {
    throw new Error("Groq returned invalid JSON");
  }
};

export default {
  analyzeCv,
};