import * as SQLite from 'expo-sqlite';

// Abre ou cria o banco de dados
const db = SQLite.openDatabase('app.db');

// Função para criar as tabelas
export const createTable = () => {
  console.log("📋 Tentando criar tabelas...");

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS movimentacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT,
        valor TEXT,
        categoria TEXT,
        data TEXT
      );`,  
      [],
      () => console.log("✅ Tabela 'movimentacoes' criada ou já existe."),
      (_, error) => {
        console.error("❌ Erro ao criar tabela 'movimentacoes':", error.message);
        return false;
      }
    );
  });

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT
      );`,
      [],
      () => console.log("✅ Tabela 'categorias' criada ou já existe."),
      (_, error) => {
        console.error("❌ Erro ao criar tabela 'categorias':", error.message);
        return false;
      }
    );
  });
};

// Função para adicionar movimentação
export const addMovimentacao = (tipo, valor, categoria, data) => {
  
  console.log("📥 Adicionando movimentação:", { tipo, valor, categoria, data });

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO movimentacoes (tipo, valor, categoria, data) VALUES (?, ?, ?, ?);`,
      [tipo, valor, categoria, data],
      () => console.log("✅ Movimentação adicionada com sucesso."),
      (_, error) => {
        console.error("❌ Erro ao adicionar movimentação:", error.message);
        return false;
      }
    );
  });
};

// Função para adicionar categoria
export const addCategoria = (nome) => {
  console.log("📥 Adicionando categoria:", nome);

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO categorias (nome) VALUES (?);`,
      [nome],
      () => console.log("✅ Categoria adicionada com sucesso."),
      (_, error) => {
        console.error("❌ Erro ao adicionar categoria:", error.message);
        return false;
      }
    );
  });
};

// Função para obter movimentações
export const getMovimentacoes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM movimentacoes',
      [],
      (_, { rows: { _array } }) => {
        console.log('📊 Movimentações carregadas:', _array); // Log com ícone
        callback(_array); // Use o callback para retornar os dados
      },
      (_, error) => {
        console.error('❌ Erro ao buscar movimentações:', error); // Log com ícone de erro
      }
    );
  });
};

// Função para obter categorias
export const getCategorias = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM categorias',
      [],
      (_, { rows: { _array } }) => {
        console.log('📂 Categorias carregadas:', _array); // Log com ícone
        callback(_array); // Use callback
      },
      (_, error) => {
        console.error('❌ Erro ao buscar categorias:', error); // Log com ícone de erro
      }
    );
  });
};



// Função para limpar a tabela de movimentações
export const clearTable = () => {
  console.log("🗑️ Limpando tabela de movimentações...");

  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM movimentacoes;`,
      [],
      () => console.log("✅ Tabela de movimentações limpa com sucesso."),
      (_, error) => {
        console.error("❌ Erro ao limpar tabela de movimentações:", error.message);
        return false;
      }
    );
  });
};

// Função para limpar a tabela de categorias
export const clearTableCategory = () => {
  console.log("🗑️ Limpando tabela de categorias...");

  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM categorias;`,
      [],
      () => console.log("✅ Tabela de categorias limpa com sucesso."),
      (_, error) => {
        console.error("❌ Erro ao limpar tabela de categorias:", error.message);
        return false;
      }
    );
  });
};
