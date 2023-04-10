import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
// import App from "./components/TestForm/test";
// import App from "./components/TableDemo/index";
import BaseDemo from "./components/TableDemo/demo/FixedHeader";
// import App from "./components/TableDemo/CustomCell/FixedHeader";
import Tree from "./components/TableDemo/Tree/FixedHeader";
import RowSpan from "./components/TableDemo/RowSpan/FixedHeader";
import ColSpan from "./components/TableDemo/ColSpan/FixedHeader";
// import App from "./components/TestHook/index";
// import './index.css'
import "@arco-design/web-react/dist/css/arco.css";

const Components: React.FC = () => {
  const [n, setN] = React.useState("BaseDemo");
  const cmp = {
    BaseDemo,
    Tree,
    RowSpan,
    ColSpan,
  };
  const renderComp = React.useMemo(() => {
    const Component = cmp[n];
    return <Component />;
  }, [n]);
  return (
    <div>
      <div style={{ padding: 10 }}>
        {Object.keys(cmp).map((key) => {
          return (
            <button
              key={key}
              onClick={() => {
                setN(key);
              }}
            >
              {key}
            </button>
          );
        })}
      </div>
      <div style={{ padding: 50 }}>{renderComp}</div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Components />
);
