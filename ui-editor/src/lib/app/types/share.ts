export interface HandleUploadProps {
  thumbnailUrl?: string;
  onThumbnailUrlChange?: (newThumbnailUrl: string) => void;
  handleServerImageUpload?: (file: File) => Promise<Record<string, string>[]>;
}
