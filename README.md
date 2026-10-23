# Cartão digital · Mariana

Cartão digital de Mariana, CEO da HM Digital, com a abertura animada do gimbal: ele entra pulando, sobe nas letras, amassa o "I" de DIGITAL e acende a tela, revelando o logo da HM.

## Editar os dados

Tudo fica em `assets/js/perfil.js`. Os campos marcados com `TODO` ainda precisam dos dados reais.

- **Foto:** coloque o arquivo em `assets/img/foto.jpg` (quadrado, 600×600) e preencha `photo: "/assets/img/foto.jpg"`.
- **Logo da HM:** coloque o arquivo em `assets/img/logo-hm.png` (ou `.svg`, fundo transparente) e preencha `logo` em `HM_COMPANY`. Ele aparece no topo, no rodapé e no brilho final da abertura.

Este repositório e o do outro CEO usam o mesmo código. Só o `perfil.js`, o `index.html` (título) e as fotos mudam. Se alterar o visual ou a abertura, copie `assets/css`, `assets/js/card.js` e `assets/js/intro.js` para o outro repositório também.

## Abertura

`assets/js/intro.js`. Toca na primeira visita de cada sessão; "Rever abertura" no rodapé toca de novo.
Quem usa "reduzir movimento" no celular não vê a animação.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar na Vercel

Site estático, sem build. Na Vercel: **Add New → Project → importar este repositório → Deploy** (Framework Preset: *Other*).
