"use client";

import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function FileUploadZone({ name = "files" }: { name?: string }) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const remove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "flex min-h-[160px] cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:border-foreground",
        )}
      >
        <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Drag & drop logo, artwork or reference images</p>
        <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB each</p>
        <input
          type="file"
          name={name}
          multiple
          accept="image/*,.pdf"
          onChange={onSelect}
          className="mt-4 text-sm"
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center justify-between border border-border px-3 py-2 text-sm">
              <span className="truncate">{file.name}</span>
              <button type="button" onClick={() => remove(i)} aria-label="Remove file">
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
