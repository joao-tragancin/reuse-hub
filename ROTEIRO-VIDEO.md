# Roteiro do vídeo — ReUse Hub

Tempo estimado: **6 a 8 minutos**.

O texto abaixo é um guia. O ideal é explicar com suas próprias palavras em vez de ler tudo exatamente como está.

## 1. Apresentação — 40 segundos

> Olá, meu nome é João Vitor Tragancin e este é o trabalho final da disciplina de Programação IV. O nome da equipe é EcoForge e o sistema desenvolvido se chama ReUse Hub.
>
> A proposta do projeto é facilitar a doação de objetos que não são mais utilizados. Assim, um item que seria descartado pode ser encontrado e reaproveitado por outra pessoa.

Mostre rapidamente a página inicial e o nome da aplicação.

## 2. Tecnologias e organização — 1 minuto

> O frontend foi desenvolvido com React, Vite e TypeScript. No backend eu utilizei Node.js com Express e também TypeScript. Para o banco de dados foi utilizado SQLite junto com o Prisma ORM. O Zod faz a validação dos dados recebidos pela API.
>
> O projeto foi organizado como um monorepositório. A pasta `web` contém a interface e a pasta `api` contém as rotas, as validações e a integração com o banco.

Mostre a estrutura de pastas no editor e abra rapidamente o arquivo `schema.prisma`.

## 3. Listagem, busca e filtros — 1 minuto

> Na tela principal são mostrados os itens cadastrados e a quantidade de itens disponíveis. Cada cartão apresenta a foto, a categoria, o estado de conservação, a cidade e o contato do responsável.
>
> Também é possível pesquisar pelo nome do item, pela descrição ou pela cidade. Os campos ao lado permitem filtrar por categoria e por situação.

Faça uma busca por “livros” e depois limpe o campo. Demonstre um filtro de categoria.

## 4. Cadastro — 1 minuto e 20 segundos

> Agora vou demonstrar a operação de cadastro do CRUD. Ao clicar em “Anunciar item”, é aberto um formulário com as informações necessárias. Alguns campos possuem validações para impedir dados incompletos.

Cadastre um item de exemplo:

- Nome: Mochila escolar;
- Categoria: Outros;
- Estado: Bom;
- Descrição: Mochila usada e conservada, com dois compartimentos;
- Cidade: Joaçaba - SC;
- Contato: seu e-mail ou um contato fictício;
- Foto: pode ficar vazia.

> Depois de salvar, o frontend envia os dados para a API. O backend valida as informações e utiliza o Prisma para gravar o novo registro no banco.

## 5. Edição e alteração de situação — 1 minuto

> Esta é a operação de atualização do CRUD. Posso abrir o formulário de edição, alterar qualquer informação e salvar novamente.

Edite o item criado e acrescente “cor preta” na descrição.

> Quando a doação é concluída, o botão “Marcar como doado” altera a situação do item sem precisar editar todo o cadastro.

Marque o item como doado e mostre a mudança visual no cartão.

## 6. Exclusão — 40 segundos

> A última operação do CRUD é a exclusão. Ao clicar no ícone da lixeira, a aplicação pede uma confirmação para evitar exclusões acidentais.

Exclua o item de exemplo e mostre que ele saiu da listagem.

## 7. API e banco de dados — 50 segundos

> O backend possui rotas GET para leitura, POST para cadastro, PUT e PATCH para atualizações e DELETE para exclusão. Todas as operações modificam a entidade Item definida no Prisma.
>
> A separação entre frontend e backend permite publicar cada parte em uma plataforma diferente. O frontend foi publicado na Vercel e a API foi publicada no Render.

Mostre rapidamente o arquivo de rotas e, depois, a aplicação online.

## 8. Encerramento — 30 segundos

> Como resultado, o MVP atende às operações de CRUD, possui integração com banco de dados e está disponível online. Além do objetivo técnico, a aplicação busca incentivar o reaproveitamento e diminuir o descarte de objetos que ainda podem ser utilizados.
>
> Obrigado por assistir.

Antes de publicar o vídeo, confira se nenhum dado pessoal ou senha aparece na gravação.
