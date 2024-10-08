import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { primaryColor, secondaryColor } from '../shared/AllStyles';

const InspectionDetailsView = ({ route, navigation }) => {
  const { inspection } = route.params;

  const renderChecklistSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.checklistItem}>
          <Text style={styles.checklistItemText}>{key}</Text>
          <Feather 
            name={value ? "check-circle" : "x-circle"} 
            size={24} 
            color={value ? "green" : "red"} 
          />
        </View>
      ))}
    </View>
  );

  const renderSideDetails = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.detailItem}>
          <Text style={styles.detailItemText}>{key}: </Text>
          <Text style={styles.detailItemValue}>
            {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inspection Details</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Information</Text>
        <Text style={styles.infoText}>Fleet Number: {inspection.fleetNo}</Text>
        <Text style={styles.infoText}>Status: {inspection.inspStatus}</Text>
        <Text style={styles.infoText}>Time: {new Date(inspection.time).toLocaleString()}</Text>
        <Text style={styles.infoText}>Driver Email: {inspection.driverEmail}</Text>
        <Text style={styles.infoText}>Fleet Controller Email: {inspection.fleetCtrl_email}</Text>
      </View>

      {renderChecklistSection("Documentation", inspection.documentation)}
      {renderChecklistSection("Driver Compartment", inspection.drvCompartment)}
      {renderChecklistSection("Bus Interior", inspection.busInterior)}
      {renderChecklistSection("Bus Electric", inspection.busElectric)}
      {renderChecklistSection("Bus Wheels", inspection.busWheels)}
      {renderChecklistSection("Body", inspection.body)}
      {renderChecklistSection("Engine & Air", inspection.engine_Air)}

      {renderSideDetails("Driver Side", inspection.driverSide)}
      {renderSideDetails("Front Side", inspection.frontSide)}
      {renderSideDetails("Passenger Side", inspection.passengerSide)}
      {renderSideDetails("Back Side", inspection.backSide)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: primaryColor,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 8,
  },
  section: {
    backgroundColor: 'white',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: primaryColor,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checklistItemText: {
    fontSize: 16,
    flex: 1,
  },
  detailItem: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  detailItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailItemValue: {
    fontSize: 16,
  },
});

export default InspectionDetailsView;