"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import { useThemeStore } from "@/store/theme-store";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function TextEditor({ value, onChange }: Props) {
  const { quill, quillRef } = useQuill();

  const theme = useThemeStore((state) => state.theme);

  console.log("theme textEditor", theme);

  useEffect(() => {
    if (!quill) return;

    const toolbar = document.querySelector(".ql-toolbar.ql-snow");
    if (toolbar) {
      toolbar.classList.remove(
        "bg-white!",
        "bg-gray-400!",
        "bg-base-white",
        "bg-grayscale",
        "bg-grayscale-200",
      );
      if (theme === "light") {
        toolbar.classList.add("bg-white!");
      } else {
        toolbar.classList.add("bg-gray-400!");
      }
    }

    if (value && value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

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

      onChange?.(cleanHtml);
    };

    quill.on("text-change", handleTextChange);

    // Cleanup
    return () => {
      quill.off("text-change", handleTextChange);
    };
  }, [quill, value, onChange, theme]);

  return (
    <div style={{ width: "100%", height: "200px" }} className="pt-4">
      <div ref={quillRef} style={{ height: "70%" }} />
    </div>
  );
}
