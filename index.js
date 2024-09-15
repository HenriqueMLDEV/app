const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "Tomar Água",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as setas para mudar a meta, o espaço para marcar e o Enter para finalizar",
    choices: [...metas],
    instructions: false,
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada");
    return;
  }

  metas.forEach((m) => {
    m.checked = false;
  });

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  console.log("Metas marcadas como concluidas");
};

const start = async () => {
  while (true) {
    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "Cadastrar",
        },
        {
          name: "Listar Metas",
          value: "Listar",
        },
        {
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (option) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "Listar":
        await listarMetas();
        break;
      case "Sair":
        console.log("Até a próxima");
        return;
    }
  }
};

start();
