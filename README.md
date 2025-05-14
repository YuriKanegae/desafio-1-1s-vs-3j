# desafio-1-1s-vs-3j

Minha tentativa do desafio da codecon: [1 sênior vs. 3 júniors](https://www.youtube.com/watch?v=AFtRYXJVO-4)

As regras seguidas foram as mesmas: receber e processar um arquivo JSON com 100.00 usuários em uma hora, sem uso de IA.

Repositório original com os dados de teste: https://github.com/codecon-dev/desafio-1-1s-vs-3j

## Resultados
| ENDPOINT/QTD HORAS            | **1 HORA** | **2 HORAS** | **4 HORAS** |
|-------------------------------|:----------:|:-----------:|:-----------:|
| **POST /users**               |      ✅     |      ✅      |      ❔      |
| **GET /superusers**           |      ✅     |      ✅      |      ❔      |
| **GET /top-countries**        |      ✅     |      ✅      |      ❔      |
| **GET /team-insights**        |      ❌     |      ✅      |      ❔      |
| **GET /active-users-per-day** |      ❌     |      ✅      |      ❔      |
| **GET /evaluation**           |      ❌     |      ❌      |      ❔      |
