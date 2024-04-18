export default function Textarea({ ...props }) {
  const handleExpand = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };

  return (
    <textarea
      onInput={handleExpand}
      {...props}
    />
  );
}