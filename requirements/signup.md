# Cadastro

> ## Caso de sucesso:
1. :heavy_check_mark: Recebe uma requisição do tipo **POST** na rota **/api/signup**
1. :heavy_check_mark: Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
1. :heavy_check_mark: Valida que **password** e **passwordConfirmation** são iguais
1. :heavy_check_mark: Valida que o campo **email** é um e-mail válido
1. :x: Valida se já existe um usuário com email fornecido
1. :heavy_check_mark: Gera uma senha criptografada (essa senha não pode ser descriptografada)
1. :heavy_check_mark: Cria uma conta para usuário com os dados informados, substituindo a senha criptografada por uma senha em hash
1. :heavy_check_mark: Gera um token de acesso a partir do ID do usuário
1. :heavy_check_mark: Atualiza os dados do usuário com o token de acesso gerado
1. :heavy_check_mark: Retorna 200 com o token de acesso

> ## Exceções
1. :heavy_check_mark: Retorna erro 404 se a API não existir
1. :heavy_check_mark: Retorna erro 400 se **name**, **email**, **password** ou **passwordConfirmation** não forem fornecidos pelo client
1. :heavy_check_mark: Retorna erro 400 se **password** e **passwordConfirmation** não forem iguais
1. :heavy_check_mark: Retorna erro 400 se campo **email** for um e-mail inválido
1. :heavy_check_mark: Retorna erro 400 se o campo **email** for um e-mail inválido
1. :heavy_check_mark: Retorna erro 403 se o e-mail fornecido já estiver em uso
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar gerar uma senha criptografada
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar criar a conta do usuário
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar gerar o token de acesso
1. :heavy_check_mark: Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso