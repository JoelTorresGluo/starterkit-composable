import Image, { ImageProps } from 'next/image'

export const BrandLogo = ({
  style = {
    objectFit: 'contain',
    objectPosition: 'left center',
    height: '100%',
    width: '100%',
  },
  priority = true,
  ...props
}: ImageProps) => {
  return <Image style={style} priority={priority} {...props} />
}
