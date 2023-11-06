import moment from 'moment';
import React, {useRef, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-regular-svg-icons';
import Button from '../../components/Common/Button';
import {colors, generalStyle} from '../../styles/globalStyle';

export default function DateModal({selectDate}: {selectDate: (date) => void}) {
  const today = useRef(moment().format('YYYY-MM-DD'));
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <FontAwesomeIcon color={'gray'} icon={faCalendar} />
      </Pressable>
      <Modal
        animationType="slide"
        visible={open}
        transparent={true}
        style={{
          height: '100%',
        }}
        onRequestClose={data => {
          setOpen(false);
        }}>
        <View style={[generalStyle.pageStyle, {paddingTop: 20}]}>
          <Text style={{textAlign: 'center', marginVertical: 25}}>
            Selecciona una fecha para la liberación
          </Text>
          <Calendar
            initialDate={today.current}
            disableAllTouchEventsForDisabledDays={true}
            minDate={today.current}
            onDayPress={e => {
              selectDate(e.dateString);
              setOpen(false);
            }}
          />
          <Button
            label="Cancelar"
            typeButton="secondary"
            onClick={() => setOpen(false)}></Button>
        </View>
      </Modal>
    </>
  );
}
