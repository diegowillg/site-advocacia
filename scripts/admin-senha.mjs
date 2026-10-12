// Gera as variáveis de acesso ao painel /admin.
// Uso: npm run admin:senha -- "sua senha forte"
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Informe uma senha com pelo menos 10 caracteres: npm run admin:senha -- "sua senha"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log("\nCopie estas linhas para o arquivo .env do servidor:\n");
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("base64")}:${hash.toString("base64")}`);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString("base64url")}`);
console.log("\nDefina também ADMIN_EMAIL com o e-mail de login.\n");
