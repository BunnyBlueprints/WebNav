import { UploadCloud, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import type { UploadActivity } from '../types';

interface UploadZoneProps {
  isAuthenticated: boolean;
  onRequireLogin: () => void;
  onUploadComplete: (upload: UploadActivity) => Promise<void>;
}

const acceptedFileTypes = [
  '.csv',
  '.xls',
  '.xlsx',
  '.txt',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.google-apps.spreadsheet',
  'text/csv',
  'text/plain',
].join(',');

function formatSessionTitle(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function estimateUrlCount(file: File) {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.csv') || fileName.endsWith('.txt')) {
    try {
      const content = await file.text();
      const lines = content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length === 0) {
        return 1;
      }

      return Math.max(1, lines.length - 1);
    } catch {
      return 1;
    }
  }

  return Math.max(1, Math.round(file.size / 4096));
}

export default function UploadZone({ isAuthenticated, onRequireLogin, onUploadComplete }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const processFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }

    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }

    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.csv', '.xls', '.xlsx', '.txt'];
    const hasValidExtension = allowedExtensions.some((extension) => fileName.endsWith(extension));

    if (!hasValidExtension) {
      setErrorMessage('Please upload an Excel, CSV, TXT, or exported Google Sheets file.');
      setSelectedFile(null);
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);

    const uploadedAt = new Date();
    const urlCount = await estimateUrlCount(file);

    setIsSaving(true);

    try {
      await onUploadComplete({
        id: `${uploadedAt.getTime()}`,
        title: formatSessionTitle(file.name),
        fileName: file.name,
        fileSizeKb: Number((file.size / 1024).toFixed(1)),
        uploadedAt: uploadedAt.toISOString(),
        date: uploadedAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        time: uploadedAt.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        urlCount,
        status: 'COMPLETED',
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save the uploaded session.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBrowseClick = () => {
    if (!isAuthenticated) {
      onRequireLogin();
      return;
    }

    inputRef.current?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void processFile(event.target.files?.[0]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void processFile(event.dataTransfer.files?.[0]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex min-h-[380px] flex-col justify-center rounded-[22px] border border-dashed px-6 py-10 transition-all md:px-10 ${
        isDragging
          ? 'border-primary bg-blue-50/70'
          : 'border-slate-300 bg-surface-container-low hover:border-primary/40'
      }`}
      onDragEnter={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        accept={acceptedFileTypes}
        className="hidden"
        type="file"
        onChange={handleInputChange}
      />
      <div className="mx-auto max-w-[470px] text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 group-hover:scale-110 transition-transform">
          <UploadCloud className="text-primary w-8 h-8" />
        </div>
        <h3 className="mb-3 text-[2rem] font-bold font-headline tracking-tight text-on-surface">Upload your list</h3>
        <p className="mb-8 text-lg leading-8 text-on-surface-variant">
          Drag and drop your Excel, CSV, or exported Google Sheets file here to begin your exploration session.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            type="button"
            disabled={isSaving}
            onClick={handleBrowseClick}
          >
            {isSaving ? 'Saving...' : 'Browse Files'}
          </button>
          <button className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-surface-container" type="button">
            Download Template
          </button>
        </div>
        {selectedFile ? (
          <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-left shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">
                {(selectedFile.size / 1024).toFixed(1)} KB ready to upload
              </p>
            </div>
          </div>
        ) : null}
        {errorMessage ? (
          <p className="mt-5 text-sm font-medium text-red-600">{errorMessage}</p>
        ) : null}
        {!isAuthenticated ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">
            <ShieldAlert className="h-4 w-4" />
            Sign in first to upload and process files
          </div>
        ) : null}
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.28em] text-on-surface-variant opacity-60">
          Supported formats: .xlsx, .xls, .csv, .txt, exported Google Sheets
        </p>
      </div>
    </motion.div>
  );
}
