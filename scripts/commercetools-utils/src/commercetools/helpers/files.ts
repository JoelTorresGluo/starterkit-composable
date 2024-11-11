import axios from 'axios'
import { addImageToProduct } from '../service/products'
import { convertJpgToJpeg } from '../utils/transformations'
import { RawProduct } from '../types'

export const getFileStreamFromUrl = async (fileUrl: string) => {
  const res = await axios.get(fileUrl, { responseType: 'stream' })

  return res.data
}

export const getFileExtensionFromUrl = (fileUrl: string) => {
  const urlSplitRoute = fileUrl.split('?')[0]?.split('/')
  const fullFilename = urlSplitRoute[urlSplitRoute.length - 1]
  const [filename, extension] = fullFilename.split('.')

  return { filename, extension, fullFilename }
}

export const addImagesToProduct = async (
  product: RawProduct,
  productId: string
) =>
  await Promise.allSettled(
    product.images.map(async (image) => {
      const imageStream = await getFileStreamFromUrl(image)
      const { extension, fullFilename } = getFileExtensionFromUrl(image)

      return addImageToProduct(
        productId,
        extension === 'jpg' ? convertJpgToJpeg(imageStream) : imageStream,
        extension === 'jpg' ? 'jpeg' : extension,
        fullFilename
      )
    })
  )
