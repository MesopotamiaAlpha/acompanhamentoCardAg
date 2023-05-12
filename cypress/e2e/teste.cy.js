describe('Acompanhamento Card Google EmbarqueBem', () => {
  it('Procurar por "Princesa dos Campos Pato Branco EmbarqueBem Passagens On-Line", o numero (46) 2604-0718, link wa.me e verificar se o resultado está correto', () => {
    cy.visit('https://www.google.com.br') // Acessa o site do Google

    cy.get('#APjFqb') // Seleciona o campo de busca
      .type('princesa dos campos pato branco') // Escreve o termo a ser buscado
      .type('{enter}') // Pressiona a tecla Enter para realizar a busca

      cy.get('.LrzXr > a > span')
      .should('have.text', '(46) 2604-0718') // Procura pelo texto dentro do DOM


      cy.get('.xFAlBc')
      .should('have.text', 'wa.me') // Procura pelo texto dentro do DOM


      cy.get('.hNKfZe')
      .should('have.text', 'Princesa dos Campos Pato Branco EmbarqueBem Passagens On-Line')
      cy.screenshot({width: 800, height: 600}) // Verifica se o elemento está visível na página
  })
})
