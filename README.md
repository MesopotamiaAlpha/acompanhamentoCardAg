# Acompanhador do card Google

Este projeto está descontinuado de momento. O projeto não foi finalizado e está com funcionamento parcial.
O projeto foi desenvolvido para resolver um problema que uma empresa teve, determinada agencia possui um card de divulgação na pagina de pesquisa da google, no momento da pesquisa pela agencia aparece um card a direita com o numero de telefone da empresa. Em um determinado dia houve uma alteração deste numero onde os donos perceberam esta mudança depois de um tempo grande, foi neste momento que resolvi criar algum tipo de monitoramento deste campo de telefone para que caso haja alguma mudança isso fosse sinalizado por whatsapp rapidamente.

Então pensei em usar o cypress para que ele acesse a pagina do google, faça a pesquisa pelo nome da agencia e assim que o resultado aparecer ele conferisse se o campo que quero controlar foi alterado ou não. Caso ele tenha sido alterado ele iria acionar 3 pessoas direto no whatsapp que o campo foi alterado, assim tendo um tempo de reação para correção mais rapido.



!!!execute npx cypress run teste pela primeira vez!!

### instalar o pacote cypress
```
npm install cypress --save-dev
```

### rodar o somente o teste cypress
```
npx cypress run teste
```

### instalar pacote para animações 

```
npm install --save listr
```

### rodar o programa geral
```
node verificar.js
```

### criado instalador para o processo automatico

### caso o servidor faltar dependencias do cypress rode


```
apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
```


instalação do pm2 para deixar ele olhando o repositorio para qualquer mudança

npm install pm2 -g