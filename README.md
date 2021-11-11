# Requisitos
1- Possuir o node v12@latest ou maior;<br>
2- possuir o projeto https://github.com/Nimbo1999/spring-boot-jpa-security rodando em sua máquina.<br>
3- possuir a variável de ambiente NEXT_PUBLIC_API_BASE_URL configurada.

<hr><br>

# instalando e rodando localmente

1 - Adicione a variável de ambiente NEXT_PUBLIC_API_BASE_URL criando um arquivo .env.local na pasta raiz do projeto com o valor: http://localhost:8080 para utilizarmos como a base url do backend<br><br>
Exemplo: ```NEXT_PUBLIC_API_BASE_URL=http://localhost:8080```<br><br>

2 - Clonar o repositório<br>
```git clone https://github.com/Nimbo1999/spring-jpa-security-front.git```

3 - Instalar as dependências com o yarn ou npm<br>
```yarn install```<br>
or<br>
```npm install```

4 - Rode a aplicação localmente com <br>
```yarn dev```<br>

5 - Acesse a aplicação em ```http://localhost:3000```
