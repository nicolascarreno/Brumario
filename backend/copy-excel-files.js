const fs = require('fs');
const path = require('path');

// Copiar archivos Excel del directorio src/db/ a dist/db/
const srcDir = path.join(__dirname, 'src/db');
const distDir = path.join(__dirname, 'dist/db');

// Crear directorio dist/db/ si no existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('✅ Directorio dist/db/ creado');
}

// Archivos Excel a copiar
const archivosExcel = [
  'Jugadores_Historico.xlsx',
  'Once_Historico.xlsx'
];

console.log('📋 Copiando archivos Excel...');
archivosExcel.forEach(archivo => {
  const srcPath = path.join(srcDir, archivo);
  const distPath = path.join(distDir, archivo);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, distPath);
    console.log(`✅ ${archivo} copiado a dist/db/`);
  } else {
    console.error(`❌ Error: No se encontró el archivo ${srcPath}`);
    process.exit(1);
  }
});

console.log('✅ Archivos Excel copiados correctamente');

