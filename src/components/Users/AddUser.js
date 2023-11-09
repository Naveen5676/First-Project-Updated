import React, { useState , useRef} from 'react';
import Wrappers from '../Helpers/Wrappers';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {

  const [error, setError] = useState(); 

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const collegenameInputRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enetreName =nameInputRef.current.value;
    const enetredAge= ageInputRef.current.value;
    const enetredeCollegename = collegenameInputRef.current.value;
    if (enetreName.trim().length === 0 || enetredAge.trim().length === 0 || enetredeCollegename.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name , age and collage name (non-empty values).',
      });
      return;
    }
    if (+enetredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enetreName, enetredAge, enetredeCollegename );
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collegenameInputRef.current.value='';
   

  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrappers>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <label htmlFor="collagename">Collage name</label>
          <input
            id="collagename"
            type="text"
            ref={collegenameInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrappers>
  );
};

export default AddUser;
