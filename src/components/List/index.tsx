import {
  List as ChakraList,
  ListItem,
  Link,
  Checkbox,
  Text,
  Radio,
  ListIcon,
} from '@chakra-ui/react'

export interface ListProps {
  items: ItemType[]
  size: ListSize
}

export type RightIconType = 'icon' | 'text' | 'link'
export type LeftIconType = 'icon' | 'checkbox' | 'radio'
interface ItemType {
  title: string
  leftIconType?: LeftIconType
  rightIconType?: RightIconType
  rightIconText?: string
  rightIconLink?: string
  leftIcon?: any
  rightIcon?: any
}
export type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

function RenderRightIcon(
  props: Pick<ListProps, 'size'> &
    Pick<
      ItemType,
      'rightIconType' | 'rightIconText' | 'rightIconLink' | 'rightIcon'
    >
) {
  if (props.rightIconType == 'icon') {
    return <ListIcon ml='5' as={props.rightIcon} fontSize={props.size} />
  }
  if (props.rightIconType == 'text') {
    return (
      <Text as='span' fontSize={props.size} ml='5'>
        {props.rightIconText}
      </Text>
    )
  }
  if (props.rightIconType == 'link') {
    return (
      <Link
        ml='5'
        href={props?.rightIconLink}
        isExternal={true}
        textDecoration='underline'
        fontSize={props.size}
      >
        {props.rightIconText}
      </Link>
    )
  }
  return <></>
}

function RenderLeftIcon(
  props: Pick<ListProps, 'size'> &
    Pick<ItemType, 'leftIconType' | 'leftIcon' | 'title'>
) {
  /*
        Defining the renderSize as lg if selected size is xl and sm if selected size is xs because CheckBox and Radio only supports sm,md and lg. 
        Defining sizes for xs and xl by giving custom height and width does not work. 
    */
  const renderSize =
    props.size == 'xl' ? 'lg' : props.size == 'xs' ? 'sm' : props.size
  if (props.leftIconType) {
    if (props.leftIconType == 'icon') {
      return (
        <>
          <ListIcon as={props.leftIcon} fontSize={props.size} />
          <Text as='span' fontSize={props.size} pl='1'>
            {props.title}
          </Text>
        </>
      )
    }
    if (props.leftIconType == 'checkbox') {
      return (
        <Checkbox size={renderSize}>
          <Text as='span' fontSize={props.size}>
            {props.title}
          </Text>
        </Checkbox>
      )
    }
    if (props.leftIconType == 'radio') {
      return (
        <Radio size={renderSize}>
          <Text as='span' fontSize={props.size}>
            {props.title}
          </Text>
        </Radio>
      )
    }
  }
  return <>{props.title}</>
}

export const List = ({ items, size }: ListProps) => {
  return (
    <ChakraList spacing='5' fontSize={size}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Text as='span' fontSize={size}>
            <RenderLeftIcon size={size} {...item} />
            {item.rightIconType && <RenderRightIcon size={size} {...item} />}
          </Text>
        </ListItem>
      ))}
    </ChakraList>
  )
}
