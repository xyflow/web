'use client';
import { put } from '@vercel/blob';
import { ChangeEvent, useState } from 'react';

export function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0] as File;
    if (!file) return;
    setUploading(true);

    const blob = await put(`showcase-submit/${file.name}`, file, {
      access: 'public',
    });

    setImageUrl(blob.url);
    console.log(blob.url);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <span>Uploading...</span>}
      {imageUrl && (
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Uploaded Image
        </a>
      )}
    </div>
  );
}
