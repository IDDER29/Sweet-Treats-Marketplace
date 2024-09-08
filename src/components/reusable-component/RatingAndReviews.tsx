import React from "react";
import InputField from "./InputField";

function RatingField() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <InputField
        id="product-rating"
        label="Rating"
        type="number"
        placeholder="0"
        min="0"
        max="5"
        step="0.1"
      />
      <InputField
        id="product-review-count"
        label="Review Count"
        type="number"
        placeholder="0"
        min="0"
      />
    </div>
  );
}
export default RatingField;
