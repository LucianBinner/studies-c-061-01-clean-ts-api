# Criar Enquete

> ## Caso de sucesso:
1. :x: Recebe uma requisição do tipo **POST** na rota **/api/surveys**
1. :x: Valida se a requisição foi feita por um administrador
1. :x: Valida dados obrigatórios **question** e **answers**
1. :x: Cria um enquete com os dados fornecidos
1. :x: Retorna 200 com os dados da enquete

> ## Exceções
1. :x: Retorna erro 404 se a API não existir
1. :x: Retorna erro 403 se o usuário não for administrador
1. :x: Retorna erro 400 se **question** ou **answers** não forem fornecidos pelo client
1. :x: Retorna erro 500 se der erro ao tentar criar a enquete