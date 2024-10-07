import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AllStyles, primaryColor } from "../shared/AllStyles";
import { InspectContext } from '../shared/InspectionContext';
import { ProfilesContext } from '../shared/ProfilesContext';

const SearchAndView = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { inspections } = useContext(InspectContext);
    const { profiles } = useContext(ProfilesContext);

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filteredInspections = inspections.filter(inspection => 
                inspection.fleetNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inspection.inspStatus.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const filteredDrivers = profiles.filter(profile => 
                profile.role === 'Driver' && (
                    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    profile.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    profile.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );

            setSearchResults([...filteredInspections, ...filteredDrivers]);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, inspections, profiles]);

    const renderSearchItem = ({ item }) => {
        if (item.fleetNo) {
            // This is an inspection
            return (
                <TouchableOpacity 
                    style={styles.searchItem}
                    onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                    }}
                >
                    <Feather name="clipboard" size={24} color={primaryColor} style={styles.icon} />
                    <View>
                        <Text style={styles.primaryText}>{item.fleetNo} Inspection</Text>
                        <Text style={styles.secondaryText}>Status: {item.inspStatus}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            // This is a driver
            return (
                <TouchableOpacity 
                    style={styles.searchItem}
                    onPress={() => {
                        setSelectedItem(item);
                        setModalVisible(true);
                    }}
                >
                    <Feather name="user" size={24} color={primaryColor} style={styles.icon} />
                    <View>
                        <Text style={styles.primaryText}>{item.name} {item.surname}</Text>
                        <Text style={styles.secondaryText}>{item.email}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    const renderDetailModal = () => {
        if (!selectedItem) return null;

        if (selectedItem.fleetNo) {
            // Render Inspection Details
            return (
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Inspection Details</Text>
                    <Text>Fleet Number: {selectedItem.fleetNo}</Text>
                    <Text>Status: {selectedItem.inspStatus}</Text>
                    <Text>Time: {new Date(selectedItem.time).toLocaleString()}</Text>
                    <Text>Driver Email: {selectedItem.driverEmail}</Text>
                    {}
                </View>
            );
        } else {
            // Render Driver Profile
            return (
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Driver Profile</Text>
                    <Text>Name: {selectedItem.name} {selectedItem.surname}</Text>
                    <Text>Email: {selectedItem.email}</Text>
                    {}
                </View>
            );
        }
    };

    return (
        <View style={AllStyles.container}>
            <View style={styles.searchContainer}>
                <Feather name="search" size={24} color="gray" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search inspections or drivers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {searchResults.length > 0 ? (
                <FlatList
                    data={searchResults}
                    renderItem={renderSearchItem}
                    keyExtractor={(item) => item.id || item.email}
                    style={styles.resultsList}
                />
            ) : (
                searchQuery.length > 0 && (
                    <Text style={styles.noResults}>No results found</Text>
                )
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {renderDetailModal()}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    resultsList: {
        flex: 1,
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        marginRight: 15,
    },
    primaryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        fontSize: 14,
        color: 'gray',
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalContent: {
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: primaryColor,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});

export default SearchAndView;