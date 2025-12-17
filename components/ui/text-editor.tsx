"use client";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import DOMPurify from "dompurify";

export default function TextEditor({
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        // Get content
        const html = quill.root.innerHTML;

        // Sanitize
        const cleanHtml = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "u",
            "s",
            "a",
            "ul",
            "ol",
            "li",
            "h1",
            "h2",
            "h3",
          ],
          ALLOWED_ATTR: ["href", "target", "class"],
        });

        setContent(cleanHtml);
      };

      quill.on("text-change", handleTextChange);

      // Cleanup
      return () => {
        quill.off("text-change", handleTextChange);
      };
    }
  }, [quill, setContent]);

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <div ref={quillRef}  style={{height:'70%'}}/>
    </div>
  );
}
