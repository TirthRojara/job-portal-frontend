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

export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);

  const diffMs = now.getTime() - past.getTime();

  // future or invalid date safety
  if (isNaN(past.getTime()) || diffMs < 0) return "just now";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMinutes < 1) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  }

  if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
}

export function formatSalary(value: number): string {
  if (value < 1000) return value.toString();

  if (value < 1_000_000) {
    const formatted = value / 1000;
    return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(1)}k`;
  }

  const formatted = value / 1_000_000;
  return `${Number.isInteger(formatted) ? formatted : formatted.toFixed(1)}M`;
}
