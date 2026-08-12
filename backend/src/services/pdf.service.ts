import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFParse } from "pdf-parse";
import { pdf } from "pdf-to-img";

const execFileAsync = promisify(execFile);

const MIN_TEXT_LENGTH = 100;

const TESSERACT_PATH =
  "C:\\Program Files\\Tesseract-OCR\\tesseract.exe";

const extractTextFromPdf = async (
  filePath: string
): Promise<string> => {
  const fileBuffer = await fs.readFile(filePath);

  // Önce PDF içerisindeki gerçek metni oku
  const parser = new PDFParse({
    data: fileBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  const extractedText = result.text.trim();

  if (extractedText.length >= MIN_TEXT_LENGTH) {
    console.log("PDF text extracted successfully.");
    return extractedText;
  }

  console.log("PDF text is insufficient. Starting OCR...");

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "ai-recruiter-")
  );

  try {
    const document = await pdf(filePath, {
      scale: 2,
    });

    let fullText = "";
    let pageNumber = 0;

    for await (const image of document) {
      pageNumber++;

      const imagePath = path.join(
        tempDir,
        `page-${pageNumber}.png`
      );

      const outputBase = path.join(
        tempDir,
        `page-${pageNumber}`
      );

      await fs.writeFile(imagePath, image);

      console.log(`OCR processing page ${pageNumber}...`);

      await execFileAsync(
        TESSERACT_PATH,
        [
          imagePath,
          outputBase,
          "-l",
          "tur+eng",
        ],
        {
          windowsHide: true,
        }
      );

      const textPath = `${outputBase}.txt`;

      const pageText = await fs.readFile(
        textPath,
        "utf8"
      );

      fullText += `${pageText}\n`;
    }

    const ocrText = fullText.trim();

    if (!ocrText) {
      throw new Error(
        "OCR could not extract text from CV"
      );
    }

    console.log(
      `OCR completed. Extracted ${ocrText.length} characters.`
    );

    return ocrText;
  } finally {
    await fs.rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
};

export default {
  extractTextFromPdf,
};