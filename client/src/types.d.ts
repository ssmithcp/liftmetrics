import store from './store';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type Instant = Date;

type Weight = string;
type WeightUnit = 'lb' | 'kg';