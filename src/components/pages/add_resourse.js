import React, { useState } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/auth.module.scss';
import CustomInput from '../custom_components/input';
import _ from 'underscore';
import CustomButton from '../custom_components/button';
import { openNotification } from '../custom_components/notification';
import { addResource } from '../../requests/function';

const AddResource = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(0);

  const extractValue = event => event.target.value;

  const checkInput = value => !_.isEmpty(value);

  const addTable = () => {
    if (!checkInput(name)) {
      openNotification(
        'warning',
        'Adăugare',
        'Câmpul pentru nume nu este completat!'
      );
      return;
    }
    if (!checkInput(capacity)) {
      openNotification(
        'warning',
        'Adăugare',
        'Câmpul pentru capacitate nu este completat!'
      );
      return;
    }
    if (!checkInput(description)) {
      openNotification(
        'warning',
        'Adăugare',
        'Câmpul pentru descriere nu este completat!'
      );
      return;
    }
    addResource(name, description, capacity, () =>
      openNotification('success', 'Adăugare', 'Masa a fost adăugată cu succes!')
    );

    setName('');
    setCapacity(0);
    setDescription('');
  };

  return (
    <Layout>
      <div className={styles.container}>
        <form>
          <h3>Formular adăugare masă</h3>
          <CustomInput
            type='input'
            value={name}
            placeholder={'nume'}
            onChange={event => setName(extractValue(event))}
          />
          <CustomInput
            type='input'
            value={description}
            placeholder={'descriere'}
            onChange={event => setDescription(extractValue(event))}
          />
          <CustomInput
            type='input'
            pattern='[0-9]*'
            value={capacity}
            placeholder={'capacitate'}
            onChange={event =>
              setCapacity(
                event.target.validity.valid ? event.target.value : capacity
              )
            }
          />
        </form>
        <CustomButton onClick={addTable}>Adăugare</CustomButton>
      </div>
    </Layout>
  );
};

export default AddResource;
