#!/bin/bash

echo "Iniciando instalação dos pacotes..."

# Verifica se o pacote `listr` está instalado
if npm list -g listr | grep "listr@" > /dev/null; then
  echo -e "\e[32mPacote listr já instalado\e[0m"
else
  echo -e "\e[33mInstalando pacote listr...\e[0m"
  npm install --save listr > /dev/null 2>&1
  if [[ $? -eq 0 ]]; then
    echo -e "\e[32mPacote listr instalado com sucesso\e[0m"
  else
    echo -e "\e[31mErro ao instalar o pacote listr\e[0m"
    exit 1
  fi
fi

# Verifica se o pacote `cypress` está instalado
if npm list -g cypress | grep "cypress@" | grep -v "up to date" > /dev/null; then
  echo -e "\e[33mAtualizando pacote cypress...\e[0m"
  npm update -g cypress > /dev/null 2>&1
  if [[ $? -eq 0 ]]; then
    echo -e "\e[32mPacote cypress atualizado com sucesso\e[0m"
  else
    echo -e "\e[31mErro ao atualizar o pacote cypress\e[0m"
    exit 1
  fi
elif npm list -g cypress | grep "cypress@" > /dev/null; then
  echo -e "\e[32mPacote cypress já instalado e atualizado\e[0m"
else
  echo -e "\e[33mInstalando pacote cypress...\e[0m"
  npm install cypress --save-dev > /dev/null 2>&1
  if [[ $? -eq 0 ]]; then
    echo -e "\e[32mPacote cypress instalado com sucesso\e[0m"
  else
    echo -e "\e[31mErro ao instalar o pacote cypress\e[0m"
    exit 1
  fi
fi

# Instala o pacote `qrcode-terminal`
if npm list -g qrcode-terminal | grep "qrcode-terminal@" > /dev/null; then
  echo -e "\e[32mPacote qrcode-terminal já instalado\e[0m"
else
  echo -e "\e[33mInstalando pacote qrcode-terminal...\e[0m"
  npm install -g qrcode-terminal > /dev/null 2>&1
  if [[ $? -eq 0 ]]; then
    echo -e "\e[32mPacote qrcode-terminal instalado com sucesso\e[0m"
  else
    echo -e "\e[31mErro ao instalar o pacote qrcode-terminal\e[0m"
    exit 1
  fi
fi

echo "Instalação dos pacotes finalizada"
