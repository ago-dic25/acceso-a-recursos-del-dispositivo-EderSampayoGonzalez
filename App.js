import { StyleSheet, Text, View, Button, TextInput, FlatList, ListView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform} from 'react-native';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary  from 'expo-media-library';

export default function App() {

  const [permisos, setPermisos] = useState(null);
  const [foto, setFoto] = useState(null);
  const [tipoCamara, setTipoCamera] = useState('back');
  const [camaraRef, setCamaraRef] = useState(null);


  useEffect(()=> {
    (async () => {
      const permisosMediaLibrary = await MediaLibrary.requestPermissionsAsync();
      const permisosCamara = await Camera.requestCameraPermissionsAsync();

      setPermisos(permisosCamara.status === 'granted');
      if(!permisosCamara.granted){
        console('Se necesitan permisos para usar la camara');
      }
    })();
  }, []);


  if(permisos === null || permisos === 'denied'){
    return <Text>No se tienen permisos para acceder a camara</Text>
  }

  const tomarFoto = async () =>{
    if(camaraRef){
      try{
        const datosFoto = await camaraRef.takePictureAsync();
        setFoto(datosFoto.uri);
        console.log(datosFoto);
        //const asset = await MediaLibrary.createAssetAsync(datosFoto.uri);
        //console.log('foto guardada en galeria', asset);
      }catch(error){
        console.log('error ' + error)
      }
    }
  }

  const guardarFoto = async  () => {
    if(foto){
      try{
        //guardar foto en galeria
      }
      catch(error){}
    }
  }

  return (
    <View style={styles.container}>

   {permisos ? (
     <Camera
    type={tipoCamara}
    ref={ref => setCamaraRef(ref)}>

    </Camera>
   ) : (<Text>No access to camera</Text>)}
    <Button title="Tomar Foto" onPress={tomarFoto}>Tomar Foto</Button>
    <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#BD93BD',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  camera: {
    flex: 1,
    aspectRatio:1
  }
});
