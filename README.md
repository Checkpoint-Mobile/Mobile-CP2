# 1) Baixar e entrar na pasta

# 2) Instalar dependências
npm install

# 3) (garante versões compatíveis do Expo)
npx expo install expo-contacts expo-linking expo-sharing expo-file-system expo-asset

# 4) Iniciar o projeto
npm run start



Integrantes: 
- Guilherme Dal Posolo Matheus - 98694 
- Guilherme Faustino Vargas - 98278
- João Lucas Yudi Hedi Handa - 98458
- Ryan Perez Pacheco - 98782



6) Solução de problemas comuns

ETARGET @types/react-native
O RN já inclui os tipos; não instale @types/react-native.
Se vir esse erro, remova do package.json e rode npm install.

Error: The required package expo-asset cannot be found
Instale:

npx expo install expo-asset
