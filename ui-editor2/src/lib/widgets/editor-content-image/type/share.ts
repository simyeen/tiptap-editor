export type ElementDimensions = {width: number; height: number};

export interface ImageState {
  src: string;
  isServerUploading: boolean;
  imageLoaded: boolean;
  isZoomed: boolean;
  error: boolean;
  naturalSize: ElementDimensions;
  align: string;
  custom_thumbnail_url: string;
}
