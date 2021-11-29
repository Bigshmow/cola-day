export const IconDisplay = ({ children, times }: any) => {
  return (
    <div className="p-2 d-flex flex-column justify-content-center align-items-center">
      <div>{children}</div>
      <div className="text-nowrap">{times}</div>
    </div>
  );
};
