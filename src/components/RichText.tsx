export default function RichText({ text }: { text: string }) {
  const parts = text.split(/(agents\.md)/g);
  return (
    <>
      {parts.map((part, index) =>
        part === "agents.md" ? (
          <code key={`${part}-${index}`} className="code">
            agents.md
          </code>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  );
}
