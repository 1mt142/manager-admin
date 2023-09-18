import { Triangle } from "react-loader-spinner";

function LoaderComponent() {
  return (
    <Triangle
      height="200"
      width="200"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 111,
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}

export default LoaderComponent;
