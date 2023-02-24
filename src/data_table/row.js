import React from "react";

export default function Row({ row, cols }) {
  return (
    <tr key={row.id}>
      {cols.map((col) => (
        <td key={col}>{row[col]}</td>
      ))}
    </tr>
  );
}
