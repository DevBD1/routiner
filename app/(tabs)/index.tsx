import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Link } from 'expo-router';


const App: React.FC = () => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>R O U T I N E R</Text>

      <Link href="../screens/LoginScreen" style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Login Screen!!1</Text>
        </Pressable>
      </Link>
      
      <Link href="../screens/EventsScreen" style={{ marginHorizontal: 'auto' }} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Events Screen!1!</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
  },
  button: {
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
  },
});
