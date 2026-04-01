import { UploadSession } from '../models/UploadSession.js';

function normalizeUploadPayload(body) {
  return {
    title: String(body.title || '').trim(),
    fileName: String(body.fileName || '').trim(),
    fileSizeKb: Number(body.fileSizeKb || 0),
    uploadedAt: body.uploadedAt ? new Date(body.uploadedAt) : new Date(),
    date: String(body.date || '').trim(),
    time: String(body.time || '').trim(),
    urlCount: Number(body.urlCount || 0),
    status: String(body.status || 'COMPLETED').trim(),
  };
}

export async function createUploadSession(req, res) {
  const payload = normalizeUploadPayload(req.body);

  if (!payload.title || !payload.fileName || !payload.date || !payload.time) {
    return res.status(400).json({ message: 'Upload title, file name, date, and time are required.' });
  }

  if (!Number.isFinite(payload.fileSizeKb) || payload.fileSizeKb < 0) {
    return res.status(400).json({ message: 'File size must be a valid number.' });
  }

  if (!Number.isFinite(payload.urlCount) || payload.urlCount < 0) {
    return res.status(400).json({ message: 'URL count must be a valid number.' });
  }

  const upload = await UploadSession.create({
    userId: req.user._id,
    ...payload,
  });

  return res.status(201).json({
    message: 'Upload session saved successfully.',
    upload: upload.toClientObject(),
  });
}

export async function listUploadSessions(req, res) {
  const uploads = await UploadSession.find({ userId: req.user._id }).sort({ uploadedAt: -1, createdAt: -1 }).limit(100);

  return res.status(200).json({
    uploads: uploads.map((upload) => upload.toClientObject()),
  });
}
