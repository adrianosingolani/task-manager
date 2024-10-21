import { Spin, Typography } from 'antd';

const { Title } = Typography;

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
      }}
    >
      <Spin size="large" />
      <Title level={2}>carregando...</Title>
    </div>
  );
};

export default Loading;
