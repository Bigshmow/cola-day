import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { GET_RESERVATIONS_BY_ORG_ID } from "../../graphql/queries";
import { DeleteButton } from "../buttons/DeleteButton";

export const OrgRoomsTable = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS_BY_ORG_ID);
  const roomsHours = useMemo(() => {
    return data?.getReservationsByOrgId;
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
        accessor: "number",
      },
      {
        Header: "Reservation Start",
        accessor: "reservationStart",
      },
      {
        Header: "Reservation End",
        accessor: "reservationEnd",
      },
      {
        Header: "",
        accessor: "resId",
        Cell: ({ value: resId }: any) => {
          return <button className="btn btn-info">Edit</button>;
        },
      },
      {
        Header: "",
        accessor: "resId",
        id: "deleteBtn",
        Cell: ({ value: resId }: any) => {
          return <DeleteButton resId={resId} />;
        },
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
          sortBy: [
            {
              id: "number",
            },
          ],
        },
      },
      useSortBy
    );

  return (
    <div className="card mt-3 mb-0 w-100">
      <div className="card-header text-center">
        <h1>Organization Reservations</h1>
      </div>
      <div className="table-responsive">
        <table className="table mb-0" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
