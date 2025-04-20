export interface EditorHandler {
  getHTML: () => string;
  getJSON: () => object;
  getText: () => string;
  getThumbnail: () => string;
}
