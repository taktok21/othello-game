import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  Inventory,
  AttachMoney,
  Repeat,
} from '@mui/icons-material';
import { Product, RepeatItem } from '../types';
import { productsAPI, repeatListAPI } from '../services/api';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography color=\"textSecondary\" gutterBottom variant=\"body2\">
            {title}
          </Typography>
          <Typography variant=\"h5\" component=\"div\">
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [repeatItems, setRepeatItems] = useState<RepeatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, repeatResponse] = await Promise.all([
          productsAPI.getProducts(),
          repeatListAPI.getRepeatItems(),
        ]);
        setProducts(productsResponse.products);
        setRepeatItems(repeatResponse.repeatItems);
      } catch (err: any) {
        setError('データの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity=\"error\">{error}</Alert>;
  }

  // Calculate statistics
  const sellableProducts = products.filter(p => p.isSellable);
  const totalProfit = products.reduce((sum, p) => sum + (p.profit || 0), 0);
  const avgRepeatProfit = repeatItems.length > 0 
    ? repeatItems.reduce((sum, item) => sum + (item.profit || 0), 0) / repeatItems.length 
    : 0;

  return (
    <Box>
      <Typography variant=\"h4\" component=\"h1\" gutterBottom>
        ダッシュボード
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title=\"売り時商品\"
            value={sellableProducts.length}
            icon={<TrendingUp />}
            color=\"#4caf50\"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title=\"登録商品数\"
            value={products.length}
            icon={<Inventory />}
            color=\"#2196f3\"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title=\"予想利益合計\"
            value={`¥${totalProfit.toLocaleString()}`}
            icon={<AttachMoney />}
            color=\"#ff9800\"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title=\"リピート商品数\"
            value={repeatItems.length}
            icon={<Repeat />}
            color=\"#9c27b0\"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant=\"h6\" component=\"h2\" gutterBottom>
                売り時商品
              </Typography>
              {sellableProducts.length === 0 ? (
                <Typography color=\"textSecondary\">
                  現在売り時の商品はありません
                </Typography>
              ) : (
                <Box>
                  {sellableProducts.slice(0, 5).map((product) => (
                    <Box
                      key={product.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 1,
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <Box>
                        <Typography variant=\"body2\" fontWeight=\"bold\">
                          {product.productName || product.asin}
                        </Typography>
                        <Typography variant=\"caption\" color=\"textSecondary\">
                          現在価格: ¥{product.currentPrice?.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography
                        variant=\"body2\"
                        color=\"success.main\"
                        fontWeight=\"bold\"
                      >
                        利益: ¥{product.profit?.toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                  {sellableProducts.length > 5 && (
                    <Typography variant=\"caption\" color=\"textSecondary\" sx={{ mt: 1 }}>
                      他 {sellableProducts.length - 5} 件
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant=\"h6\" component=\"h2\" gutterBottom>
                利益率の高いリピート商品
              </Typography>
              {repeatItems.length === 0 ? (
                <Typography color=\"textSecondary\">
                  リピート商品が登録されていません
                </Typography>
              ) : (
                <Box>
                  {repeatItems
                    .sort((a, b) => (b.profit || 0) - (a.profit || 0))
                    .slice(0, 5)
                    .map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          py: 1,
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <Box>
                          <Typography variant=\"body2\" fontWeight=\"bold\">
                            {item.productName || item.asin}
                          </Typography>
                          <Typography variant=\"caption\" color=\"textSecondary\">
                            現在価格: ¥{item.currentPrice?.toLocaleString()}
                          </Typography>
                        </Box>
                        <Typography
                          variant=\"body2\"
                          color={item.profit && item.profit > 0 ? 'success.main' : 'error.main'}
                          fontWeight=\"bold\"
                        >
                          利益: ¥{item.profit?.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  {repeatItems.length > 5 && (
                    <Typography variant=\"caption\" color=\"textSecondary\" sx={{ mt: 1 }}>
                      他 {repeatItems.length - 5} 件
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;