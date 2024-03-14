export interface MultipartFile {
  toBuffer: () => Promise<Buffer>;
  file: NodeJS.ReadableStream;
  filePath: string;
  fieldName: string;
  filename: string;
  encoding: string;
  mimetype: string;
  fields: import('@fastify/multipart').MultipartFields;
}
