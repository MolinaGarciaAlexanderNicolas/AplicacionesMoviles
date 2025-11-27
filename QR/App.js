import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Image, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Necesitas permitir acceso a la cámara</Text>
        <Button title="Dar permiso" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inicio de Sesion</Text>

      {/* Imagen de perfil o cámara */}
      {!photo ? (
        <View style={styles.profileContainer}>
          <CameraView ref={cameraRef} style={styles.camera} />
        </View>
      ) : (
        <Image source={{ uri: photo }} style={styles.profileImage} />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Tomar una Foto" onPress={takePhoto} color="#4C6EF5" />
        <Button title="Compartir" onPress={() => {}} color="#4C6EF5" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Aceptar" onPress={() => {}} color="#4C6EF5" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: '#333333', // Título con un color oscuro para contraste
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#D8D8D8', // Fondo gris claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  camera: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#B0B0B0', // Color más suave para los bordes
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#333333', // Color de texto oscuro
    backgroundColor: '#FFFFFF', // Fondo blanco para campos de texto
  },
  text: {
    fontSize: 16,
    color: '#333333', // Texto oscuro
    marginBottom: 20,
  },
});