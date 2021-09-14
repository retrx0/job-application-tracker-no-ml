import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, TextInput, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Styles from "../../styles/Styles";
import CardModalInput from "./CardModalInput";
import ModalButton from "./ModalButton";
import { Picker } from "@react-native-picker/picker";
import { getDateInString } from "../../util/TimeUtil";
import JobCardContext from "../../context/JobCardContext";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

const CardModal = ({
  theme,
  modalRef,
  onClose,
  headerText,
  autoFillData,
  section,
  actionType,
  jobItem,
}) => {
  let _autoFillData = {};
  if (autoFillData) _autoFillData = autoFillData;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalCompanyName, setModalCompanyName] = useState(_autoFillData.from);
  const [modalVia, setModalVia] = useState(_autoFillData.via);
  const [modalDate, setModalDate] = useState(
    actionType === "add" ? Math.floor(Date.now()) : Math.floor(Date.now())
  );
  const [modalSelectedSection, setModalSelectedSection] = useState(section);
  const { editJob, addJob } = useContext(JobCardContext);

  const validateForm = () => {};

  useEffect(() => {
    setModalSelectedSection(section);
  }, []);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        panGestureEnabled={false}
        adjustToContentHeight
        modalStyle={{ backgroundColor: theme.backgroundColorAlt }}
        HeaderComponent={() => (
          <Text
            style={[styles.title, { fontSize: 30, color: theme.textColor }]}
          >
            {headerText}
          </Text>
        )}
      >
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              marginBottom: 15,
            },
          ]}
        >
          <View
            style={[
              Styles.AppBorderRadiusDefault,
              Styles.dropShadow,
              {
                backgroundColor: theme.backgroundColor,
                flexDirection: "column",
                justifyContent: "center",
                padding: 15,
                margin: 10,
              },
            ]}
          >
            <CardModalInput
              autoFillText={_autoFillData.from}
              onChange={(t) => setModalCompanyName(t)}
              inputLabel={"Company *"}
              theme={theme}
            />
            <CardModalInput
              autoFillText={_autoFillData.via}
              onChange={(t) => setModalVia(t)}
              inputLabel={"Via *"}
              theme={theme}
            />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <Text
                style={[
                  {
                    color: theme.textColor,
                    padding: 10,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: "400",
                    color: theme.textColorCard,
                  },
                ]}
              >
                {getDateInString(modalDate)}
              </Text>
            </TouchableOpacity>
            <Picker
              prompt={"Select Category *"}
              style={[
                {
                  backgroundColor: theme.backgroundColorAlt,
                  margin: 10,
                },
                Styles.AppBorderRadiusSmall,
              ]}
              itemStyle={{ color: theme.textColor }}
              selectedValue={modalSelectedSection}
              onValueChange={(itemValue, itemIndex) =>
                setModalSelectedSection(itemValue)
              }
            >
              <Picker.Item label={"Applied"} value={"Applied"} />
              <Picker.Item label={"Reject"} value={"Rejected"} />
              <Picker.Item
                label={"Interview or Progress"}
                value={"Interview"}
              />
            </Picker>
            <DateTimePickerModal
              isDarkModeEnabled={theme.dark}
              textColor={theme.textColor}
              maximumDate={new Date()}
              minimumDate={
                new Date(new Date().setFullYear(new Date().getFullYear() - 10))
              }
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={(date) => {
                setModalDate(Math.floor(date));
                setDatePickerVisibility(false);
              }}
              onCancel={() => {
                console.log("Date Picking Canceled");
                setDatePickerVisibility(false);
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <ModalButton
                title={"Cancel"}
                theme={theme}
                onPress={() => {
                  onClose();
                }}
              />
              <ModalButton
                title={"Save"}
                theme={theme}
                disabled={
                  modalSelectedSection == undefined ||
                  modalCompanyName == undefined ||
                  modalCompanyName == "" ||
                  String(modalCompanyName).trim().length == 0 ||
                  modalVia == undefined ||
                  modalVia == "" ||
                  String(modalVia).trim().length == 0 ||
                  modalDate == undefined
                }
                onPress={() => {
                  console.log({
                    modalCompanyName,
                    modalVia,
                    modalDate,
                    modalSelectedSection,
                  });
                  switch (actionType) {
                    case "edit":
                      editJob(jobItem, {
                        from: modalCompanyName,
                        date: modalDate,
                        via: modalVia,
                        sectionName: modalSelectedSection,
                      });
                      break;
                    case "add":
                      addJob({
                        id:
                          "id" +
                          Date.now().toString(36) +
                          Math.random().toString(36).substr(2),
                        from: modalCompanyName,
                        date: modalDate,
                        via: modalVia,
                        sectionName: modalSelectedSection,
                      });
                      break;
                    default:
                      break;
                  }

                  onClose();
                }}
              />
            </View>
          </View>
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    padding: 10,
    borderRadius: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    padding: 6,
    paddingHorizontal: 15,
  },
});

export default CardModal;
