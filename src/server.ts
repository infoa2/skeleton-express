import app from './app';

const PORT = Number(process.env.PORT || 3333);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on: http://localhost:${PORT}`);
});
