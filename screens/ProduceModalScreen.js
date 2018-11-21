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
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import Styles from "../constants/Styles";

class ProduceModalScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // ** add validation data so can't submit non-address
  // ** change this to change message in submit button then close after a second or two
  handleSubmit = values => {
    // need to call google api to get coords of addresses then convert to latlng
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${values.address},${values.city},${values.state}${values.zip}&key=${GOOGLE_API_KEY}`)
      .then(response => {
        let parsedRes = JSON.parse(response["_bodyInit"]);
        let addFoodPacket = {
          userId: firebase.auth().currentUser.uid,
          name: values.name,
          lat: parsedRes.results[0].geometry.location.lat.toFixed(3),
          lng: parsedRes.results[0].geometry.location.lng.toFixed(3),
          description: values.description,
          category: values.category,
          contact: values.contact
        };

        addFood(addFoodPacket);
        this.setModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
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
                onSubmit={this.handleSubmit}
                validationSchema={Yup.object().shape({
                  name: Yup.string().trim().required(),
                  description: Yup.string().trim(),
                  category: Yup.string().trim(),
                  address: Yup.string().trim().required(),
                  city: Yup.string().trim().required(),
                  state: Yup.string().trim().required(),
                  zip: Yup.number().min(501, "Enter a valid zip").max(99950, "Enter a valid zip").required(),
                  contact: Yup.string().trim().required(),
                })}
                render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid, isSubmitting }) => (
                  <React.Fragment>
                    <Text style={{textAlign:"center", color:Colors.darkGray, fontSize: 20, marginTop:35, fontWeight:"bold",}}>Enter Food Information Below</Text>
                    <Input
                      labelStyle={{ paddingTop: 15, color: Colors.darkGray }}
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
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="brief description"
                      value={values.description}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="description"
                      error={touched.description && errors.description}
                    />
                    <Input
                      label="Category"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="food category (produce, boxed, canned, etc)"
                      value={values.category}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="category"
                      error={touched.category && errors.category}
                    />
                    <Input
                      label="Street Address"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="address"
                      value={values.address}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="address"
                      error={touched.address && errors.address}
                    />
                    <Input
                      label="City"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="city"
                      value={values.city}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="city"
                      error={touched.city && errors.city}
                    />
                    <Input
                      label="State"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="state"
                      value={values.state}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="state"
                      error={touched.state && errors.state}
                    />
                    <Input
                      label="Zip"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="zip"
                      value={values.zip}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="zip"
                      error={touched.zip && errors.zip}
                    />
                    <Input
                      label="Contact Info"
                      labelStyle={{ color: Colors.darkGray }}
                      placeholder="preferred contact information"
                      value={values.contact}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="contact"
                      error={touched.contact && errors.contact}
                    />
                    <Button
                      buttonStyle={Styles.smallGapSubmitButton}
                      title="Add to Map"
                      onPress={handleSubmit}
                      disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                    />
                    <Button
                      buttonStyle={Styles.cancelButton}
                      onPress={() => { this.setModalVisible(false); }}
                      title="Cancel"
                    />
                  </React.Fragment>
                )}
              />
            </Modal>
          </ScrollView>

        {/* Produce Food Button that opens modal */}
          <TouchableOpacity
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={styles.rightHeaderButton}>Produce Food!</Text>
          </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  rightHeaderButton: {
    alignItems: 'center',
    backgroundColor: Colors.headerGreen,
    color: Colors.white,
    fontSize: 15,
    width: 80,
    flexWrap: "wrap",
    height: 44,
    textAlign:"center",
    transform: [{ skewX: '-10deg' }],
    marginRight: 5,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
})

export default withNavigation(ProduceModalScreen);
