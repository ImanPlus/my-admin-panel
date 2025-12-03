import React from "react";
import Link, { LinkProps } from "next/link";

export default function LinkButton({
  linkProps,
  children,
}: {
  linkProps: LinkProps<string>;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="px-6! w-full! text-14-medium rounded-lg! flex justify-center py-2.5! bg-primary-700! hover:bg-primary-800! duration-200 text-white!"
      {...linkProps}
    >
      {children}
    </Link>
  );
}
