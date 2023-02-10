import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import './AddTask.css'

// eslint-disable-next-line react/prop-types
const AddTask = ({ modalOpen, setModalOpen, handleSubmit }) => {
  const theme = useMantineTheme()
  const [formData, setFormData] = useState('')

  const { task } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='45%'
      // opened is a property of modal. Here when our state modalOpen is true this modal will open.
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="add-form" >
        <h3>Your Info</h3>
        <div>
          <input type="text" className="add-input" name='name' placeholder='Plan for today....☕️' onChange={handleChange} value={task} />
        </div>

        <button type='button' className='button' onClick={() => {
          handleSubmit(formData)
        }} >Add</button>

      </form>
    </Modal>
  )
}

export default AddTask

