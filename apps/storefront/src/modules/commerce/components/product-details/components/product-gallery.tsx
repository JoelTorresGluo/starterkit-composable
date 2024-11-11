import { useToken } from '@chakra-ui/react'
import { IMAGE_PLACEHOLDER } from '@modules/general'
import {
  ComposableProduct,
  ComposableProductVariant,
} from '@oriuminc/commerce-generic'
import { Gallery } from '@oriuminc/ui'

export const ProductGallery = ({
  product,
  variant,
}: {
  product: ComposableProduct
  variant: ComposableProductVariant
}) => {
  const imagesVariantImages = variant.images?.length
    ? variant.images
    : product.variants[0].images ?? []

  const images = product.images?.length ? product.images : imagesVariantImages

  return (
    <Gallery
      key={product?.id}
      style={{ base: 'slide-show', lg: 'blog' }}
      rootProps={{
        overflow: 'hidden',
        width: 'full',
        borderRadius: 'base',
      }}
      images={
        images.length
          ? images?.map((image) => {
              return {
                src: image.url,
                alt: image.altText ?? '',
                sizes: '(max-width: 1024px) 100vw, 50vw',
              }
            })
          : [{ src: IMAGE_PLACEHOLDER, alt: '' }]
      }
    />
  )
}
