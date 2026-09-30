# SuriBOT - Assistente Virtual Suri (WhatsApp)

Um bot de atendimento automatizado para WhatsApp construído com Node.js e a biblioteca `whatsapp-web.js`. A assistente "Suri" é projetada para realizar a triagem inicial de clientes, exibindo horários de funcionamento e direcionando o contato para os setores corretos da empresa através de links diretos.

## Funcionalidades

* **Menu Interativo:** Triagem de atendimento baseada em opções numéricas simples.
* **Roteamento Inteligente:** Direciona os clientes para o Comercial, Departamento Técnico ou eSocial utilizando links `wa.me` encurtados ou com mensagens pré-programadas.
* **Simulação de Digitação:** Exibe o status "digitando..." no WhatsApp do cliente por 2 segundos antes de enviar a resposta, tornando a interação mais humana e menos robótica.
* **Filtro Anti-Spam:** Ignora automaticamente mensagens recebidas em grupos ou atualizações de status para evitar respostas indevidas.
* **Proteção contra Falhas:** Utiliza blocos `try...catch` que mantêm o robô funcionando perfeitamente mesmo se houver instabilidades no recurso de digitação por parte do WhatsApp.

## Tecnologias Utilizadas

* [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript (Motor do projeto).
* [whatsapp-web.js](https://wwebjs.dev/) - Biblioteca principal de integração com o WhatsApp Web.
* [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal) - Geração visual do QR Code de acesso diretamente no terminal.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (versão LTS recomendada).
* Um número de WhatsApp válido (comum ou Business) conectado no celular e com bateria para ler o QR Code.

## Como Instalar e Rodar

1. **Prepare o ambiente:**
Crie a pasta do projeto e coloque o seu arquivo `index.js` dentro dela. Em seguida, abra o terminal dentro dessa pasta.
2. **Inicie o projeto Node:**
```bash
npm init -y

```


3. **Instale as dependências necessárias:**
```bash
npm install whatsapp-web.js qrcode-terminal

```


4. **Inicie o robô:**
```bash
node index.js

```


5. **Conecte sua conta:**
Um QR Code gigante aparecerá na tela preta do terminal. Abra o WhatsApp no seu celular, acesse **Aparelhos Conectados > Conectar um aparelho** e escaneie o código. Aguarde até que o terminal exiba a mensagem: *"Robô conectado e pronto para uso!"*.

## Estrutura de Opções (Triagem)

Qualquer mensagem inicial enviada por um cliente aciona o menu principal da Suri, que oferece as seguintes opções:

* **Opção 1:** Retorna os dias e horários de funcionamento administrativo e de atendimento, além do endereço físico.
* **Opção 2:** Exibe os links de contato direto para os setores específicos (Comercial, Departamento Técnico e eSocial).
* **Opção 3:** Direciona o cliente para o link direto da Recepção/Atendimento humano.

## Manutenção e Dicas de Uso

* **Salvamento de Sessão:** O bot utiliza a estratégia `LocalAuth`. Isso significa que após ler o QR Code a primeira vez, a sessão fica salva em uma pasta chamada `.wwebjs_auth`. Você não precisará ler o QR Code toda vez que ligar o bot.
* **Desligamento Seguro:** Para desligar o robô, **nunca feche o terminal no botão "X"**. Clique dentro do terminal e pressione `Ctrl + C`. Isso encerra os processos em segundo plano corretamente.
* **Erro de Travamento (EBUSY):** Se o terminal for fechado à força, o banco de dados pode ficar travado. Para resolver, basta finalizar o Node.js no Gerenciador de Tarefas do Windows, apagar a pasta `.wwebjs_auth` e rodar o bot novamente.
* **Limites do WhatsApp:** Como esta solução simula o uso do WhatsApp Web, evite realizar disparos de mensagens em massa para não configurar SPAM e causar o banimento do número.