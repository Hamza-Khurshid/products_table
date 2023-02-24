import React, { useMemo } from "react";

export default function Column({
  column,
  handleOnSort,
  sortByColumn,
  sortByOrder,
}) {
  const renderSortIcon = useMemo(() => {
    if (sortByColumn === column) {
      return sortByOrder === "asc" ? "↑" : "↓";
    }
    return "";
  }, [sortByColumn, sortByOrder, column]);

  return (
    <th
      key={column}
      onClick={() => handleOnSort(column)}
      style={{
        minWidth: "200px",
        border: "1px black solid",
        cursor: "pointer",
      }}
    >
      {column} {renderSortIcon}
    </th>
  );
}
