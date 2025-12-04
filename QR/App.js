import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, View, Image, Text, TextInput, StyleSheet, Alert, Linking } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scanning, setScanning] = useState(false);
  const [qrData, setQrData] = useState(null);

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

  const handleBarcodeScanned = ({ type, data }) => {
    setScanning(false);
    setQrData(data);
    Alert.alert("QR detectado", `Contenido: ${data}`);
  };

  const isUrl = (text) => {
    return text.startsWith('http://') || text.startsWith('https://');
  };

  const openLink = async () => {
    if (isUrl(qrData)) {
      try {
        await Linking.openURL(qrData);
      } catch (error) {
        Alert.alert("Error", "No se pudo abrir el enlace.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inicio de Sesión</Text>

      {/* Cámara o foto */}
      {scanning ? (
        <CameraView
          ref={cameraRef}
          style={styles.cameraQR}
          onBarcodeScanned={scanning ? handleBarcodeScanned : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      ) : !photo ? (
        <View style={styles.profileContainer}>
          <CameraView ref={cameraRef} style={styles.camera} />
        </View>
      ) : (
        <Image source={{ uri: photo }} style={styles.profileImage} />
      )}

      {!scanning && (
        <View style={styles.buttonContainer}>
          <Button title="Tomar una Foto" onPress={takePhoto} color="#4C6EF5" />
          <Button title="Compartir" onPress={() => {}} color="#4C6EF5" />
          <Button
            title="Escanear QR"
            onPress={() => {
              setScanning(true);
              setQrData(null);
            }}
            color="#0A9396"
          />
        </View>
      )}

      {/* Resultado del QR */}
      {qrData && (
        <View style={{ marginBottom: 15, alignItems: "center" }}>
          <Text style={{ color: "#333", marginBottom: 10 }}>
            QR leído: {qrData}
          </Text>

          {isUrl(qrData) && (
            <Button title="Abrir enlace" onPress={openLink} color="#0077B6" />
          )}
        </View>
      )}

      {/* Inputs si no está escaneando */}
      {!scanning && (
        <>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#D8D8D8',
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
  cameraQR: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    gap: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#333',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});