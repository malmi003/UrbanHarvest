import Colors from "./Colors";
import { Platform } from "react-native";

export default {
  smallGapSubmitButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: Colors.headerGreen
  },
  submitButton: {
    marginTop: 100,
    width: "100%",
    backgroundColor: Colors.headerGreen
  },
  cancelButton: {
    marginTop: 20,
    width: "100%",
    backgroundColor: Colors.errorBackground
  },
  produceFoodContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    
    // alignItems: 'center',
    // backgroundColor: Colors.lightGreen,
    // paddingTop: 8,
    // paddingBottom: 20,
  },
  produceFoodText: {
    // fontSize: 20,
    // color: Colors.white,
    // textAlign: 'center',
    // fontWeight: "bold",
    // letterSpacing: 1.2,
    // borderWidth: 2,
    // padding: 12,
    // borderRadius: 8,
    // borderColor: Colors.white,
  },
  inputField: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    width: 300,
    height: 40,
  },
  plainButton: {
    backgroundColor: Colors.blue,
    width: "100%",
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    color: Colors.headerGreen,
    fontWeight: 'bold',
  },
};