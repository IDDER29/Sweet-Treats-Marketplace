import React from "react";

function Section({ title, children }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
      <hr className="my-4" />
    </div>
  );
}

export default Section;
