const { exec } = require('child_process');
const fs = require('fs');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: 'Executando teste',
    task: (ctx, task) => {
      return new Promise((resolve, reject) => {
        exec('npx cypress run teste', (error, stdout, stderr) => {
          if (stdout.includes('✔')) {
            ctx.resultado = 'Texto encontrado';
            task.output = 'Resultado anterior: \x1b[32mTexto encontrado\x1b[0m';
            fs.writeFileSync('resultado.txt', ctx.resultado);
            resolve();
          } else {
            ctx.resultado = 'Não foi localizado o texto';
            task.output = 'Resultado anterior: \x1b[31mNão foi localizado o texto\x1b[0m';
            fs.writeFileSync('resultado.txt', ctx.resultado);
            reject();
          }
        });
      });
    }
  }
]);

function run() {
  tasks.run().then(() => {
    setTimeout(run, 10000); // Repete o teste após 10 segundos
  }).catch(() => {
    setTimeout(run, 0); // Repete o teste imediatamente em caso de erro
  });
}

console.log('Iniciando programa em loop');
run();
