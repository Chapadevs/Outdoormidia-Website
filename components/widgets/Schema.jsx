// Injeta um nó de structured data (ver lib/schema.js). O `<` vira `\u003c`
// porque título de post é texto do CMS: um `</script>` no meio dele fecharia
// a tag e o resto viraria HTML.
export default function Schema({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
