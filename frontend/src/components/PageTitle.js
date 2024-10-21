import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const styles = {
  color: '#6510dd',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 200,
  fontStyle: 'normal',
  letterSpacing: '0px',
  margin: 0
};

const PageTitle = ({ children }) => {
  return (
    <Title level={2} style={styles}>{children}</Title>
  );
};

export default PageTitle;