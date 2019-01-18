import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Button,
  Dialog,
  Paragraph,
  TextInput,
  Divider
} from "react-native-paper";
import { Patient } from "../types";

type Props = {
  visible: boolean;
  handlePatient: ({ data: string }) => void;
  hideDialog: () => void;
};

type State = {
  patientId: string;
};

export class EnterPatientId extends React.Component<Props, State> {
  state = {
    patientId: ""
  };

  render() {
    const { visible, hideDialog, handlePatient } = this.props;
    const { patientId } = this.state;
    return (
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Add patient to queue?</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="PatientID"
            onChangeText={text => this.setState({ patientId: text })}
            value={patientId}
          />
        </Dialog.Content>
        <Divider />
        <Dialog.Actions style={styles.actions}>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button
            onPress={() => handlePatient({ data: patientId })}
            mode="contained"
          >
            Continue
          </Button>
        </Dialog.Actions>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 8
  },
  actions: { marginHorizontal: 16, justifyContent: "space-between" }
});