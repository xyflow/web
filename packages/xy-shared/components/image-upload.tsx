'use client';
import { put } from '@vercel/blob';
import { ChangeEvent, useState } from 'react';

export function ImageUpload({ url, set_url }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0] as File;
    if (!file) return;
    setUploading(true);

    const blob = await put(`showcase-submit/${file.name}`, file, {
      access: 'public',
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });

    set_url(blob.url);
    console.log(blob.url);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <span>Uploading...</span>}
      {url && (
        <a
          href={url}
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
