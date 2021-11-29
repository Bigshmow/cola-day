import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { GET_ALL_ROOMS_RESERVATION_HOURS } from "../../graphql/queries";

export const OrgRoomsTable = () => {
  const { loading, error, data } = useQuery(GET_ALL_ROOMS_RESERVATION_HOURS);
  const roomsHours = useMemo(() => {
    return data?.getAllRoomsReservationHours;
  }, [data]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error</>;

  return <OrgRoomsTableComponent data={roomsHours ?? []} />;
};

const OrgRoomsTableComponent = ({ data }: any) => {
  const columns = useMemo(
    () => [
      {
        Header: "ROOM NUMBER",
        accessor: "number", // accessor is the "key" in the data
      },
      {
        Header: "Reservation",
        accessor: "reservation", // accessor is the "key" in the data
      },
      {
        accessor: "id",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        initialState: {
          hiddenColumns: ["id"],
        },
      },
      useSortBy
    );

  return (
    <div className="card mt-3 mb-0 w-100">
      <div className="table-responsive">
        <table className="table mb-0" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} style={{ borderTop: "0px" }}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
