import app from './app.mjs';

const PORT = process.env.PORT || 3000;
//configuracion del puerto del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
