import React from "react";

interface IProps {
  demo: React.ReactNode;
}

const TestPath: React.FC<IProps> = (props) => {
  const { demo } = props;
  return <div>TestPathindex --- {demo}</div>;
};

export default TestPath;
