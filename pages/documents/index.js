import Document from "../../components/Document"
import fetch from "isomorphic-unfetch"

const fetcher = (...args) => {
  return fetch(...args).then((response) => response.json())
}

const Index = ({ documents }) => {
  return (
    <ul>
      {documents.rows.map((p, i) => (
        <Document key={i} document={p} />
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const documents = await fetcher("http://localhost:3000/api/documents")
  return {
    props: {
      documents,
    },
  }
}

export default Index
