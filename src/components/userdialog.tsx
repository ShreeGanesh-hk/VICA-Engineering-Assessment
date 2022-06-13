import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../data-manage/hooks';
import { Roles } from '../data-manage/model/user-model';
import { InputChangeEventHandler } from '../utils/eventTypes';
type Props = {
  title: string,
  handleCancel: Function,
  handleSave: Function,
};

function UserDialog({ title, handleCancel, handleSave }: Props) {
  const userState = useAppSelector((state => state.userManagement));
  const { showUserDialogue, selectedUserId, users } = userState;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedRole, setSelectedRole] = useState(0);

  useEffect(() => {
    if (selectedUserId > 0) {
      const user = users.find((user) => (user.id === selectedUserId))
      if (user !== undefined) {
        setName(user.name);
        setSelectedRole(user.role);
      }
    }
    else {
      setName("");
      setSelectedRole(0);
    }
  }, [selectedUserId, users])

  const handleChange: InputChangeEventHandler = (e): void => {
    const { value } = e.target;
    setSelectedRole(Number(value));
  }

  const handleTextChange: InputChangeEventHandler = (e): void => {
    const { value } = e.target;
    setName(value);
  }

  const validate = () => {
    if (name === "") {
      setNameError(true);
      return
    }
    handleSave(name, selectedRole, selectedUserId);
  }

  return (
    <div>
      <Dialog open={showUserDialogue} onClose={() => { handleCancel() }}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate={false}
          autoComplete="off"
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              error={nameError}
              value={name}
              onChange={handleTextChange}
              required
              id="outlined-required"
              label="Enter Name"
              helperText={nameError ? "Name is mandatory" : ""}
            />
            <TextField
              id="outlined-select-role"
              select
              label="Select Role"
              value={selectedRole}
              onChange={handleChange}
            >
              {(Object.keys(Roles).filter((n) => isNaN((Number(n)))) as (keyof typeof Roles)[]).map((key) => (
                <MenuItem key={Roles[key]} value={Roles[key]}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleCancel() }}>Cancel</Button>
            <Button onClick={() => { validate() }}>Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

export default UserDialog