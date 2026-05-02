interface Window {
  fathom?: {
    trackEvent: (eventName: string, options?: { _value?: number; _site_id?: string }) => void;
  };
}
