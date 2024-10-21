"use client";

import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import PageTitle from '../../components/PageTitle';

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (values) => {
    setError('');
    setLoading(true);

    try {
      const response = await signup(values.name, values.email, values.password);
      console.log(response);
      router.push('/tasks');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <PageTitle>Cadastro</PageTitle>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}

        <Form onFinish={handleSignup} layout="vertical">
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
          >
            <Input placeholder="Digite seu nome" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
          >
            <Input type="email" placeholder="Digite seu email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                backgroundColor: '#082BF2',
                borderColor: '#082BF2',
              }}
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
        <div>
          <a href="/login">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
}