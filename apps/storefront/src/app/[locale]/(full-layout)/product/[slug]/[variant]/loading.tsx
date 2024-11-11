import { PdpLayout } from '@oriuminc/ui'

export default function Loading() {
  return (
    <PdpLayout
      key='loading'
      brand=''
      title=''
      description=''
      isLoaded={false}
      sectionOrder={[
        'brand',
        'title',
        'price',
        'main',
        'description',
        'accordion',
      ]}
      stackProps={{
        direction: { base: 'column-reverse', lg: 'row-reverse' },
      }}
      mainStackProps={{
        position: 'sticky',
        height: 'fit-content',
        top: 12,
      }}
      price={<></>}
      main={<></>}
      aside={<></>}
    />
  )
}
