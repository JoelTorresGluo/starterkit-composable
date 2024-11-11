---
sidebar_position: 1
---

# Optimizing Images

Next.js provides several built-in optimizations, such as automatic image optimization and resizing, for images. Orium's Accelerator leverages these optimizations to create a fast ecommerce experience.

## Next.js Image

The Next.js image component extends the HTML `<img>` element with:
- **Size Optimization**: Automatically serves correctly sized images for each device by using modern image formats, such as WebP and AVIF.
- **Visual Stability**: Automatically prevents layout shift when a site loads images.
- **Faster Page Loads**: Loads images only when the images enter the viewport using native browser lazy loading, with optional blur-up placeholders.
- **Asset Flexibility**: Resizes images on-demand, even for images stored on remote servers.

### Local images
Next.js automatically determines the width and height of the image based on the imported file. These values are used to prevent cumulative layout shift while the image loads.

The following code sample shows how to render a local image:

```jsx
import Image from 'next/image';
import profilePic from '../public/me.png';

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
    />
  );
}
```
You need not provide `width`, `height`, or `blurDataURL` values.

### Remote Images
For using remote images in Next.js, the `src` property must contain the URL of the image.

Next.js does not have access to remote files during the build process, so you must provide the width, height, and optional `blurDataURL` properties manually.

The width and height attributes are used to infer the correct aspect ratio of image and to avoid layout shift from the image loading in. The following code sample shows how to render a local image:

```jsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="https://.../profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
}
```

### Priority
For an image that is the Largest Contentful Paint (LCP) element of a page, you must add the `priority` property. This property enables Next.js to prioritize the image for loading through preload tags or priority hints, leading to a meaningful boost in LCP.

## Related Resources

- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
