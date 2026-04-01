export type SessionStatus = 'COMPLETED' | 'IN PROGRESS' | 'ARCHIVED';

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  urlCount: number;
  status: SessionStatus;
}

export interface UploadActivity extends Session {
  fileName: string;
  fileSizeKb: number;
  uploadedAt: string;
}
