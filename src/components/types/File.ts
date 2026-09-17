export interface FileData {
  id: number;
  attachmentId: number;
  name: string;
  mimetype: string;
  createdAt: string;
  url: string;
  publicUrl: string;
}

export interface FileGroup {
  parent: string;
  data: FileData[];
}

export interface FileResponse {
  status?: number;
  message?: string;
  data?: FileGroup[];
}