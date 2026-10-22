interface JsonLdProps {
  data: Record<string, unknown> | null | Array<Record<string, unknown> | null>;
}

export function JsonLd({ data }: JsonLdProps) {
  const nodes = (Array.isArray(data) ? data : [data]).filter(
    (node): node is Record<string, unknown> => Boolean(node),
  );
  if (nodes.length === 0) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(nodes.length === 1 ? nodes[0] : nodes) }}
    />
  );
}
