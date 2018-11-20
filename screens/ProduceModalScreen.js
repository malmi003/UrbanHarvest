import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { withNavigation } from "react-navigation";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import { Button } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addFood } from "../src/services/addFood";
import * as firebase from "firebase";

class ProduceModalScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  // ** change this to change message in submit button then close after a second or two
  _handleSubmit = values => {
    values.userId = firebase.auth().currentUser.uid;
    addFood(values);
    this.setModalVisible(false);
  }
  render() {
    return (
      <View style={styles.container}>
        <View >
          <ScrollView>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(false)
              }}>
              <Formik
                initialValues={{ description: "", name: "", category: "", address: "", city: "", state: "", zip: "", contact: "", }}
                onSubmit={this._handleSubmit}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required(),
                  description: Yup.string(),
                  category: Yup.string(),
                  address: Yup.string().required(),
                  city: Yup.string().required(),
                  state: Yup.string().required(),
                  zip: Yup.number().min(501, "Enter a valid zip").max(99950, "Enter a valid zip").required(),
                  contact: Yup.string().required(),
                })}
                render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid, isSubmitting }) => (
                  <React.Fragment>
                    <Input
                      labelStyle={{ paddingTop: 50, color: Colors.darkGray}}
                      label="Name"
                      placeholder="name"
                      value={values.name}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="name"
                      error={touched.name && errors.name}
                    />
                    <Input
                      label="Description"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="brief description"
                      value={values.description}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="description"
                      error={touched.description && errors.description}
                    />
                    <Input
                      label="Category"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="food category (produce, boxed, canned, etc)"
                      value={values.category}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="category"
                      error={touched.category && errors.category}
                    />
                    <Input
                      label="Street Address"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="address"
                      value={values.address}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="address"
                      error={touched.address && errors.address}
                    />
                    <Input
                      label="City"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="city"
                      value={values.city}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="city"
                      error={touched.city && errors.city}
                    />
                    <Input
                      label="State"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="state"
                      value={values.state}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="state"
                      error={touched.state && errors.state}
                    />
                    <Input
                      label="Zip"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="zip"
                      value={values.zip}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="zip"
                      error={touched.zip && errors.zip}
                    />
                    <Input
                      label="Contact Info"
                      labelStyle={{color: Colors.darkGray }}
                      placeholder="preferred contact information"
                      value={values.contact}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="contact"
                      error={touched.contact && errors.contact}
                    />
                    <Button
                      buttonStyle={styles.submitButton}
                      title="Add to Map"
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                    <Button
                      buttonStyle={styles.cancelButton}
                      onPress={() => { this.setModalVisible(false); }}
                      title="Cancel"
                    />
                  </React.Fragment>
                )}
              />
            </Modal>
          </ScrollView>
        </View>

        {/* Produce Food Button that opens modal */}
        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.tabBarInfoText}>Produce Food</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    color: Colors.darkGray,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: Colors.headerGreen
  },
  cancelButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: Colors.errorBackground
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: Colors.headerGreen,
    paddingTop: 8,
    paddingBottom: 20,
  },
  tabBarInfoText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: "bold",
    letterSpacing: 1.2,
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    borderColor: Colors.lightGreen,
  },
})

export default withNavigation(ProduceModalScreen);
