import { JSX, useMemo } from 'react'
import { MarkdownInput, type MarkdownInputProps } from 'sanity-plugin-markdown'

export function CustomMarkdown(props: JSX.IntrinsicAttributes & MarkdownInputProps) {
  const reactMdeProps: MarkdownInputProps['reactMdeProps'] =
    useMemo(() => {
      return {
        options: {
          toolbar: ['bold', 'italic', 'link', 'ordered-list', 'unordered-list', '|', 'preview', 'guide'],
          minHeight: '30px',
          placeholder: '**Wyróżniony** tekst',
          // more options available, see:
          // https://github.com/Ionaru/easy-markdown-editor#options-list
        },
      }
    }, []);
  return <MarkdownInput {...props} reactMdeProps={reactMdeProps} />
}
