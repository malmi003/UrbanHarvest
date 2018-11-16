import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
} from 'react-native';
import { withNavigation } from "react-navigation";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import { Checkbox, Button } from "react-native-elements";
import { Formik } from 'formik';
import * as Yup from 'yup';

class ProduceModalScreen extends React.Component {
  _handleSubmit = values => {
    Alert.alert(JSON.stringify(values))
  }
    render() {
      return (
      <View style={styles.container}>
      <Formik 
        initialValues={{description: "", email: "",}}
        onSubmit={this._handleSubmit}
        validationSchema={Yup.object().shape({
          description: Yup.string(),
          email: Yup.string().email().required(),
        })}
        render= {({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched, isValid, isSubmitting }) => (
        <React.Fragment>
          <Input 
            label="Description"
            type="text"
            placeholder="add a brief description here"
            value={values.description}
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name="description"
            error={touched.description && errors.description}
          />
          <Input 
            label="email"
            placeholder="email"
            value={values.email}
            onChange={setFieldValue}
            onTouch={setFieldTouched}
            name="email"
            error={touched.email && errors.email}
          />
          {/* <Checkbox name="roles" value="admin" />
          <Checkbox name="roles" value="customer" /> */}
          
          <Button 
            buttonStyle={styles.submitButton} 
            title="Add to Map" 
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
          />
        </React.Fragment>
        )}
      />
        
          
          <Button
            onPress={() => {this.props.navigation.goBack()}}
            title="Cancel"
          />
      </View>
      );
    };
  };

  const styles = StyleSheet.create({
    container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
    color: Colors.darkGray,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
  }
  })

  export default withNavigation(ProduceModalScreen);
  