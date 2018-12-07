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
  KeyboardAvoidingView,

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
// import { db } from '../config/db';
// import GeoFire from 'geofire';
// const geoFire = new GeoFire(db.ref("/geoFire/").push());
// const geoRef = geoFire.ref();

class ProduceModalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
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
            console.log(response)
            let parsedRes = JSON.parse(response["_bodyInit"]);
            let addFoodPacket = {
              userId: firebase.auth().currentUser.uid,
              name: values.name,
              lat: parsedRes.results[0].geometry.location.lat.toFixed(3),
              lng: parsedRes.results[0].geometry.location.lng.toFixed(3),
              region: parsedRes.results[0].address_components[2].long_name,
              description: values.description,
              category: values.category,
              email: values.email,
              // needs to be object w/ location.latitude
              // region2: Expo.Location.reverseGeocodeAsync(values.lat, values.lng),
            };
            console.log(addFoodPacket.region)

            // console.log(addFoodPacket.region, addFoodPacket.region2)
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}>
            <KeyboardAvoidingView behavior="padding" enabled>
              <ScrollView>
                <Formik
                  initialValues={{ description: "", name: "", category: "", address: "", city: "", state: "", zip: "", email: "", }}
                  onSubmit={this.handleSubmit}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().trim().required(),
                    description: Yup.string().trim(),
                    category: Yup.string().trim(),
                    address: Yup.string().trim().required(),
                    city: Yup.string().trim().required(),
                    state: Yup.string().trim().required(),
                    zip: Yup.number().min(501, "Enter a valid zip").max(99950, "Enter a valid zip").required(),
                    email: Yup.string().email().required()
                  })}
                  render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid, isSubmitting }) => (
                    <React.Fragment>
                      <Text style={{ textAlign: "center", color: Colors.darkGray, fontSize: 20, marginTop: 35, fontWeight: "bold", }}>Enter Food Information Below</Text>
                      <Input
                        labelStyle={{ paddingTop: 15, color: Colors.darkGray }}
                        label="Name"
                        placeholder="name"
                        value={values.name}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        name="name"
                        error={touched.name && errors.name}
                        returnKeyType="next"
                        autoFocus={true}
                        blurOnSubmit={false}
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
                        returnKeyType="next"
                        maxLength={200}
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
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                        returnKeyType="next"
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
                        keyboardType="numeric"
                        returnKeyType="next"
                      />
                      {/* make this email or a phone number to text */}
                      <Input
                        label="Contact Email"
                        labelStyle={{ color: Colors.darkGray }}
                        placeholder="email"
                        value={values.email}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        name="email"
                        error={touched.email && errors.email}
                        keyboardType="email-address"
                        returnKeyType="done"
                      />
                      <Button
                        buttonStyle={Styles.smallGapSubmitButton}
                        title="Add to Map"
                        onPress={handleSubmit}
                        disabled={!isValid || isSubmitting}
                        loading={isSubmitting}
                      />
                      <Button
                        buttonStyle={[Styles.cancelButton, { marginBottom: 20 }]}
                        onPress={() => { this.setModalVisible(false); }}
                        title="Cancel"
                      />
                    </React.Fragment>
                  )}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </Modal>

          {/* Produce Food Button that opens modal */}
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
            title="Add New Food"
            backgroundColor={Colors.headerGreen}
            icon={{
              name: "add",
              size: 20,
            }}
            textStyle={{ fontStyle: "italic" }}
            containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
          // raised= {true}
          />
        </View>
      );
    };
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  export default withNavigation(ProduceModalScreen);
