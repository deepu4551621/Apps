import React,{useState,useEffect} from 'react';
import { View, Text, FlatList, TouchableOpacity ,Image,StyleSheet,Dimensions } from 'react-native';

const UserList = ({ user}) => {

  return (
    <View>
       <View style={styles.card}>
<View style={{flexDirection:'row'}}>
  {/* 1 */}
  <View style={{flexDirection:'column'}}>
    <Text style={{margin:5,textAlign:'center'}}>{user.id}</Text>
  <Image source={{ uri: user.avatar }} style={{ width: 50, height: 70, marginRight:5}} />
  </View>
 
  {/* 2 */}
  <View style={{width:140}}>
  <Text style={styles.txt}>Name: {user.first_name} {user.last_name}</Text>
    <Text style={styles.txt2}>Email: {user.email}</Text>
    <Text  style={styles.txt2}>Gender: {user.gender}</Text>
    <Text  style={styles.txt2}>Domain: {user.domain}</Text>
    <Text  style={styles.txt2}>Available: {user.available ? 'Yes' : 'No'}</Text>
  </View>
</View>
  </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card:{
    height:130, backgroundColor:'#eeeee4',marginBottom:2,marginHorizontal:2,borderRadius:10
  },
  txt:{
    color:'green',
    fontSize:14
  },
  txt2:{
    color:'black',
    fontSize:10
  }
})
export default UserList;
