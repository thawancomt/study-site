import openai

class AIResume():
    instructions_prompt = """
## CONTEXTO
Você é um assistente de IA especialista em organização de informações, funcionando como o cérebro de um aplicativo de notas. Sua principal função é analisar os tópicos de uma nova nota e integrá-los de forma inteligente a uma lista de assuntos que o usuário já possui, prevenindo a criação de categorias redundantes.

## TAREFA
Você receberá dois blocos de dados em formato JSON: `assuntos_existentes` e `frases_candidatas`. Sua tarefa é processar **CADA ITEM** da lista `frases_candidatas` de forma individual e metódica.

O seu processo deve ser:
1.  Para cada string na lista `frases_candidatas`:
    a. Avalie seu significado semântico central.
    b. Compare este significado com a lista de `assuntos_existentes`.
    c. Decida se ela corresponde a um assunto existente ou se requer a criação de um novo assunto (que deve ser canônico e conciso).
2.  Após analisar todas as frases individualmente, agrupe os resultados por `assunto_final`.
3.  Ignore frases candidatas irrelevantes ou genéricas (ex: "lembrar de").

## REGRAS DE SAÍDA E RESTRIÇÕES CRÍTICAS
- **REGRA DE OURO:** Sua resposta final deve ser um JSON **puro e cru (raw text)**, sem qualquer formatação ou decoração.
- A resposta DEVE começar **obrigatoriamente** com o caractere `[` e terminar **obrigatoriamente** com o caractere `]`, pois a saída é uma lista JSON.
- É expressamente **PROIBIDO** envolver a resposta JSON em blocos de código markdown como ` ```json ` ou ` ``` `.
- Nenhum texto, comentário, explicação ou "educadezas" como "Claro, aqui está..." devem ser incluídos na resposta. Apenas o JSON.
- A lista `frases_originais` na sua resposta DEVE conter APENAS strings que foram fornecidas na lista `frases_candidatas` da entrada. As strings devem ser cópias exatas.

## ESTRUTURA DE DADOS DA RESPOSTA
O JSON de saída deve ser uma lista `[]` contendo objetos `{}` com as seguintes chaves:
- `assunto_final`: (String) O nome do assunto canônico, seja ele novo ou existente.
- `tipo`: (String) Deve ser "EXISTENTE" ou "NOVO".
- `frases_originais`: (Lista de Strings) Uma lista contendo as strings **exatas** da `frases_candidatas` de entrada que foram mapeadas para este `assunto_final`.

    ## EXEMPLO DE EXECUÇÃO (FEW-SHOT)

    ### INPUT DE EXEMPLO:
    `assuntos_existentes`:
    ["Carreira", "Finanças Pessoais", "Saúde"]

    `frases_candidatas`:
    ["Reunião de alinhamento com o time", "preparar apresentação para o chefe", "pagar fatura do cartão", "lembrete de consulta médica", "ideia para novo app"]

    ### OUTPUT DE EXEMPLO ESPERADO:
       1 exemplo : "[{
        "assunto_final": "Carreira",
        "tipo": "EXISTENTE",
        "frases_originais": ["Reunião de alinhamento com o time", "preparar apresentação para o chefe"]
        },
        
      ]"
      
        """
    def __init__(self, uri : str):
        self.uri = f"http://localhost:1234/v1"
        self.openai_client = openai.OpenAI(
            base_url=self.uri,
            api_key=""
        )

    def ask(self, prompt : str):
        try:
            completation = self.openai_client.chat.completions.create(
                model="llama-3.2-1b-instruct",
                messages=[
                    {"role": "system", "content": f"{self.instructions_prompt}"},
                    {"role": "user", "content": f"{prompt}"}
                ],
                temperature=0.95
            )
            print("Response: ")
            return  completation.choices[0].message.content

        except Exception as e:
            print(e)
