import React from "react";
import Column from "./column";
import Row from "./row";

export default function Table({ cols, rows, isLoading }) {
  const [sortByOrder, setSortByOrder] = React.useState("asc");
  const [sortByColumn, setSortByColumn] = React.useState("");

  const handleOnSort = (col) => {
    if (sortByColumn === col) {
      setSortByOrder(sortByOrder === "asc" ? "desc" : "asc");
    } else {
      setSortByColumn(col);
      setSortByOrder("asc");
    }
  };

  function sortData(arr) {
    if (arr.lenght === 0 || sortByColumn === "") return arr;

    // Check if the array contains numbers or strings
    const firstElement = arr?.[0]?.[sortByColumn];
    const isNumberArray = typeof firstElement === "number";

    // Sort the array
    if (isNumberArray) {
      // Sort array of numbers in the specified order
      arr.sort((a, b) =>
        sortByOrder === "desc"
          ? b[sortByColumn] - a[sortByColumn]
          : a[sortByColumn] - b[sortByColumn]
      );
    } else {
      // Sort array of strings in the specified order
      arr.sort((a, b) =>
        sortByOrder === "desc"
          ? b[sortByColumn].localeCompare(a[sortByColumn])
          : a[sortByColumn].localeCompare(b[sortByColumn])
      );
    }

    // Return the sorted array
    return arr;
  }

  return (
    <table>
      <thead>
        <tr>
          {cols.map((col) => (
            <Column
              key={col}
              column={col}
              sortByColumn={sortByColumn}
              sortByOrder={sortByOrder}
              handleOnSort={handleOnSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {
          // Show loading indicator if the data is being fetched
          isLoading && (
            <tr>
              <td colSpan={cols.length}>Loading...</td>
            </tr>
          )
        }
        {sortData(rows).map((row) => (
          <Row key={row.id} row={row} cols={cols} />
        ))}
      </tbody>
    </table>
  );
}
