import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownContent({ children }) {
  return <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
}
