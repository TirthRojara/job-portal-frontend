export function formatText(text: string | null | undefined): string {
    if (!text) return "";
    
    return text
        // Replace literal "\n" with actual newline
        .replace(/\\n/g, "\n")
        // Replace literal "\t" with actual tab (optional, but good for completeness)
        .replace(/\\t/g, "\t")
        // Remove multiple consecutive newlines if you want to clean up messy data (Optional)
        // .replace(/\n\s*\n/g, '\n\n'); 
}

export const YYYYMMDD = (isoString: string): string => {
  try {
    return new Date(isoString).toISOString().split('T')[0];
  } catch {
    return '';
  }
};