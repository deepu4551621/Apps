import React, { useEffect, useState, } from 'react';
import { View, Text, Modal, ScrollView, Pressable ,Dimensions} from 'react-native';
import CheckBox from 'react-native-check-box'
const {width, height} = Dimensions.get('window');
import data from '../../assets/heliverse_mock_data.json'
const Filter = ({onFilteredData }) => {
    const [isDomainModalVisible, setIsDomainModalVisible] = useState(false);
    const [selectedDomains, setSelectedDomains] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [availability, setAvailability]=useState([]);
    const [finalFilter,setFilter]=useState([]);
    const domainFilters = [
        'Sales',
        'Finance',
        'Marketing',
        'IT',
        'Management',
        'UI Designing',
        'Business Development',
    ];
    const genderFilters = ['Male', 'Female', 'Agender', 'Genderfluid', 'Bigender', 'Polygender', 'Genderqueer', 'Non-binary'];
    const availableFilter = [true,false];
    const toggleDomainModal = () => {
        setIsDomainModalVisible(!isDomainModalVisible);
    };
    const handleDomainPress = (domain) => {
        if (selectedDomains.includes(domain)) {
            // Remove the domain if already selected
            setSelectedDomains(selectedDomains.filter((item) => item !== domain));
        } else {
            // Add the domain if not selected
            setSelectedDomains([...selectedDomains, domain]);
        }
    };
    const handleGenderPress = (gender) => {
        if (selectedGenders.includes(gender)) {
            // Remove the domain if already selected
            setSelectedGenders(selectedGenders.filter((item) => item !== gender));
        } else {
            // Add the domain if not selected
            setSelectedGenders([...selectedGenders, gender]);
        }
    };
    const handleAvailable=(i)=>{
        if (availability.includes(i)) {
            // Remove the domain if already selected
            setAvailability(availability.filter((item) => item !== i));
        } else {
            // Add the domain if not selected
            setAvailability([...availability, i]);
        }
    }

    const applyDomainFilters = () => {
        toggleDomainModal(); // Close the modal
        let merge = selectedDomains.concat(selectedGenders);
        let combinedArray =[...selectedDomains,...selectedGenders,...availability];
        setFilter(combinedArray);
    };
    useEffect(()=>{
        onFilteredData(finalFilter);
    },[finalFilter])
    return (
        <View>
            <Pressable onPress={toggleDomainModal} style={{ backgroundColor: '#eee4ee', height: 35, width: 150, margin: 5, borderRadius: 6, alignSelf: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize:18, textAlign:'center'}}>Apply Filter</Text>
            </Pressable>
            <Modal visible={isDomainModalVisible} animationType="slide">
                <View>
                    <Text style={{fontSize:30, textAlign:'center',borderBottomWidth:2, borderBottomColor:'silver'}}>Filter</Text>
                    <ScrollView>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {/* first div for domain */}
                            <View>
                                <Text style={{marginLeft:15, color:'black'}}>Domain</Text>
                                {domainFilters.map((domain) => (
                                    <View key={domain}>
                                        <Pressable onPress={() => handleDomainPress(domain)} style={{ flexDirection: 'row', margin: 3, padding: 10 }}>
                                            <CheckBox
                                                checkBoxColor="green" // Customize checkbox color
                                                isChecked={selectedDomains.includes(domain)}
                                                onClick={() => handleDomainPress(domain)} // Handle the selection
                                            />
                                            <Text>{domain}</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                            {/* second div for genders */}
                            <View>
                                <Text style={{marginLeft:15, color:'black'}}>Gender</Text>
                                {genderFilters.map((gender) => (
                                    <View key={gender}>
                                        <Pressable onPress={() => handleGenderPress(gender)} style={{ flexDirection: 'row', margin: 3, padding: 10 }}>
                                            <CheckBox
                                                checkBoxColor="green" // Customize checkbox color
                                                isChecked={selectedGenders.includes(gender)}
                                                onClick={() => handleGenderPress(gender)} // Handle the selection
                                            />
                                            <Text>{gender}</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                            {/* third div availability */}
                            <View>
                                <Text style={{marginLeft:15, color:'black'}}>Availability</Text>
                                {availableFilter.map((i) => (
                                    <View key={i}>
                                        <Pressable onPress={() => handleAvailable(i)} style={{ flexDirection: 'row', margin: 3, padding: 10 }}>
                                            <CheckBox
                                                checkBoxColor="green" // Customize checkbox color
                                                isChecked={availability.includes(i)}
                                                onClick={() => handleAvailable(i)} // Handle the selection
                                            />
                                            {i===true?(<Text>True</Text>):
                                            (<Text>False</Text>)
                                            }
                                            
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                    <Pressable onPress={applyDomainFilters} style={{ backgroundColor: 'green', width: 120, alignItems: 'center', padding: 5, borderRadius: 10, alignSelf:'center',marginTop:10 }}>
                        <Text>Apply Filters</Text>
                    </Pressable>
                </View>
            </Modal>
            {
                finalFilter.length>0?(
                    <View style={{ height: 30, width: width, backgroundColor: 'green' }}>
                    <ScrollView horizontal={true}>
                      {finalFilter
                        ? finalFilter.map((item, index) => (
                            <Text key={index} style={{ color: 'white', padding:5 }}>
                              {item}
                            </Text>
                          ))
                        : null}
                    </ScrollView>
                     </View>
                ):null
            }
  

        </View>
    );
};


export default Filter;
