import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.LLM_API_KEY!);
const fileManager = new GoogleAIFileManager(process.env.LLM_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const fileUploadToEL = async (req: any, res: any) => {
  try {
    const files = req.files.files;
    if (!files) {
      return res.status(404).json({
        success: false,
        message: "No files were uploaded",
      });
    }
    const filePath = files.tempFilePath;
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "application/pdf",
      displayName: files.name || "Gemini 1.5 PDF",
    });
    return res.status(200).json({
      success: true,
      message: "Successfully uploaded file",
      response: uploadResponse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error uploading file",
    });
  }
};

export const queryELModel = async (req: any, res: any) => {
  try {
    const { query, fileInfo } = req.body;
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: fileInfo.mimeType,
          fileUri: fileInfo.uri,
        },
      },
      { text: query },
    ]);
    const response = result.response.text();
    return res.status(200).json({
      success: true,
      message: "Successfully generated response from EL model",
      response: response,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error querying EL model",
    });
  }
};
