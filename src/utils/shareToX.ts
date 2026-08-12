import { BuilderData } from '../types';

export interface ShareOptions {
  builderData: BuilderData;
  imageUrl?: string;
  websiteUrl?: string;
}

/**
 * Generate formatted tweet text for HH Goa 2026
 */
export const generateTweetText = (data: BuilderData, customUrl?: string): string => {
  const modeLabel = data.mode === 'card' ? 'Builder Card' : 'Profile Frame';
  const rolePrefix = data.roleTier === 'Hacker' ? '🔨 Hacker' : `✨ ${data.roleTier}`;

  return `Just generated my official HH Goa 2026 ${modeLabel}! 🌴🚀

🧑‍💻 ${data.name || 'Builder'}
🏷️ Title: ${data.title}
⚡ Stack: ${data.stack || 'Full-Stack'}
🎫 Role: ${rolePrefix}

Can't wait to build, hack & vibe by the beach with everyone at Hacker House Goa 2026! 🌊🔥

Create yours: ${customUrl || window.location.origin}

#FrameInGoa #HHGoa2026 #HackerHouseGoa #BuildInPublic`;
};

/**
 * Open X (Twitter) Web Intent in a new popup window
 */
export const openXShareIntent = (options: ShareOptions): void => {
  const { builderData, websiteUrl = window.location.href } = options;
  const tweetText = generateTweetText(builderData, websiteUrl);
  
  const shareUrl = new URL('https://twitter.com/intent/tweet');
  shareUrl.searchParams.set('text', tweetText);

  // Open nicely sized popup
  const width = 600;
  const height = 500;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  window.open(
    shareUrl.toString(),
    'share-to-x',
    `width=${width},height=${height},top=${top},left=${left},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
  );
};

/**
 * Upload image Blob to Cloudinary (if configured with preset) for OpenGraph preview card
 */
export const uploadToCloudinary = async (
  imageBlob: Blob,
  cloudName: string = 'demo',
  uploadPreset: string = 'docs_upload_example_preset'
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', imageBlob);
  formData.append('upload_preset', uploadPreset);
  formData.append('tags', 'hh_goa_2026,builder_badge');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Cloudinary upload failed with status ${response.status}`);
  }

  const result = await response.json();
  return result.secure_url;
};
