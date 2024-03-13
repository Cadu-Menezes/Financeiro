import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

export default function Loading() {

 return (
   <View style={styles.container}>
      
      {/* <Layout style={styles.container} level='1'>
        <Spinner size='giant' />
      </Layout> */}

        <Text>Olá mundooooooo!</Text>
   </View>
  );

}


const styles = StyleSheet.create({

    container:{
        maxHeight: 84,
        marginTop: 18,
        marginStart: 14,
        marginEnd: 14,
        paddingStart: 14
    },

})
