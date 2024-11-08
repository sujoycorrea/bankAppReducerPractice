export default function Notification({ children, bgColor = "black" }) {
  const options = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: bgColor,
    color: "white",
    fontFamily: "Noto Sans, sans-serif",
    fontSize: "1em",
    marginTop: "15px",
    padding: "8px",
    borderRadius: "5px",
  };
  return <div style={options}>{children}</div>;
}
