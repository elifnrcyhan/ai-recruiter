import fs from "fs/promises";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { PDFParse } from "pdf-parse";

const execFileAsync = promisify(execFile);

const MIN_TEXT_LENGTH = 100;

const TESSERACT_PATH =
  "C:\\Program Files\\Tesseract-OCR\\tesseract.exe";

const POPPLER_PATH = path.join(
  process.cwd(),
  "node_modules",
  "pdf-poppler",
  "lib",
  "win",
  "poppler-0.51",
  "bin",
  "pdftoppm.exe"
);

const OCR_LANGUAGE = "tur+eng";

const extractTextFromPdf = async (
  filePath: string
): Promise<string> => {
  const fileBuffer = await fs.readFile(filePath);

  // --------------------------------------------------
  // 1. Önce PDF'in kendi metnini çıkarmayı dene
  // --------------------------------------------------

  const parser = new PDFParse({
    data: fileBuffer,
  });

  try {
    const result = await parser.getText();

    const extractedText = result.text.trim();

    if (extractedText.length >= MIN_TEXT_LENGTH) {
      console.log(
        `PDF text extracted successfully (${extractedText.length} chars).`
      );

      return extractedText;
    }

    console.log(
      `PDF text insufficient (${extractedText.length} chars). Starting OCR...`
    );
  } finally {
    await parser.destroy();
  }

  // --------------------------------------------------
  // 2. Geçici klasör oluştur
  // --------------------------------------------------

  const tempDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "ai-recruiter-")
  );

  try {
    // --------------------------------------------------
    // 3. Tesseract kontrolü
    // --------------------------------------------------

    await fs.access(TESSERACT_PATH);

    // --------------------------------------------------
    // 4. Poppler kontrolü
    // --------------------------------------------------

    await fs.access(POPPLER_PATH);

    console.log("Poppler:", POPPLER_PATH);
    console.log("Tesseract:", TESSERACT_PATH);

    // --------------------------------------------------
    // 5. PDF -> PNG
    // --------------------------------------------------

    const outputPrefix = path.join(
      tempDir,
      "page"
    );

    console.log("Rendering PDF pages with Poppler...");

    await execFileAsync(
      POPPLER_PATH,
      [
        "-png",
        "-r",
        "300",
        filePath,
        outputPrefix,
      ],
      {
        windowsHide: true,
        maxBuffer: 20 * 1024 * 1024,
      }
    );

    // --------------------------------------------------
    // 6. Oluşturulan PNG dosyalarını bul
    // --------------------------------------------------

    const files = await fs.readdir(tempDir);

    const imageFiles = files
      .filter((file) => /^page-\d+\.png$/i.test(file))
      .sort((a, b) => {
        const pageA = Number(
          a.match(/\d+/)?.[0] ?? 0
        );

        const pageB = Number(
          b.match(/\d+/)?.[0] ?? 0
        );

        return pageA - pageB;
      });

    if (imageFiles.length === 0) {
      throw new Error(
        "Poppler could not render any PDF pages."
      );
    }

    console.log(
      `PDF rendered successfully: ${imageFiles.length} page(s).`
    );

    // --------------------------------------------------
    // 7. Her sayfayı Tesseract ile OCR yap
    // --------------------------------------------------

    let fullText = "";

    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];

      const imagePath = path.join(
        tempDir,
        imageFile
      );

      const outputBase = path.join(
        tempDir,
        `ocr-${i + 1}`
      );

      console.log(
        `OCR processing page ${i + 1}/${imageFiles.length}...`
      );

      await execFileAsync(
        TESSERACT_PATH,
        [
          imagePath,
          outputBase,
          "-l",
          OCR_LANGUAGE,
          "--psm",
          "3",
        ],
        {
          windowsHide: true,
          maxBuffer: 20 * 1024 * 1024,
        }
      );

      const textPath = `${outputBase}.txt`;

      const pageText = (
        await fs.readFile(textPath, "utf8")
      ).trim();

      console.log(
        `Page ${i + 1}: ${pageText.length} OCR characters.`
      );

      if (pageText.length > 0) {
        fullText += `${pageText}\n`;
      }
    }

    // --------------------------------------------------
    // 8. OCR sonucunu kontrol et
    // --------------------------------------------------

    const ocrText = fullText.trim();

    if (!ocrText) {
      throw new Error(
        "OCR could not extract any text from CV."
      );
    }

    console.log(
      `OCR completed. Extracted ${ocrText.length} characters.`
    );

    return ocrText;
  } catch (error) {
    console.error("PDF OCR failed:", error);

    throw new Error(
      "CV PDF could not be processed. Please make sure the PDF is readable."
    );
  } finally {
    // --------------------------------------------------
    // 9. Geçici dosyaları temizle
    // --------------------------------------------------

    await fs.rm(tempDir, {
      recursive: true,
      force: true,
    });
  }
};

export default {
  extractTextFromPdf,
};