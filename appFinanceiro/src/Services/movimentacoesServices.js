import { firestore } from '../../firebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, addDoc, doc, updateDoc, getDocs, getDoc, deleteDoc, onSnapshot, query, where  } from 'firebase/firestore';

export const obterMovimentacoes = (callback) => {
  const movimentacoesRef = collection(firestore, 'movimentacoes');

  // Adiciona um ouvinte para mudanças na coleção
  const unsubscribe = onSnapshot(movimentacoesRef, (snapshot) => {
    const movimentacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(movimentacoes);
  });

  // Retorna a função para parar de escutar
  return unsubscribe;
};

// Função para buscar somente movimentações de entrada
export const obterEntradas = (callback) => {
  try {
    
    const movimentacoesRef = collection(firestore, 'movimentacoes');
    const q = query(movimentacoesRef, where('tipo', '==', 'entrada'));

    // Usando onSnapshot para escutar mudanças em tempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entradas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(entradas); 
    });

    return unsubscribe; // Retorna a função para parar de escutar quando necessário
  } catch (error) {
    console.error('Erro ao buscar entradas:', error);
    return () => {}; 
  }
};

// Função para buscar somente movimentações de saida
export const obterSaidas = (callback) => {
  try {
    const movimentacoesRef = collection(firestore, 'movimentacoes');
    const q = query(movimentacoesRef, where('tipo', '==', 'saida'));

    // Usando onSnapshot para escutar mudanças em tempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const saidas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(saidas); 
    });

    return unsubscribe; // Retorna a função para parar de escutar quando necessário
  } catch (error) {
    console.error('Erro ao buscar saidas:', error);
    return () => {}; 
  }
};

export const criarMovimentacao = async (movimentacao) => {
  await addDoc(collection(firestore, 'movimentacoes'), movimentacao);
};


export const atualizarMovimentacao = async (id, dadosAtualizados) => {
  try {
    const movimentacaoDoc = doc(firestore, 'movimentacoes', id);
    await updateDoc(movimentacaoDoc, dadosAtualizados);
  } catch (error) {
    console.error('Erro ao atualizar movimentação:', error);
  }
};

export const deletarMovimentacao = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'movimentacoes', id));
  } catch (error) {
    console.error('Erro ao deletar movimentação:', error);
  }
};

export const obterMovimentacaoPorId = async (id) => {
  const movimentacaoDoc = doc(firestore, 'movimentacoes', id);
  const docSnapshot = await getDoc(movimentacaoDoc);
  return docSnapshot.exists() ? { id: docSnapshot.id, ...docSnapshot.data() } : null;
};