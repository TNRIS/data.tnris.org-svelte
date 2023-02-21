export declare global {
  interface Window {
    handleCaptchaCallback: (token: string) => Promise<void>;
    resetCaptcha: () => void;
    handleCaptchaError: () => void;
  }
}
