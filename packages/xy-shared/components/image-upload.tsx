'use client';
import { put } from '@vercel/blob';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export function ImageUpload({
  url,
  set_url,
}: {
  url: string;
  set_url: (s: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files?.[0] as File;
    if (!file) return;
    setUploading(true);

    const blob = await put(`showcase-submit/${file.name}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    set_url(blob.url);
    console.log(blob.url);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        className="border border-border rounded-lg w-max p-1 px-2 hover:bg-slate-100 cursor-pointer"
        htmlFor="image-upload"
      >
        {url ? 'Replace Image' : 'Upload Image'}
      </label>

      <input
        name="image-upload"
        id="image-upload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {uploading && <span>Uploading...</span>}
      {url && (
        <Image
          className="border border-border rounded-lg"
          height="400"
          width="400"
          src={url}
          alt="your uploaded image"
        />
      )}
    </div>
  );
}
