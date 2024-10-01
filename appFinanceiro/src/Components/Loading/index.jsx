import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

const LoadingComponent = () => {

 return (
    <Layout
      style={styles.container}
      level='1'
    >

    <Spinner size='giant'
     
    style={styles.controlContainer}
    />

  </Layout>
  );

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

});

export default LoadingComponent;
