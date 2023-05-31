import { Avatar, HStack, Text } from '@chakra-ui/react'
import React from 'react'

export const Message = ({ text, url, user }) => {
    return (
        <HStack alignSelf={user === 'me' ? 'flex-start' : 'flex-end'} paddingY='2' paddingX='3' bg='blackAlpha.100'>
            {
                user === 'me' ? <Avatar src={url||null} />  : ""
            }
            <Text padding={"auto"}>{text}</Text>
            {
                user !== 'me' ? <Avatar /> : ""
            }
        </HStack>
    )
}

