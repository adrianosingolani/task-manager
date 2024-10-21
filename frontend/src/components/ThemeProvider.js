import { ConfigProvider } from 'antd';

const ThemeProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#082BF2',
          colorText: '#54595f',
          fontFamily: 'Roboto, sans-serif',
        },
        components: {
          Input: {
            borderRadius: '100px',
          },
          Select: {
            borderRadius: '100px',
          },
          Button: {
            borderRadius: '100px',
          },
        },
        componentSize: 'large',
      }}
    >
      {children}
    </ConfigProvider >
  );
};

export default ThemeProvider;
