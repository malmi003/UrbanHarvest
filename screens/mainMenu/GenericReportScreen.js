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
    TextInput,
} from 'react-native';
import { withNavigation } from "react-navigation";
import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import { Button, Icon } from "react-native-elements";
import MyIcon from "../../components/Icon";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addFood } from "../../src/services/addFood";
import * as firebase from "firebase";
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import Styles from "../../constants/Styles";
import { MailComposer } from 'expo';

class GenericReportScreen extends React.Component {

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <MyIcon name="ios-mail" color={tintColor}/>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            reportPost: "",
            reportMessage: "",
        };
    };

    sendReport = () => {
        this.setModalVisible(false)
        MailComposer.composeAsync({
            recipients: ["info@urbanharvest.com"],
            subject: this.state.reportPost,
            body: `Hello, \n\n ${this.state.reportMessage} \n\n Thank you,`
        })
            .then(status => {
                console.log(status)
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={{ flex: 1, }}>
                            <View style={styles.headerContainer}>
                                <MyIcon
                                    name={
                                        Platform.OS === 'ios'
                                            ? (`ios-close`)
                                            : (`md-close`)
                                    }
                                    onPress={() => { this.props.navigation.goBack() }}
                                    size={50}
                                    style={{ paddingLeft: 20 }}
                                />
                                <Text style={[Styles.title]}>Report</Text>
                                {/* dummy component to center header elements correctly */}
                                <Text style={{ paddingRight: 30 }}></Text>
                            </View>
                            <View style={styles.reportContainer}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", paddingTop: 10, paddingBottom: 10, color: Colors.darkGray }}>Subject</Text>
                                <TextInput
                                    style={[styles.inputField, { height: 40 }]}
                                    value={this.state.reportPost}
                                    onChangeText={text => { this.setState({ reportPost: text }) }}
                                    placeholder={"enter subject..."}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", paddingTop: 10, paddingBottom: 10, color: Colors.darkGray }}>Message</Text>
                                <TextInput
                                    style={[styles.inputField, { height: 60, marginBottom: 8, }]}
                                    value={this.state.reportMessage}
                                    onChangeText={reportMessage => this.setState({ reportMessage })}
                                    placeholder={"enter message..."}
                                    multiline={true}
                                    editable={true}
                                    numberOfLines={15}
                                />
                                <Button
                                    title="Send Email"
                                    onPress={() => this.sendReport()}
                                    buttonStyle={[Styles.plainButton, { marginTop: 50 }]}
                                    raised={true}
                                    containerViewStyle={{ paddingBottom: 10, }}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        // flex:1,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 30,
    },
    reportContainer: {
        flex: 2,
        marginHorizontal: 10,
        backgroundColor: Colors.headerGreen,
        // flexDirection: 'row',

        alignItems: "center",
        // textAlign: "center",
    },
    reportIcon: {
        // marginTop: 20,
        // marginLeft: 20,
    },
    iconContainer: {
        width: 30,
    },
    inputField: {
        fontSize: 15,
        marginTop: 8,
        backgroundColor: Colors.white,
        paddingHorizontal: 3,
        color: "gray",
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        width: 300,
    }

});

export default withNavigation(GenericReportScreen);
