import { create } from "zustand";

interface SignedUrlState {
  urlCache: Record<string, string>;
  addUrl: (path: string, url: string) => void;
  getUrl: (path: string) => string | undefined;
  clearCache: () => void;
}

const signedUrlStore = create<SignedUrlState>((set, get) => ({
  urlCache: {},

  addUrl: (path, url) => {
    set((state) => ({
      urlCache: {
        ...state.urlCache,
        [path]: url,
      },
    }));
  },

  getUrl: (path) => {
    return get().urlCache[path];
  },

  clearCache: () => {
    set({ urlCache: {} });
  },
}));

export default signedUrlStore;
