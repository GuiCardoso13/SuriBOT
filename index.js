const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('Escaneie este QR Code no seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Robô conectado e pronto para uso!');
});

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async (msg) => {
    if (msg.from.includes('@g.us') || msg.from === 'status@broadcast') return;

    const texto = msg.body ? msg.body.toLowerCase() : '';

    try {
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        await delay(1500);
    } catch (erro) {
        await delay(1500);
    }

    if (texto === '1') {
        await msg.reply('🕒 Nosso horário de funcionamento é de Segunda a Sexta - \nAtendimento das 07h às 11:30h. \nAdministrativo em geral das 07h às 16:48h.\n\n📍 *Endereço:*  Rua Expedicionário Souza Filho, 409 - Centro, Boituva - SP');
    } 
    else if (texto === '2') {
        const msgComercial = encodeURIComponent("Olá! Estava falando com a Suri e gostaria de atendimento Comercial.");
        const msgTecnico = encodeURIComponent("Olá! Estava falando com a Suri e preciso de Suporte Técnico.");
        const msgEsocial = encodeURIComponent("Olá! Estava falando com a Suri e preciso de ajuda com o eSocial.");

        const setores = `🚀 *Nossos setores:*\nClique no link do setor para iniciar a conversa:\n\n📈 *Comercial:*\n👉 https://wa.me/5515998180754?text=${msgComercial}\n\n🔧 *Departamento técnico:*\n👉 https://wa.me/5515991051205?text=${msgTecnico}\n\n📊 *eSocial:*\n👉 https://wa.me/5515992373195?text=${msgEsocial}`;

        await msg.reply(setores);
    } 
    else if (texto === '3') {
        const msgHumano = encodeURIComponent("Olá! Gostaria de falar com um atendente humano, por favor.");
        await msg.reply(`👨‍💻 Certo! Estou transferindo você. Clique no link abaixo para falar com nossa recepção:\n\n👉 https://wa.me/5515992371296?text=${msgHumano}`);
    } 
    else {
        const menu = `*Olá! Bem-vindo(a) ao nosso atendimento, eu sou a Suri e vou te ajudar hoje!* 👋\n\nPor favor, responda com o *número* da opção desejada:\n\n*1️⃣* - Horário de funcionamento/Endereço\n*2️⃣* - Ver nossos setores\n*3️⃣* - Falar com um atendente humano`;
        await msg.reply(menu);
    }
});

client.initialize();