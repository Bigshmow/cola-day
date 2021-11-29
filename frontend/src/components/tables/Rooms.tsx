import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { GET_ALL_ROOMS_RESERVATION_HOURS } from "../../graphql/queries";
import { ReactComponent as CokeIcon } from "../../assets/svg/coke.svg";
import { ReactComponent as PepsiIcon } from "../../assets/svg/pepsi.svg";
import { ReactComponent as EmptyIcon } from "../../assets/svg/empty.svg";
import { getTimes } from "../../functional/getTimes";
import { IconDisplay } from "../IconDisplay";

export const RoomsTable = () => {
  const { loading, error, data } = useQuery(GET_ALL_ROOMS_RESERVATION_HOURS);
  const roomsHours = useMemo(() => {
    return data?.getAllRoomsReservationHours;
  }, [data]);

  if (loading) return <>Loading...</>;
  if (error) return <>Error</>;

  return <RoomsTableComponent data={roomsHours ?? []} />;
};

const RoomsTableComponent = ({ data }: any) => {
  const columns = useMemo(
    () => [
      {
        Header: "ROOM NUMBER",
        accessor: "number", // accessor is the "key" in the data
        Cell: ({ value }: any) => {
          return <div style={{ textAlign: "center" }}>{value}</div>;
        },
      },
      {
        Header: "HOUR BLOCK",
        accessor: "reservations", // accessor is the "key" in the data
        Cell: ({ value: reservations }: any) => {
          const timesArr = getTimes();
          return (
            <div className="d-flex justify-content-between">
              {reservations.map((blockOwner: string | null, i: number) => {
                if (blockOwner !== null) {
                  return (
                    <span key={i}>
                      {blockOwner === "pepsi" ? (
                        <IconDisplay
                          children={<PepsiIcon />}
                          times={timesArr[i]}
                        />
                      ) : (
                        <IconDisplay
                          children={<CokeIcon />}
                          times={timesArr[i]}
                        />
                      )}
                    </span>
                  );
                } else {
                  return (
                    <IconDisplay
                      key={i}
                      children={<EmptyIcon />}
                      times={timesArr[i]}
                    />
                  );
                }
              })}
            </div>
          );
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
