export {}; // This makes the file a module

declare global {
  interface Window {
    Razorpay: any; // or the specific type if available
  }
}