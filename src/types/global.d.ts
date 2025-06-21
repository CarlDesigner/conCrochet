// Definiciones de tipos globales para Bootstrap
declare global {
  interface Window {
    bootstrap: {
      Toast: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
        dispose: () => void;
      };
      Modal: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
        dispose: () => void;
      };
      Collapse: new (element: HTMLElement) => {
        show: () => void;
        hide: () => void;
        dispose: () => void;
      };
    };
  }
}

export {}; 