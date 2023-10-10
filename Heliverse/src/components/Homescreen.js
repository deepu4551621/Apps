import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,Dimensions
} from 'react-native';
import Filter from './filter';
import {Picker} from '@react-native-picker/picker'
import UserCard from './userList';
const {width, height} = Dimensions.get('window');
// Import user data and other necessary functions
import userData from '../../assets/heliverse_mock_data.json'; // Replace with actual data source

const HomeScreen = () => {
  const [users, setUsers] = useState(userData); // State for the list of users
  const [searchText, setSearchText] = useState('');
  const [team, setTeam] = useState([]);
  const itemsPerPage = 10; // Number of users per page
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(userData);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const delay =300;
  useEffect(() => {
    if(selectedDomain.length>0){
    const timer = setTimeout(() => {
      // Filter the data based on the search text
      const filtered = userData.filter(item => {
        console.log('updated-domain ',selectedDomain);
        // console.log(item.available);
        const domainMatches = selectedDomain.includes(item.domain);
        const genderMatch = selectedDomain.includes(item.gender);
        const available = selectedDomain.includes(item.available);
        if(domainMatches&&genderMatch&&available){
          return domainMatches&&genderMatch&&available;
        }else if(domainMatches&&genderMatch){
          return domainMatches&&genderMatch;
        }else if(domainMatches&&available){
          return domainMatches&&available
        }else if(genderMatch&&available){
          return genderMatch&&available
        }
        return  domainMatches||genderMatch||available;
      });
      setFilteredUsers(filtered);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }
  }, [selectedDomain]);
  useEffect(() => {
    if (searchText.trim() !== '') {
    const timer = setTimeout(() => {
      // Filter the data based on the search text
      const filtered = userData.filter(item => {
        const nameMatches = item.first_name.toLowerCase().includes(searchText.toLowerCase());
        return nameMatches;
      });
      setFilteredUsers(filtered);
    },delay);
    return () => {
      clearTimeout(timer);
    };
  }
  }, [searchText]);
  const domainFilters = ['Marketing', 'IT', 'Sales', 'HR','Management','Finance','UI Designing','Business Development']; // Replace with your domain options
  const genderFilters = ['Male', 'Female', 'Other']; // Replace with your gender options
  // Handle adding a user to the team with a unique domain
  const addToTeam = () => {
    const uniqueDomains = getUniqueDomains(users);
    setTeam([...team, ...uniqueDomains]);
  };
  //filtered data callback method
  const handleFilteredData = (filter) => {
    // console.log('-->',filter);
    setSelectedDomain(filter);
  };
  return (
    <View style={{ backgroundColor: 'black' }}>
      <TextInput
        placeholder="Search by Name"
        onChangeText={text => setSearchText(text)}
        style={{ color: 'black', backgroundColor: '#eeeee4', borderRadius: 10, marginTop: 10, marginHorizontal: 10 }}
      />
      {/* <Text style={{backgroundColor:'orange'}}>*********Filter**************</Text> */}
      {/* flatlist container */}
      <View style={{width:width, alignItems:'center'}}>
     <Filter onFilteredData={handleFilteredData} />
      </View>
      <View style={{width:width,  height:height*0.6}}>
      <FlatList
      //  pagingEnabled={true}
        horizontal={false}
        numColumns={2}
        data={filteredUsers}
        // initialNumToRender={itemsPerPage}
        keyExtractor={user => user.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              margin: 5,
              width: '50%', // Set to 50% to achieve a 2-column layout
            }}
          >
            <UserCard user={item} />
          </View>
        )}
      />
       <View style={{ backgroundColor: 'silver', height: 50, flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => setPage(page - 1)} style={{ padding: 10, backgroundColor: 'green', height: 40, width: 110, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 14 }}>Previous Page</Text>
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text>Current page</Text>
          <Text style={{ color: 'green' }}> {page}</Text>
        </View>
        <Pressable onPress={() => setPage(page + 1)} style={{ padding: 10, backgroundColor: 'green', height: 40, width: 110, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 14 }}>Next Page</Text>
        </Pressable>
      </View>
      </View>
      
      <Text style={{height:40, backgroundColor:'white', fontSize:20}}>*********flatlist End**************</Text>
      {/* {isAvailable && (
        <TouchableOpacity onPress={addToTeam}>
          <Text>Add To Team</Text>
        </TouchableOpacity>
      )} */}
      {
        selectedDomain&&selectedDomain.length>0?(
         <Text style={{color:'white', fontSize:20, position:'absolute', top:65, right:10}}>Result: {filteredUsers.length}</Text>
        ):null
      }

    </View>
  );
};

export default HomeScreen;
