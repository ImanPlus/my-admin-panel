import { Footer } from "antd/es/layout/layout";
import Link from "next/link";

export default function ContentFooter() {
  return (
    <Footer className="px-3!">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <p>&copy; 2025, made with ❤️ By Iman Jalali</p>
        <div className="text-green-500 flex gap-3">
          <Link href="#">License</Link>
          <Link href="#">More Themes</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Support</Link>
        </div>
      </div>
    </Footer>
  );
}
