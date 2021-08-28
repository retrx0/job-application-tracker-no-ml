import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Modal } from "react-native";
import ModalButton from "./ModalButton";
import { BlurView } from "expo-blur";
import Styles from "../../styles/Styles";
import { recategorizeJob } from "../../controller/JobController";

const RecategorizeModal = ({
  theme,
  shown,
  setShown,
  sectionName,
  callBack,
  jobItem,
}) => {
  const [modalSelectedValue, setModalSelectedValue] = useState(sectionName);
  return (
    <Modal
      transparent={true}
      visible={shown}
      style={{
        flex: 1,
        backgroundColor: theme.backgroundColor,
      }}
      animationType="fade"
    >
      <BlurView
        intensity={90}
        tint="dark"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={[
            Styles.AppBorderRadiusDefault,
            {
              margin: 15,
              padding: 10,
              backgroundColor: theme.backgroundColorAlt,
              justifyContent: "center",
            },
          ]}
        >
          <Picker
            prompt={"Select New Category"}
            style={[
              {
                backgroundColor: theme.backgroundColorAlt,
                margin: 10,
              },
              Styles.AppBorderRadiusSmall,
            ]}
            itemStyle={{ color: theme.textColor }}
            selectedValue={modalSelectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setModalSelectedValue(itemValue)
            }
          >
            <Picker.Item
              enabled={sectionName !== "Applied"}
              label={"Applied"}
              value={"Applied"}
            />
            <Picker.Item
              enabled={sectionName !== "Rejected"}
              label={"Reject"}
              value={"Rejected"}
            />
            <Picker.Item
              enabled={sectionName !== "Interview"}
              label={"Interview or Progress"}
              value={"Interview"}
            />
            {/* <Picker.Item
              enabled={sectionName !== "Progress"}
              label={"Progress"}
              value={"Progress"}
            /> */}
          </Picker>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <ModalButton
              title={"Cancel"}
              theme={theme}
              onPress={() => {
                setShown((p) => !p);
              }}
            />
            <ModalButton
              theme={theme}
              title={"Save"}
              onPress={() => {
                setShown((p) => !p);
                recategorizeJob(jobItem, modalSelectedValue, callBack);
              }}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default RecategorizeModal;
