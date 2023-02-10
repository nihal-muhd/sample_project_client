import React, { } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'

// eslint-disable-next-line react/prop-types
const SearchModal = ({ searchModal, setSearchModal, findWord }) => {
  const theme = useMantineTheme()

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='45%'
      // opened is a property of modal. Here when our state modalOpen is true this modal will open.
      opened={searchModal}
      onClose={() => setSearchModal(false)}
    >
{findWord?.map((v,i)=>{
  if(v===null){
    return <h3>Ooops no data found</h3>
  }else{
    return(
      <>
      <p key={i}>{v.title}</p>
      <p>{v.status}</p>
      </>
    )
  }
 
})
}
  
    </Modal>
  )
}

export default SearchModal

