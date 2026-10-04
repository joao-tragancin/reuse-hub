# Como publicar o ReUse Hub

Este passo deve ser feito depois que o projeto estiver em um repositório no GitHub.

## 1. Publicar o backend no Render

1. Entre em [render.com](https://render.com) usando sua conta do GitHub.
2. Clique em **New** e depois em **Blueprint**.
3. Selecione o repositório do ReUse Hub. O Render utilizará o arquivo `render.yaml`.
4. No campo `CORS_ORIGIN`, informe temporariamente `http://localhost:5173`.
5. Aguarde a publicação e copie o endereço gerado, parecido com `https://reuse-hub-api.onrender.com`.
6. Teste o endereço acrescentando `/health`. A resposta deve conter `"status": "ok"`.

No plano gratuito, o SQLite pode ser recriado após uma nova publicação ou reinicialização do serviço. Para a demonstração do MVP, os três itens de exemplo são cadastrados automaticamente quando o banco está vazio.

## 2. Publicar o frontend na Vercel

1. Entre em [vercel.com](https://vercel.com) usando sua conta do GitHub.
2. Clique em **Add New Project** e escolha o repositório.
3. Em **Root Directory**, selecione `apps/web`.
4. Confirme que o framework detectado é **Vite**.
5. Cadastre a variável `VITE_API_URL` com o endereço do backend, sem barra no final.
6. Clique em **Deploy** e copie o endereço da aplicação.

## 3. Liberar o frontend no backend

1. Volte ao serviço no Render.
2. Altere `CORS_ORIGIN` para o endereço criado pela Vercel, por exemplo `https://reuse-hub.vercel.app`.
3. Salve a variável e aguarde o serviço reiniciar.
4. Abra o frontend e teste o cadastro de um item.

## 4. Finalizar o README

Substitua os três campos pendentes na seção **Deploy** do `README.md` e adicione o link do vídeo quando ele for publicado.
