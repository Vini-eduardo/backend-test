import multer from 'multer';
import path from 'path';

// Função que gera um nome aleatório com 16 caracteres alfanuméricos
function generateRandomName(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let name = '';
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

// Configuração para upload genérico (ex: PDF, anexos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // mantém a extensão original
    const filename = `${generateRandomName()}${ext}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });

// Configuração para upload de capas de livros
const storageCapa = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'cover'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // mantém a extensão
    const filename = `${generateRandomName()}${ext}`;
    cb(null, filename);
  }
});

export const uploadCapa = multer({ storage: storageCapa });
