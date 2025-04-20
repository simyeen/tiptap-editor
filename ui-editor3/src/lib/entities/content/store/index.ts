import {create} from 'zustand';

interface StoreState {
  selectedImage: string | null; // 선택된 이미지 URL
  setSelectedImage: (url: string) => void;
}

export const useContentStore = create<StoreState>((set) => ({
  selectedImage: null,
  setSelectedImage: (url) => set({selectedImage: url}),
}));
