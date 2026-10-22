import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export default function ListaScreen({ navigation }) {
  const [series, setSeries] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resposta = await fetch('https://api.tvmaze.com/shows');
        if (!resposta.ok) throw new Error('Falha na requisição');
        const dados = await resposta.json();
        setSeries(dados);
      } catch (e) {
        setErro('Erro ao carregar as séries.');
      } finally {
        setCarregando(false);
      }
    }
    buscarSeries();
  }, []);

  if (carregando) return <ActivityIndicator size="large" style={styles.centro} />;
  if (erro) return <Text style={styles.erro}>{erro}</Text>;

  return (
    <FlatList
      data={series}
      numColumns={5}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detalhe', { id: item.id, nome: item.name })}
        >
          {item.image ? (
            <Image source={{ uri: item.image.medium }} style={styles.imagem} />
          ) : (
            <View style={[styles.imagem, styles.semImagem]}>
              <Text>Sem imagem</Text>
            </View>
          )}
          <Text style={styles.nome} numberOfLines={2}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center' },
  erro: { padding: 20, color: 'red', textAlign: 'center' },
  item: {
    flex: 1 / 5,
    alignItems: 'center',
    padding: 8,
  },
  imagem: { width: '50%', aspectRatio: 0.7 },
  semImagem: { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  nome: { fontSize: 14, textAlign: 'center', marginTop: 6 },
});