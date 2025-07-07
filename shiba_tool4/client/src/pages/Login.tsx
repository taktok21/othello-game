import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import { useAuthContext } from '../components/AuthContext';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role=\"tabpanel\"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Login: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keeperApiKey: '',
    rakutenId: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuthContext();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (tabValue === 0) {
        await login(formData.email, formData.password);
      } else {
        await register(
          formData.email,
          formData.password,
          formData.keeperApiKey || undefined,
          formData.rakutenId || undefined
        );
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component=\"main\" maxWidth=\"sm\">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', mt: 3 }}>
          <Typography component=\"h1\" variant=\"h4\" align=\"center\" sx={{ pt: 3 }}>
            Shiba Tool 4
          </Typography>
          <Typography variant=\"subtitle1\" align=\"center\" sx={{ mb: 2 }}>
            せどり・物販管理ツール
          </Typography>

          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label=\"ログイン\" />
            <Tab label=\"新規登録\" />
          </Tabs>

          {error && (
            <Box sx={{ px: 3, pt: 2 }}>
              <Alert severity=\"error\">{error}</Alert>
            </Box>
          )}

          <TabPanel value={tabValue} index={0}>
            <Box component=\"form\" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin=\"normal\"
                required
                fullWidth
                id=\"email\"
                label=\"メールアドレス\"
                name=\"email\"
                autoComplete=\"email\"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                margin=\"normal\"
                required
                fullWidth
                name=\"password\"
                label=\"パスワード\"
                type=\"password\"
                id=\"password\"
                autoComplete=\"current-password\"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                type=\"submit\"
                fullWidth
                variant=\"contained\"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box component=\"form\" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin=\"normal\"
                required
                fullWidth
                id=\"email\"
                label=\"メールアドレス\"
                name=\"email\"
                autoComplete=\"email\"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextField
                margin=\"normal\"
                required
                fullWidth
                name=\"password\"
                label=\"パスワード\"
                type=\"password\"
                id=\"password\"
                autoComplete=\"new-password\"
                value={formData.password}
                onChange={handleInputChange}
              />
              <TextField
                margin=\"normal\"
                fullWidth
                name=\"keeperApiKey\"
                label=\"キーパーAPIキー（オプション）\"
                type=\"text\"
                value={formData.keeperApiKey}
                onChange={handleInputChange}
                helperText=\"商品データ取得に必要です。後で設定することも可能です。\"
              />
              <TextField
                margin=\"normal\"
                fullWidth
                name=\"rakutenId\"
                label=\"楽天ID（オプション）\"
                type=\"text\"
                value={formData.rakutenId}
                onChange={handleInputChange}
                helperText=\"楽天連携に必要です。後で設定することも可能です。\"
              />
              <Button
                type=\"submit\"
                fullWidth
                variant=\"contained\"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? '登録中...' : '新規登録'}
              </Button>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;