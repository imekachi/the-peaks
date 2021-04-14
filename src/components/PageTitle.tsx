import NextHead from 'next/head'

interface PageTitleProps {
  title: string
  withSuffix?: boolean
}

export default function PageTitle({
  title,
  withSuffix = true,
}: PageTitleProps) {
  return (
    <NextHead>
      <title>
        {title}
        {withSuffix ? ' | The Peaks' : ''}
      </title>
    </NextHead>
  )
}
