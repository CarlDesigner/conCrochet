const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;

if (!CLOUD_NAME) {
  // No lanzamos error en build; el fallback será usar la URL original si existe
  // y solo generaremos URL de Cloudinary cuando CLOUD_NAME esté definido.
}

type TransformOpts = {
  w?: number;
  h?: number;
  crop?: 'fill' | 'fit' | 'thumb' | 'scale' | 'pad' | 'fill_pad';
  gravity?: 'auto' | 'center' | string;
  quality?: number | 'auto';
  format?: 'jpg' | 'png' | 'webp' | 'avif' | 'auto';
};

const buildTransform = (opts: TransformOpts = {}) => {
  const parts: string[] = [];
  const f = opts.format ?? 'auto';
  const q = opts.quality ?? 'auto';
  const c = opts.crop ?? 'fill';
  const g = opts.gravity;
  if (f) parts.push(`f_${f}`);
  if (q) parts.push(`q_${q}`);
  if (c) parts.push(`c_${c}`);
  if (g) parts.push(`g_${g}`);
  if (opts.w) parts.push(`w_${opts.w}`);
  if (opts.h) parts.push(`h_${opts.h}`);
  return parts.join(',');
};

export const cldUrl = (publicId: string, opts: TransformOpts = {}) => {
  if (!CLOUD_NAME) return '';
  const transform = buildTransform(opts);
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${publicId}`;
};

export const cldSrcSet = (publicId: string, widths: number[] = [320, 480, 640, 768, 1024, 1280, 1536]) => {
  if (!CLOUD_NAME) return '';
  return widths
    .map((w) => `${cldUrl(publicId, { w, crop: 'fill', format: 'auto', quality: 'auto' })} ${w}w`)
    .join(', ');
};

export const preferCld = (
  image: string | undefined,
  imagePublicId?: string,
  opts?: { fallbackWidth?: number; sizes?: string }
) => {
  // Si hay publicId y CLOUD_NAME, usamos Cloudinary. Si no, devolvemos la URL original.
  const sizes = opts?.sizes;
  const fallbackWidth = opts?.fallbackWidth ?? 800;

  if (CLOUD_NAME && imagePublicId) {
    return {
      src: cldUrl(imagePublicId, { w: fallbackWidth, crop: 'fill', format: 'auto', quality: 'auto' }),
      srcSet: cldSrcSet(imagePublicId),
      sizes,
    };
  }
  return { src: image ?? '', srcSet: undefined, sizes };
};

export type { TransformOpts };
