import React from "react";
import styled from "styled-components";

// スタイルドコンポーネントの定義
const StyledVerticalAdjuster = styled.div`
  margin: auto;
  max-width: ${(props) => props.maxWidth}px;
`;

// VerticalAdjusterコンポーネントの定義
export const VerticalAdjuster = ({
  maxWidth = 704,
  className = "",
  children,
}) => {
  return (
    <StyledVerticalAdjuster maxWidth={maxWidth} className={className}>
      {children}
    </StyledVerticalAdjuster>
  );
};

export default VerticalAdjuster;