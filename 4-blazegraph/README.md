# Passo Blazegraph

Iniciar:
```bash
docker run --name blazegraph -d -p 8889:8080 lyrasis/blazegraph:2.1.5
```

Carregar RDF atraves de command line em Linux/MacOS:
```bash
# Se você receber "Permission denied", torne o script executável primeiro:
chmod +x load_rdf.sh

bash ./load_rdf.sh
# Windows: ./load_rdf.ps1
```

---
Carregar RDF atraves da UI:
1. Acesse http://localhost:8889/bigdata/#update
2. Clique em "Choose file"
3. Selecione o arquivo `chinook.trig` na pasta `/rdf`
4. Mude o tipo para `RDF Data`
5. Mude o formato para `TriG`
6. Clique em `Update`

---

Abrir UI do Blazegraph:
http://localhost:8889/bigdata/#query


Agora verifique se os dados estão lá na seção QUERY:
```sparql
SELECT  ?s ?p ?o ?g
WHERE {
  GRAPH ?g { ?s ?p ?o }
}
```

Você deve conseguir ver isto:
![alt text](image.png)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# English Version
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Blazegraph Step

Start:
```bash
docker run --name blazegraph -d -p 8889:8080 lyrasis/blazegraph:2.1.5
```

Load RDF:
```bash
# If you get "Permission denied", make the script executable first:
chmod +x load_rdf.sh

bash ./load_rdf.sh
# Windows: ./load_rdf.ps1
```

Open Blazegraph UI:
http://localhost:8889/bigdata/#query


Now check the data is there on the QUERY section:
```sparql
SELECT  ?s ?p ?o ?g
WHERE {
  GRAPH ?g { ?s ?p ?o }
}
```

You should be able to see this:
![alt text](image.png)
