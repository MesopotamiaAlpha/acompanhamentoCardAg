const { exec } = require('child_process');
const fs = require('fs');
const Listr = require('listr');
const venom = require('venom-bot');
const qrcode = require('qrcode-terminal');

const tasks = new Listr([
  {
    title: 'Verfificando se perfil passou por atualização',
    task: (ctx, task) => {
      return new Promise((resolve, reject) => {
        exec('npx cypress run teste', (error, stdout, stderr) => {
          if (stdout.includes('✔')) {
            ctx.resultado = 'Perfil está correto como esperado';
            task.output = 'Resultado anterior: \x1b[32mPagina continua como esperado\x1b[0m';
            fs.writeFileSync('resultado.txt', ctx.resultado);
            resolve();
          } else {
            ctx.resultado = 'Perfil passou por mudanças, disparando alertas';
            task.output = 'Resultado anterior: \x1b[31mUm dos campos foi identificado alterado\x1b[0m';
            fs.writeFileSync('resultado.txt', ctx.resultado);
            reject();
          }
        });
      });
    }
  }
]);

function run(client) {
  tasks.run().then(() => {
    setTimeout(() => {
      run(client);
    }, 10000); // Repete o teste após 10 segundos
  }).catch(() => {
    const message = 'Perfil alterado, acione o responsável';
    const numbers = ['5512981006992', '5512981006992', '5512981006992', '5512981006992'];
    sendMessage(client, numbers);
    setTimeout(() => {
      run(client);
    }, 0); // Repete o teste imediatamente em caso de erro
  });
}


function sendMessage(client, numbers) {
  const message = 'Perfil alterado, acione o responsável';
  numbers.forEach((number) => {
    if (client && client.sendText) {
      client.sendText(`${number}@c.us`, message)
        .then(() => console.log(`Mensagem enviada para os responsaveis`))
        .catch((error) => console.error(`Erro ao enviar mensagem para ${number}:`, error));
    } else {
      console.error('Erro: cliente não está definido ou não tem o método sendText');
    }
  });
}

venom
  .create()
  .then((client) => {
    const cliente = client;
    console.log('Iniciando programa em loop');
    run(client);
    client.onStreamChange((state) => {
      console.log('Estado do cliente:', state);
    });

    client.onReady(() => {
      console.log('Cliente iniciado com sucesso!');
      qrcode.generate(client.base64QrCode, { small: true });
    });

    client.onIncomingCall((call) => {
      client.sendText(call.peerJid, 'Desculpe, não é possível atender ligações.');
    });

    client.onMessage((message) => {
      if (message.body === 'ping') {
        client.sendText(message.from, 'pong');
      }
    });
  })
  .catch((error) => {
    console.error('Erro ao iniciar cliente:', error);
  });
