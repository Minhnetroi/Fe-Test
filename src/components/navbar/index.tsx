import { Menu } from 'antd';

const Navbar = () => {
  return (
    <div style={{ backgroundColor: '#007bff', padding: '10px 0' }}>
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Menu.Item key="home" style={{ fontWeight: 'bold' }}>
          <a href="/" style={{ color: '#fff' }}>HOME</a>
        </Menu.Item>
        <Menu.Item key="dashboard" style={{ fontWeight: 'bold' }}>
          <a href="/dashboard" style={{ color: '#fff' }}>DASHBOARD</a>
        </Menu.Item>
        <Menu.Item key="contact" style={{ fontWeight: 'bold' }}>
          <a href="/contact" style={{ color: '#fff' }}>CONTACT</a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
