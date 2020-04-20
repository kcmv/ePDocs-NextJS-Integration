export default ({ document }) => {
  return (
    <li>
      <pre>{JSON.stringify(document)}</pre>
    </li>
  );
};
