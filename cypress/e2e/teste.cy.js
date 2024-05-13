describe('Acompanhamento Card Google EmbarqueBem', () => {
  //dentro do it foi colocado a descrição do que o teste deve fazer
  it('#####', () => {
    cy.visit('https://www.google.com.br') // Acessa o site do Google

    cy.get('#APjFqb') // Seleciona o campo de busca pelo inspectdo navegador e selecionando o id do campo
      .type('TERMO A BUSCAR AQUI') // Escreve o termo a ser buscado
      .type('{enter}') // Pressiona a tecla Enter para realizar a busca

      cy.get('.LrzXr > a > span')// Seleciona o campo de busca pelo inspectdo navegador e selecionando o id do campo
      .should('have.text', 'TEXTO A SER PROCURADO') // Procura pelo texto dentro do DOM


      cy.get('.xFAlBc')
      .should('have.text', 'TEXTO A SER PROCURADO') // Procura pelo texto dentro do DOM


      cy.get('.hNKfZe')
      .should('have.text', 'TEXTO A SER PROCURADO')
      cy.screenshot({width: 800, height: 600}) // Verifica se o elemento está visível na página
  })
})
