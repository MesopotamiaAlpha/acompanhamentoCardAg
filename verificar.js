const { exec } = require('child_process');
const fs = require('fs');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: 'Verfificando se perfil passou por atualização',
    task: (ctx, task) => {
      return new Promise((resolve, reject) => {
        exec('npx cypress run teste', (error, stdout, stderr) => {
          if (stdout.includes('✔')) {
            ctx.resultado = 'Perfil está correto como esperado';
            task.output = 'Resultado anterior: \x1b[32mTexto encontrado\x1b[0m';
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

function run() {
  tasks.run().then(() => {
    setTimeout(run, 10000); // Repete o teste após 10 segundos
  }).catch(() => {
    setTimeout(run, 0); // Repete o teste imediatamente em caso de erro
  });
}

console.log('Iniciando programa em loop');
run();
