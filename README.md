# 🤖 FREE CHAT GPT 3.5 TURBO

### - Instalação

```bash
$ npm install free-chatgpt-3.5-turbo-api
```

### - Importar

```js
import { chatGPT } from "free-chatgpt-3.5-turbo-api";
```

### - Exemplo

```js
chatGPT({ prompt: "Eae tudo bem?"})
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });
```