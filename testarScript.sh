#!/bin/bash

# Define as dependências a serem instaladas
packages=(
  "listr"
  "cypress"
  "libgtk-3-0"
  "libgdk-pixbuf2.0-dev"
  "libgbm-dev"
  "libnotify-dev"
  "libgconf-2-4"
  "libnss3"
  "libxss1"
  "libasound2"
  "libxtst6"
  "xauth"
  "xvfb"
)

# Função para imprimir a animação de loading
function loading() {
  local pid=$1
  local delay=0.2
  local spinstr='|/-\'
  while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
    local temp=${spinstr#?}
    printf " [\033[33m%s\033[0m] " "$spinstr"
    local spinstr=$temp${spinstr%"$temp"}
    sleep $delay
    printf "\b\b\b\b\b\b"
  done
  printf "    \b\b\b\b"
}

# Função para instalar as dependências
function install_packages() {
  for package in "${packages[@]}"; do
    echo -n "Instalando $package... "
    # Verifica se o pacote já está instalado
    if [[ $(dpkg-query -W -f='${Status}' "$package" 2>/dev/null | grep -c "ok installed") -eq 1 ]]; then
      echo -e "\033[32mjá instalado\033[0m"
    else
      # Tenta instalar o pacote
      sudo apt-get -qq install "$package" & loading $!
      # Verifica se a instalação foi bem sucedida
      if [[ $? -eq 0 ]]; then
        echo -e "\033[32minstalado com sucesso\033[0m"
      else
        echo -e "\033[31merro na instalação\033[0m"
      fi
    fi
  done
}

echo "Iniciando instalação dos pacotes:"
echo "---------------------------------"
install_packages
echo "---------------------------------"

# Verifica se a instalação foi bem sucedida
if [[ $(apt list --upgradable 2>/dev/null | grep -c "up to date") -eq ${#packages[@]} ]]; then
  echo -e "\033[32mTodos os pacotes foram instalados corretamente!\033[0m"
else
  echo -e "\033[31mHouve um erro durante a instalação dos pacotes!\033[0m"
fi
