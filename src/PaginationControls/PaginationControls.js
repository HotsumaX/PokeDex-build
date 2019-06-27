import React from "react";

const PaginationControls = ({ page, onClick }) => {
  const PageButton = ({ number }) => (
    <button
      style={
        page === number
          ? { fontWeight: "bold", fontSize: 24, padding: 15 }
          : { fontSize: 24, padding: 15 }
      }
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  );

  const dynamicNumbers = [page - 2, page - 1, page, page + 1, page + 2];

  return (
    <div style={styles.container}>
      {page !== 1 && (
        <button
          style={{ fontSize: 24, padding: 15 }}
          onClick={() => onClick(page - 1)}
        >
          &lt;
        </button>
      )}
      {page >= 3 ? (
        <>
          {dynamicNumbers.map(dynum => {
            return <PageButton id={dynum} number={dynum} />;
          })}
        </>
      ) : (
        <>
          {[1, 2, 3, 4, 5].map(arrayNumber => (
            <PageButton number={arrayNumber} />
          ))}
        </>
      )}
      <button
        style={{ fontSize: 24, padding: 15 }}
        onClick={() => onClick(page + 1)}
      >
        >
      </button>
    </div>
  );
};

const styles = {
  container: {
    background: "mistyrose",
    height: "7em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const testing = {
  lests something with this
 }

export default PaginationControls;
