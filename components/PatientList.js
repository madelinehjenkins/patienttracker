import * as React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import {
  Subheading,
  List,
  Headline,
  Divider,
  Button,
  Portal
} from "react-native-paper";
import { EditPatient } from "./EditPatient";

export class PatientList extends React.Component {
  state = {
    selectedPatient: null
  };

  hideDialog = () => this.setState({ selectedPatient: null });
  completeDialog = () => this.setState({ selectedPatient: null });

  render() {
    const { patients, editPatient } = this.props;
    const { selectedPatient } = this.state;
    const inQueue = patients.filter(p => !p.timeEnded);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Headline>Patients</Headline>
          <Subheading>
            {inQueue.length} in queue, {patients.length - inQueue.length}{" "}
            completed
          </Subheading>
        </View>
        <FlatList
          data={inQueue}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>
              <List.Item
                title={item.id}
                description={`Started at ${new Date(
                  item.timeStarted
                ).toLocaleTimeString()}`}
                right={() => (
                  <Button
                    style={{ alignSelf: "center" }}
                    mode="outlined"
                    icon="edit"
                    onPress={() => this.setState({ selectedPatient: item })}
                  >
                    edit
                  </Button>
                )}
              />
              <Divider inset />
            </>
          )}
        />

        <Portal>
          {selectedPatient && (
            <EditPatient
              visible={!!selectedPatient}
              patient={selectedPatient}
              hideDialog={this.hideDialog}
              completeDialog={this.completeDialog}
              editPatient={editPatient}
            />
          )}
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginLeft: 16
  },
  item: {
    margin: 5
  }
});
