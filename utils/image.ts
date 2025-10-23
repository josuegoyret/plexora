import { WIX_MEDIA_URL } from "@/config/constants";

export const getWixMediaImageUrl = (url: string) => {
  return `${WIX_MEDIA_URL}/${url}`;
};
