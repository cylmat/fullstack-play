import React from "react";

export default function Logo(props: {
  href: string;
  src: string;
  classname: string;
  alt: string;
}) {
  const { href, src, classname, alt } = props;
  return (
    <a href={href} target="_blank">
      <img src={src} className={classname} alt={alt} />
    </a>
  );
}
